import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-password-form',
  templateUrl: './user-password-form.component.html',
  styleUrls: ['./user-password-form.component.scss']
})
export class UserPasswordFormComponent implements OnInit, OnDestroy {
  userId: string = localStorage.getItem("id")?? "0";

  isSubmitted: boolean = false;
  errorMessage: string = '';

  user$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  roleEnum = Role;

  userForm = new FormGroup({
    id: new FormControl(0),
    password: new FormControl(""),
    newPassword: new FormControl(""),
  });

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.user$.unsubscribe();
      this.putUser$.unsubscribe();
  }

  onSubmit(): void{
    this.isSubmitted = true;
    let data = this.userForm.value;
      this.putUser$ = this.userService.putUserPassword(this.userId, data.password, data.newPassword).subscribe(result => {
        this.router.navigateByUrl("/");
      }, error => {
        this.errorMessage = "Something went wrong";
      });
  }
}
