import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlantService} from "../services/plant.service";
import {Plant} from "../models/plant";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit, OnDestroy {

  plants: Plant[] = []
  subscription: Subscription = new Subscription();
  //Datatables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private plantService: PlantService) { }

  ngOnInit(): void {
    this.getPlants()
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
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  async getPlants(){
    console.log('test')
      this.subscription = await this.plantService.getPlants().subscribe(data => {
        console.log(data)
        this.plants = data;
        this.dtTrigger.next();
      });
  }


}
