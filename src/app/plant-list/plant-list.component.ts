import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlantService} from "../services/plant.service";
import {Plant} from "../models/plant";
import {Subject, Subscription} from "rxjs";
import {BlobServiceClient} from "@azure/storage-blob";
import {Stream} from "stream";
import {resolve} from "path";
import {Router} from "@angular/router";


@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit, OnDestroy {
  //Blob
  con_str = 'BlobEndpoint=https://storagemainfotosplanten.blob.core.windows.net/;QueueEndpoint=https://storagemainfotosplanten.queue.core.windows.net/;FileEndpoint=https://storagemainfotosplanten.file.core.windows.net/;TableEndpoint=https://storagemainfotosplanten.table.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-02-28T18:30:58Z&st=2022-01-19T10:30:58Z&sip=193.190.124.1&spr=https&sig=tYouTdGZ%2FJ612aumxhCoB%2F2iWpZHQ4lNzc%2FH4NE34Ys%3D'
  blobServiceClient = BlobServiceClient.fromConnectionString(this.con_str);
  containerClient = this.blobServiceClient.getContainerClient('botanic');


  plants: Plant[] = []
  subscription: Subscription = new Subscription();
  //Datatables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private plantService: PlantService,
              private router: Router,) { }

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
      this.subscription = await this.plantService.getPlants().subscribe(data => {
        this.plants = data;
        this.dtTrigger.next();

      });
  }

  getPhoto(imageName: string) {
    let blockBlobClient = this.containerClient.getBlockBlobClient(imageName)
    return blockBlobClient.url
  }


  async detail(id: number) {
    await this.router.navigate(['plants/detail'], {state: {id: id}});
  }

  delete(id: number) {
    
  }
}
