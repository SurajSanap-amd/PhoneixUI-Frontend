import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const email = localStorage.getItem('tpb_user_email');

  if (email && email.toLowerCase().endsWith('@amdocs.com')) {
    return true; // ✅ logged in and valid domain
  }

  alert('Please log in with your @amdocs.com email to continue.');
  router.navigate(['/profile']);
  return false;
};
