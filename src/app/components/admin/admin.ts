import { Component, OnInit } from '@angular/core';



import { Idea } from '../../models/Idea';
import { ImprovementService } from '../../service/improvement.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  ideas: Idea[] = [];
  isAdmin = false;

  constructor(private router: Router, private service: ImprovementService) {}

  ngOnInit(): void {
    const name = localStorage.getItem('tpb_user_name');
    const email = localStorage.getItem('tpb_user_email');

    // ✅ Check Admin Login
    if (name === 'Admin' && email?.toLowerCase() === 'admin1@amdocs.com') {
      this.isAdmin = true;
      this.loadIdeas();
    } else {
      alert('Access Denied ❌ - Admins Only');
      this.router.navigate(['/dashboard']);
    }
  }

  loadIdeas(): void {
    this.service.getAll().subscribe((data) => {
      this.ideas = data;
    });
  }

  editIdea(idea: Idea): void {
    localStorage.setItem('edit_idea', JSON.stringify(idea));
    this.router.navigate(['/idea-form']);
  }

  deleteIdea(id?: number): void {
    if (!id) {
      alert('Invalid Idea ID ❌');
      return;
    }

    if (confirm('Are you sure you want to delete this idea?')) {
      this.service.delete(id).subscribe(() => {
        alert('Idea deleted ✅');
        this.loadIdeas();
      });
    }
  }

}
