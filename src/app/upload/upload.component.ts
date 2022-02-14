import { Component, OnInit } from '@angular/core';
import {ResultService} from "../services/result.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Result} from "../models/result";
import {HttpClient} from "@angular/common/http";
import {BlobServiceClient} from "@azure/storage-blob";
import {PlantService} from "../services/plant.service";
import {Plant} from "../models/plant";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  postResult$ = new Subscription;

  //Blob
  filePath = ''



  photoForm = new FormGroup({
    fileSource: new FormControl([''], [Validators.required]),
    name: new FormControl("", [Validators.required]),
    fieldname: new FormControl("", [Validators.required]),
  });

  resultForm = new FormGroup({
    accuracy: new FormControl(0, [Validators.required]),
    prediction: new FormControl("", [Validators.required]),
  });

  plantForm = new FormGroup({
    fotoPath: new FormControl("0", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    fieldName: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    userId: new FormControl(0, [Validators.required]),
    resultId: new FormControl(0, [Validators.required]),
  });



  errorMessage =  '';
  constructor(private router: Router,
              private resultService:ResultService,
              private plantService:PlantService,
              private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  get f(){
    return this.photoForm.controls;
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photoForm.patchValue({
        fileSource: file
      });
    }
  }

  async onSubmit() {
    const formData = new FormData();
    formData.append('file', this.photoForm.value.fileSource);

     this.httpClient.post<any>('https://ai-api-michielvdz.cloud.okteto.net/result', formData).subscribe(
      res => {

        this.resultForm.patchValue({
          accuracy: parseFloat(res.accuracy)*100,
          prediction: res.week
        });
        this.postPhoto(this.photoForm.value.fileSource);

      },
      (err) => console.log(err),
    );
  }

  async postPhoto(image: File) {
    let con_str = 'BlobEndpoint=https://storagemainfotosplanten.blob.core.windows.net/;QueueEndpoint=https://storagemainfotosplanten.queue.core.windows.net/;FileEndpoint=https://storagemainfotosplanten.file.core.windows.net/;TableEndpoint=https://storagemainfotosplanten.table.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-02-28T18:30:58Z&st=2022-01-19T10:30:58Z&sip=193.190.124.1&spr=https&sig=tYouTdGZ%2FJ612aumxhCoB%2F2iWpZHQ4lNzc%2FH4NE34Ys%3D'
    let blobServiceClient = BlobServiceClient.fromConnectionString(con_str);
    let containerClient = blobServiceClient.getContainerClient('botanic');
    const randomId = Math.random().toString(36).substring(2);
    this.filePath = randomId + '.jpg';
    let blockBlobClient = await containerClient.getBlockBlobClient(this.filePath)
    blockBlobClient.upload(image, image.size);
    console.log(blockBlobClient.upload(image, image.size))

    this.postResult(this.resultForm.value)
  }

  async postResult(result: Result){

     this.postResult$ =  this.resultService.postResult(result).subscribe(data => {
       let name = this.photoForm.value.name
       let fieldname = this.photoForm.value.fieldname
       let userId = parseInt(localStorage.getItem('id') ?? '0')
       console.log(name)
       console.log(fieldname)
       console.log(userId)
       this.plantForm.patchValue({
         fotoPath: this.filePath,
         resultId: data.id,
         fieldName: fieldname,
         name: name,
         userId: userId
       });
        this.postPlant(this.plantForm.value)
    });
  }


  async postPlant(plant: Plant){
    console.log(plant)
      this.plantService.postPlant(plant).subscribe(res => {
        this.router.navigate(['plants/detail'], {state: {id: res.id}});
      })
  }
}
