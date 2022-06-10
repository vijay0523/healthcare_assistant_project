import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user = "";
  title = 'healthcare_assistant_project';
  isLoggedIn = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    if(localStorage.getItem('user') != null){
      this.user = localStorage.getItem('user') as string;
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.user = "";
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
