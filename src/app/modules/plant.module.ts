import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {PlantListComponent} from "../plant-list/plant-list.component";
import {PlantDetailComponent} from "../plant-detail/plant-detail.component";
import {SharedModule} from "../shared/shared.module";



const routes: Routes = [
  { path: '', component: PlantListComponent},
  { path: 'detail', component: PlantDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule,
    CommonModule],
  exports: [RouterModule],
  declarations:[
    PlantListComponent,
    PlantDetailComponent
  ]
})
export class PlantModule { }
