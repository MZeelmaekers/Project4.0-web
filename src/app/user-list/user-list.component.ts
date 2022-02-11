import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  users$: Subscription = new Subscription();
  deleteUser$: Subscription = new Subscription();

  errorMessage: string = "";
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  Role = Role;

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      lengthMenu: [5,10,15,20],
      order: [],
      columnDefs: [
        { "orderable": false, "targets": 0 }
      ],
    };
  }

  ngOnDestroy(): void{
    this.users$.unsubscribe();
    this.deleteUser$.unsubscribe();
  }

  edit(id: number){
    this.router.navigate(['admin/users/form'], {state: {id: id, mode:'edit'}});
  }

  delete(id: number){
    this.deleteUser$ = this.userService.deleteUser(id).subscribe(result => {
      this.getUsers();
    }, error => {
      this.errorMessage = error.message;
    })
  }
  getUsers(){
    this.users$ = this.userService.getUsers().subscribe(result =>{
      this.users = result;
      this.dtTrigger.next()
    });
  }
}
