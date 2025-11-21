import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idea } from '../models/Idea';
import { environment } from '../../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class ImprovementService {
  // private baseIdeasUrl = 'http://localhost:8080/api/ideas';
  // private baseSubmitUrl = 'http://localhost:8080/api/submit';
  // private baseDashboardUrl = 'http://localhost:8080/api/dashboard';
  // private baseLeaderboardUrl = 'http://localhost:8080/api/leaderboard';
  // private baseProfileUrl = 'http://localhost:8080/api/profile';

  private baseIdeasUrl = 'https://phoneixui-backend.onrender.com/api/ideas';
  private baseSubmitUrl = 'https://phoneixui-backend.onrender.com/api/submit';
  private baseDashboardUrl = 'https://phoneixui-backend.onrender.com/api/dashboard';
  private baseLeaderboardUrl = 'https://phoneixui-backend.onrender.com/api/leaderboard';
  private baseProfileUrl = 'https://phoneixui-backend.onrender.com/api/profile';


  constructor(private http: HttpClient) {}

  // -------------------------------
  // 📊 DASHBOARD
  // -------------------------------
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.baseDashboardUrl}/stats`);
  }

  // -------------------------------
  // 💡 ALL IDEAS (list, update, delete, like, export)
  // -------------------------------

  getAll(): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${this.baseIdeasUrl}/getAll`);
  }

  getPaged(page: number, size: number, sortBy: string = 'id', direction: string = 'asc'): Observable<any> {
    return this.http.get(`${this.baseIdeasUrl}/paged`, {
      params: {
        page: page.toString(),
        size: size.toString(),
        sortBy,
        direction
      }
    });
  }

  update(id: number, item: Idea): Observable<Idea> {
    return this.http.put<Idea>(`${this.baseIdeasUrl}/update/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseIdeasUrl}/delete/${id}`);
  }

  likeIdea(id: number): Observable<Idea> {
    return this.http.put<Idea>(`${this.baseIdeasUrl}/${id}/like`, {});
  }

  exportIdeas(): Observable<Blob> {
    return this.http.get(`${this.baseIdeasUrl}/export`, { responseType: 'blob' });
  }

  // -------------------------------
  // 📝 SUBMIT IDEA
  // -------------------------------
  create(item: Idea): Observable<Idea> {
    return this.http.post<Idea>(`${this.baseSubmitUrl}/idea`, item);
  }

  // -------------------------------
  // 🏆 LEADERBOARD
  // -------------------------------
  getTopIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(this.baseLeaderboardUrl);
  }

  // -------------------------------
  // 👤 PROFILE
  // -------------------------------
  getUserIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${this.baseProfileUrl}/ideas`);
  }

  //Env
  getTeams() {
    return this.http.get(`${environment.apiBase}/teams`);
  }
}
