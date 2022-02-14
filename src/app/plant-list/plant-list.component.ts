import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlantService} from "../services/plant.service";
import {Plant} from "../models/plant";
import {Subject, Subscription} from "rxjs";
import {BlobServiceClient} from "@azure/storage-blob";
import {Stream} from "stream";
import {resolve} from "path";
import {Router} from "@angular/router";
import {ResultService} from "../services/result.service";


@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit, OnDestroy {



  plants: Plant[] = []
  subscription: Subscription = new Subscription();
  deletePlantSubscription: Subscription = new Subscription();
  deleteResultSubscription: Subscription = new Subscription();
  //Datatables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private plantService: PlantService,
              private resultService: ResultService,
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
    this.deletePlantSubscription.unsubscribe()
    this.deleteResultSubscription.unsubscribe()
  }

  async getPlants(){
      this.subscription = await this.plantService.getPlants().subscribe(data => {
        this.plants = data;
        this.dtTrigger.next();
      });
  }

  async getPlantsAfterDelete(){
    this.subscription = await this.plantService.getPlants().subscribe(data => {
      this.plants = data;
    });
  }

  getPhoto(imageName: string) {
    //Blob
    let sas = 'sp=racwdli&st=2022-02-14T12:32:37Z&se=2222-02-13T23:00:00Z&spr=https&sv=2020-08-04&sr=c&sig=vFGnKdFLfmShThaggSlbW40%2FQcQu1t8EfzTu17%2BpN9Q%3D'
    let con_str = 'BlobEndpoint=https://storagemainfotosplanten.blob.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2222-02-14T20:39:08Z&st=2022-02-14T12:39:08Z&spr=https&sig=GwiOWGMZJc1DD2svA2HNzRNyQCldiViAOQwUyHOrzPo%3D'
    let blobServiceClient = BlobServiceClient.fromConnectionString(con_str);
    console.log(blobServiceClient)
    let containerClient = blobServiceClient.getContainerClient('botanic');
    console.log(containerClient)
    let blockBlobClient = containerClient.getBlockBlobClient(imageName)
    console.log(blockBlobClient)
    console.log(blockBlobClient.url)
    return blockBlobClient.url
  }


  async detail(id: number) {
    await this.router.navigate(['plants/detail'], {state: {id: id}});
  }

  async delete(plantId: number, resultId: number) {
    this.deletePlantSubscription = await this.plantService.deletePlant(plantId).subscribe(plant => {
      this.deleteResultSubscription = this.resultService.deleteResult(resultId).subscribe(result => {
        this.getPlantsAfterDelete()
      });
    });
  }
}
