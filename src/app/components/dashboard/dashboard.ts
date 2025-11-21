import { Component, OnInit } from '@angular/core';

import { ImprovementService } from '../../service/improvement.service';
import { Idea } from '../../models/Idea';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  userName: string = 'Friend';
  totalIdeas = 0;
  openIdeas = 0;
  inProgressIdeas = 0;
  closedIdeas = 0;
  recentIdeas: Idea[] = [];

  constructor(
    private improvementService: ImprovementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();

    // ✅ Get logged-in user's name from localStorage
    const storedName = localStorage.getItem('tpb_user_name');
    if (storedName) {
      this.userName = storedName;
    }

    this.loadData();
  }

  loadData(): void {
    this.improvementService.getAll().subscribe({
      next: (data) => {
        this.totalIdeas = data.length;
        this.openIdeas = data.filter(i => i.status === 'OPEN').length;
        this.inProgressIdeas = data.filter(i => i.status === 'IN_PROGRESS').length;
        this.closedIdeas = data.filter(i => i.status === 'CLOSED').length;

        // Show last 5 ideas
        this.recentIdeas = data.slice(-5).reverse();
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
      }
    });
  }

  

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
