import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {UploadComponent} from "../upload/upload.component";
import {SharedModule} from "../shared/shared.module";



const routes: Routes = [
  { path: '', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    SharedModule],
  exports: [RouterModule],
  declarations: [
    UploadComponent
  ]
})
export class UploadModule { }
