import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    id: '',
    url: ''
  };
  msg = 'error';
  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase) { }

  // tslint:disable-next-line: typedef
  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  // tslint:disable-next-line: typedef
  insertImageDetails(id, url) {
    this.dataSet = {
      id,
      url
    };
    this.imageDetailList.push(this.dataSet);
  }
  // tslint:disable-next-line: typedef
  getImage(value){
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => item.payload.val());
        this.fileList.forEach(element => {
          if (element.id === value) {
          this.msg = element.url;
          }
        });
        if (this.msg === 'error') {
          alert('No record found');
        }
        else{
          window.open(this.msg);
          this.msg = 'error';
        }
      }
    );
  }
}
export interface Data{
  id: string;
  url: string;
}
