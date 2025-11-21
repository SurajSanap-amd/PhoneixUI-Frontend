import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {


//Logout Logic
constructor(private router: Router) {}

logout(): void {
  localStorage.removeItem('tpb_user_name');
  localStorage.removeItem('tpb_user_email');
  alert('Logged out successfully 👋');
  this.router.navigate(['/profile']);
}

//Toward Idea Form
goToIdeaForm(): void {
  this.router.navigate(['/idea-form']);
}

//Admin
isAdminUser(): boolean {
  const name = localStorage.getItem('tpb_user_name');
  const email = localStorage.getItem('tpb_user_email');
  return name === 'Admin' && email?.toLowerCase() === 'admin1@amdocs.com';
}


}

