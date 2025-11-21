import { Component, OnInit } from '@angular/core';


import { ImprovementService } from '../../service/improvement.service';

import { Idea } from '../../models/Idea';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ideas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ideas-list.html',
  styleUrls: ['./ideas-list.css']
})
export class IdeasList implements OnInit {
  ideas: Idea[] = [];
  loading = true;
  error: string | null = null;

  constructor(private improvementService: ImprovementService,
             private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIdeas();
  }

loadIdeas(): void {
  this.improvementService.getAll().subscribe({
    next: (data) => {
      const currentUser = localStorage.getItem('tpb_user_email');
      this.ideas = data.reverse().map((idea) => {
        if (currentUser) {
          const likedKey = `liked_${idea.id}_${currentUser}`;
          idea.isLiked = !!localStorage.getItem(likedKey);
        } else {
          idea.isLiked = false;
        }
        return idea;
      });
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Failed to load ideas.';
      console.error(err);
      this.sortIdeas();
      this.loading = false;
    },
  });
}


  deleteIdea(id: number | undefined): void {
    if (!id) return;
    const confirmed = confirm('Are you sure you want to delete this idea?');
    if (confirmed) {
      this.improvementService.delete(id).subscribe({
        next: () => {
          this.ideas = this.ideas.filter(i => i.id !== id);
        },
        error: (err) => console.error('Error deleting idea:', err),
      });
    }
  }

  //This handles expanding/collapsing the cards.
  selectedIdea: Idea | null = null;

  toggleExpand(idea: Idea): void {
    this.selectedIdea = this.selectedIdea === idea ? null : idea;
  }

  //Like Idea
  likeIdea(idea: Idea): void {
    if (!idea.id) return;

    // Get the simulated user (for now, stored in localStorage)
    const currentUser = localStorage.getItem('tpb_user_email');
    if (!currentUser) {
      alert('Please set your user profile before liking ideas.');
      return;
    }

    // Prevent double likes (client-side simulation for now)
    const likedKey = `liked_${idea.id}_${currentUser}`;
    if (localStorage.getItem(likedKey)) {
      alert('You already liked this idea 💙');
      return;
    }

    // Optimistic update (instant feedback)
    idea.isLiked = true;
    idea.likes = (idea.likes || 0) + 1;

    this.improvementService.likeIdea(idea.id).subscribe({
      next: (updated) => {
        idea.likes = updated.likes;
        localStorage.setItem(likedKey, 'true');
      },
      error: (err) => {
        console.error('Error liking idea:', err);
        idea.isLiked = false;
        idea.likes = (idea.likes || 1) - 1;
      },
    });
  }

  //Owner
    isOwner(idea: Idea): boolean {
      const currentUser = localStorage.getItem('tpb_user_email');
      return idea.email?.toLowerCase() === currentUser?.toLowerCase();
    }

    editIdea(idea: Idea): void {
      localStorage.setItem('edit_idea', JSON.stringify(idea));
      alert('Redirecting to Edit Idea page...');
      this.router.navigate(['/idea-form']);
    }

  // ✅ Admin check — only true for the admin user
  isAdmin(): boolean {
    const userName = localStorage.getItem('tpb_user_name');
    const userEmail = localStorage.getItem('tpb_user_email');

    return (
      userName?.toLowerCase() === 'admin' &&
      userEmail?.toLowerCase() === 'admin1@amdocs.com'
    );
  }

  //Sorting logic
  sortOption: string = 'date'; // default sort

  sortIdeas(): void {
    switch (this.sortOption) {
      case 'likes':
        this.ideas.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;

      case 'date':
        this.ideas.sort((a, b) => {
          const dateA = a.createdDate ? new Date(a.createdDate).getTime() : 0;
          const dateB = b.createdDate ? new Date(b.createdDate).getTime() : 0;
          return dateB - dateA;
        });
        break;

      case 'priority':
        const priorityOrder = ['Critical','High', 'Medium', 'Low'];
        this.ideas.sort((a, b) => {
          const indexA = priorityOrder.indexOf(a.priority || '');
          const indexB = priorityOrder.indexOf(b.priority || '');
          return indexA - indexB;
        });
        break;

      case 'alphabetical':
        this.ideas.sort((a, b) => (a.toilItem || '').localeCompare(b.toilItem || ''));
        break;
    }
  }

}
