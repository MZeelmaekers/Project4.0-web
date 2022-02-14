import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import {User} from "../models/user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  userId: number = 0;
  userRole: string = localStorage.getItem("role")?? '0';

  isSubmitted: boolean = false;
  errorMessage: string = '';

  user$: Subscription = new Subscription();
  superVisors$: Subscription = new Subscription();
  postUser$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  roleEnum = Role;

  superVisors: User[] = []

  userForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(""),
    role: new FormControl(0),
    password: new FormControl(""),
    email: new FormControl(""),
    address: new FormControl(""),
    zipCode: new FormControl(""),
    hometown: new FormControl(""),
    superVisorId: new FormControl(0)
  });

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
  this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
  this.userId = +this.router.getCurrentNavigation()?.extras.state?.id;

  if (this.userId != null && this.userId > 0) {
    this.user$ = this.userService.getUserById(this.userId).subscribe(result => {
      this.userForm.setValue({
        id: this.userId,
        name: result.name,
        role: result.role,
        password: '',
        email: result.email,
        address: result.address,
        zipCode: result.zipCode,
        hometown: result.hometown,
        superVisorId: result.superVisorId
      });
    });
  }}


  ngOnInit(): void {
    this.getSuperVisors()
  }

  ngOnDestroy(): void {
      this.user$.unsubscribe();
      this.postUser$.unsubscribe();
      this.putUser$.unsubscribe();
    this.superVisors$.unsubscribe();
  }

  getSuperVisors(){
    this.superVisors$ = this.userService.getSuperVisors().subscribe(result =>{
      this.superVisors = result;
      console.log(result)
    });
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.isAdd){
      this.postUser$ = this.authService.register(this.userForm.value).subscribe(result => {
        this.router.navigateByUrl("/");
      }, error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit){
      this.putUser$ = this.userService.putUser(this.userId, this.userForm.value).subscribe(result => {
        this.router.navigateByUrl("/admin/users");
      }, error => {
        this.errorMessage = error.message;
      });
    }
  }

}
