import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { Dashboard } from "./components/dashboard/dashboard";
import { bootstrapApplication } from '@angular/platform-browser';
import { Navbar } from "./components/navbar/navbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('team-portal-frontend');
}

bootstrapApplication(App)
  .catch(err => console.error(err));

//Not found
