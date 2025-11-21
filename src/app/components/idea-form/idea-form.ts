import { Component, OnInit } from '@angular/core';

import { Idea } from '../../models/Idea';
import { ImprovementService } from '../../service/improvement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idea-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './idea-form.html',
  styleUrls: ['./idea-form.css']
})
export class IdeaForm implements OnInit {
  idea: Idea = {};
  step = 1; // 🪜 Step tracking
  showToast = false; // ✅ Success toast toggle

  //Frequency Logic---------------------
  // frequencies: string[] = ['Daily', 'Weekly', 'Monthly', 'Per Run', 'Manual'];





  constructor(
    private improvementService: ImprovementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Autofill user info from localStorage
    const email = localStorage.getItem('tpb_user_email');
    const name = localStorage.getItem('tpb_user_name');

    if (email && name) {
      this.idea.email = email;
      this.idea.name = name;
    }

    // If editing an idea
    const editData = localStorage.getItem('edit_idea');
    if (editData) {
      this.idea = JSON.parse(editData);
      localStorage.removeItem('edit_idea');
    }
  }

  nextStep(): void {
    if (this.step < 3) this.step++;
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  submitIdea(): void {
    const request$ = this.idea.id
      ? this.improvementService.update(this.idea.id, this.idea)
      : this.improvementService.create(this.idea);

    request$.subscribe({
      next: () => {
        this.showSuccessToast();
        setTimeout(() => {
          this.router.navigate(['/ideas']);
        }, 1500);
      },
      error: (err) => console.error('Error submitting idea:', err),
    });
  }

  resetForm(): void {
    this.idea = {};
    this.step = 1;
  }

  private showSuccessToast(): void {
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }
}
