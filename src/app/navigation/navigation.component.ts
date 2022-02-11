import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userRole: string = localStorage.getItem("role") ?? "0";

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void{
    this.router.navigate(['register/'], {state: {mode:'add'}});
  }

}
