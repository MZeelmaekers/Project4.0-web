import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {SecurityComponent} from "./security/security.component";
import { SharedModule } from './shared/shared.module';
import { UserPasswordFormComponent } from './user-password-form/user-password-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SecurityComponent,
    UserPasswordFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
