import { Component, OnInit } from '@angular/core';

import { ImprovementService } from '../../service/improvement.service';
import { Idea } from '../../models/Idea';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  name = '';
  email = '';
  ideas: Idea[] = [];
  loggedIn = false;
  loadingIdeas = false;

  constructor(
    private router: Router,
    private improvementService: ImprovementService
  ) {}

  ngOnInit(): void {
    const savedName = localStorage.getItem('tpb_user_name');
    const savedEmail = localStorage.getItem('tpb_user_email');

    if (savedName && savedEmail) {
      this.name = savedName;
      this.email = savedEmail;
      this.loggedIn = true;
      this.loadUserIdeas();
    }
  }

  saveProfile(): void {
    if (!this.name || !this.email) {
      alert('Please enter both name and email.');
      return;
    }

    if (!this.email.toLowerCase().endsWith('@amdocs.com')) {
      alert('Only Amdocs email addresses are allowed ❌');
      return;
    }

    localStorage.setItem('tpb_user_name', this.name);
    localStorage.setItem('tpb_user_email', this.email);

    this.loggedIn = true;
    this.loadUserIdeas();
    alert('Welcome, ' + this.name + '! 🎉');
  }

  loadUserIdeas(): void {
    this.loadingIdeas = true;
    this.improvementService.getAll().subscribe({
      next: (ideas) => {
        this.ideas = ideas.filter(
          (idea) => idea.email?.toLowerCase() === this.email.toLowerCase()
        );
        this.loadingIdeas = false;
      },
      error: (err) => {
        console.error('Failed to load ideas:', err);
        this.loadingIdeas = false;
      },
    });
  }

  editIdea(idea: Idea): void {
    localStorage.setItem('edit_idea', JSON.stringify(idea));
    alert('Redirecting to edit your idea...');
    this.router.navigate(['/idea-form']);
  }

  deleteIdea(id: number | undefined): void {
    if (!id) return;
    const confirmed = confirm('Are you sure you want to delete this idea?');
    if (confirmed) {
      this.improvementService.delete(id).subscribe({
        next: () => {
          this.ideas = this.ideas.filter(i => i.id !== id);
          alert('Idea deleted successfully ❌');
        },
        error: (err) => console.error('Error deleting idea:', err),
      });
    }
  }

  logout(): void {
    localStorage.removeItem('tpb_user_name');
    localStorage.removeItem('tpb_user_email');
    this.loggedIn = false;
    this.name = '';
    this.email = '';
    this.ideas = [];
    this.router.navigate(['/profile']);
  }
}
