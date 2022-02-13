import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Plant} from "../models/plant";
import {PlantService} from "../services/plant.service";
import {ResultService} from "../services/result.service";
import {Result} from "../models/result";
import {Subscription} from "rxjs";
import {BlobServiceClient} from "@azure/storage-blob";

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent implements OnInit, OnDestroy {
  private plantId: number;
  plant: Plant = {id: 0, fotoPath: '', location: '', fieldName: '', name: '', createdAt: '', userId: 0, resultId:0}
  result: Result = {id: 0, accuracy: 0, prediction: '', createdAt: ''}

  //Blob
  con_str = 'BlobEndpoint=https://storagemainfotosplanten.blob.core.windows.net/;QueueEndpoint=https://storagemainfotosplanten.queue.core.windows.net/;FileEndpoint=https://storagemainfotosplanten.file.core.windows.net/;TableEndpoint=https://storagemainfotosplanten.table.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-02-28T18:30:58Z&st=2022-01-19T10:30:58Z&sip=193.190.124.1&spr=https&sig=tYouTdGZ%2FJ612aumxhCoB%2F2iWpZHQ4lNzc%2FH4NE34Ys%3D'
  blobServiceClient = BlobServiceClient.fromConnectionString(this.con_str);
  containerClient = this.blobServiceClient.getContainerClient('botanic');

  plant$ = new Subscription()
  result$ = new Subscription()

  deletePlantSubscription: Subscription = new Subscription();
  deleteResultSubscription: Subscription = new Subscription();

  constructor(private router: Router,
              private plantService: PlantService,
              private resultService: ResultService,) {
    this.plantId = this.router.getCurrentNavigation()?.extras.state?.id;
    this.getPlant()
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.plant$.unsubscribe();
    this.result$.unsubscribe();
    this.deletePlantSubscription.unsubscribe();
    this.deleteResultSubscription.unsubscribe();
  }

  async getPlant(){
    if (this.plantId != null) {
      this.plant$ = await this.plantService.getPlantById(this.plantId).subscribe(result => {
        this.plant = result
        this.getResult(result.resultId)
      });
    }
  }

  async getResult(id: number){
    if (id != null) {
      this.result$ = await this.resultService.getResultById(id).subscribe(result => {
        console.log(result)
        this.result = result
      });
    }
  }

  getPhoto(imageName: string) {
    let blockBlobClient = this.containerClient.getBlockBlobClient(imageName)
    return blockBlobClient.url
  }

  async delete(plantId: number, resultId: number) {
    this.deletePlantSubscription = await this.plantService.deletePlant(plantId).subscribe(plant => {
      this.deleteResultSubscription = this.resultService.deleteResult(resultId).subscribe(result => {
        this.router.navigate(['plants']);
      });
    });
  }

}
