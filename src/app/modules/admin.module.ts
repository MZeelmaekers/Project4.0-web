import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'users', component: UserListComponent},
  { path: 'users/form', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule,
    CommonModule],
  exports: [RouterModule],
  declarations:[
    UserListComponent,
    UserFormComponent
  ]
})
export class AdminModule { }
