import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { IdeaForm } from './components/idea-form/idea-form';
import { IdeasList } from './components/ideas-list/ideas-list';
import { Leaderboard } from './components/leaderboard/leaderboard';
import { Profile } from './components/profile/profile';
import { AuthGuard } from './guards/auth-guard';
import { Admin } from './components/admin/admin';
import { NotFoundComponent } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'ideas', component: IdeasList, canActivate: [AuthGuard] },
  { path: 'idea-form', component: IdeaForm, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: Leaderboard, canActivate: [AuthGuard] },
  {path: 'admin', component: Admin, canActivate: [AuthGuard]},

  // 👇 Only Profile (login) page is public
  { path: 'profile', component: Profile },

  { path: '**', component: NotFoundComponent },

];
