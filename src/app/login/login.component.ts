import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFieldFormControl: FormControl = new FormControl('');
  passwordFieldFormControl: FormControl = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.loginFieldFormControl.valid || !this.passwordFieldFormControl.valid){
      alert('Invalid Email or Password')
      return;
    }
    if(this.loginFieldFormControl.value == "patient@gmail.com" && this.passwordFieldFormControl.value == "123456"){
      localStorage.setItem('user', "Patient");
      this.router.navigate(['patient']);
    }
    else if(this.loginFieldFormControl.value == "doctor@gmail.com" && this.passwordFieldFormControl.value == "123456"){
      localStorage.setItem('user', "Doctor");
      this.router.navigate(['doctor']);
    }
    else if(this.loginFieldFormControl.value == "insurance@gmail.com" && this.passwordFieldFormControl.value == "123456"){
      localStorage.setItem('user', "Insurance");
      this.router.navigate(['insurance']);
    }
    else 
      alert("Incorrect Credentials!")
  }

}
