import { Component, OnInit } from '@angular/core';


import { ImprovementService } from '../../service/improvement.service';
import { Idea } from '../../models/Idea';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class Leaderboard implements OnInit {
  ideas: Idea[] = [];
  topIdeas: Idea[] = [];
  loading = true;

  constructor(private improvementService: ImprovementService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.improvementService.getAll().subscribe({
      next: (data) => {
        // For now: sort by Impact -> Priority -> Created Date
        this.ideas = data;
        this.topIdeas = [...data]
          .sort((a, b) => this.rankIdea(b) - this.rankIdea(a))
          .slice(0, 10); // top 10
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading leaderboard:', err);
        this.loading = false;
      }
    });
  }

  private rankIdea(idea: Idea): number {
    let score = 0;

    if (idea.impact === 'HIGH') score += 3;
    else if (idea.impact === 'MEDIUM') score += 2;
    else score += 1;

    if (idea.priority === 'CRITICAL') score += 3;
    else if (idea.priority === 'HIGH') score += 2;
    else if (idea.priority === 'MEDIUM') score += 1;

    if (idea.likes) score += idea.likes * 2; // ❤️ weight for likes

    return score;
  }

}
