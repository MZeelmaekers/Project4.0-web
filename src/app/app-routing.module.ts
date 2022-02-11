import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecurityComponent} from "./security/security.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./security/auth.guard"
import { UserFormComponent } from './user-form/user-form.component';
import { UserPasswordFormComponent } from './user-password-form/user-password-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plants', loadChildren: () => import('./modules/plant.module').then(m => m.PlantModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'upload', loadChildren: () => import('./modules/upload.module').then(m => m.UploadModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'login', component: SecurityComponent},
  { path: 'register', component: UserFormComponent},
  {path: "password", component: UserPasswordFormComponent},
  { path: 'logout', component: SecurityComponent},
  { path: 'admin', loadChildren: () => import('./modules/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
