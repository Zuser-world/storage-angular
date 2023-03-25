import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, listAll, deleteObject,  } from '@angular/fire/storage';
// import { listAll } from '@firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  existImg: boolean = false;
  images: string[] = [];
  file_data: any;
  imgRef: any;
  constructor(
    private storage: Storage,
  ){}

  ngOnInit(): void {
    this.getImg();
  }
  title = 'storage';
  uploadImage($event: any){
    console.log($event.target.files.length);
    this.file_data= $event.target.files[0]
    console.log(this.file_data)
    this.imgRef = ref(this.storage, `img/${this.file_data.name}`);

  }
  subirImagen (){
    console.log(this.file_data)
    uploadBytes(this.imgRef, this.file_data).then((x) => {
      console.log("Subiendo Imagen")
      console.log(x)
      this.getImg()
    }).catch((err) => {
      console.log(err)
    })
  }


  getImg(){
    // const imgOne = ref(this.storage, 'img/angular.svg')
    // console.log(imgOne)
    // getDownloadURL(imgOne).then((url) => {
    //   console.log("URL: DE UNA SOLA IMAGEN")
    //   console.log(url)
    //   console.log("@@@@@@@@@@@@@@@@@@@@@@@@")
    // })
    const imgRef = ref(this.storage, 'img');
    console.log("Referencia:")

    console.log(imgRef)
    this.images = [];
    listAll(imgRef).then((x) => {
      console.log("La parte de la x")
      console.log(x)
      for(let image of x.items){
        console.log("La parte de la Image")
        console.log(image)
        console.log("Nombre de la Imagen")
        console.log(image.name)

        // const url =  getDownloadURL(image)
        // url.then((x) => {
        //   this.images.push(x)
        //   console.log(x)
        //   this.existImg = true;
        // })
        getDownloadURL(image).then((x) => {
          this.images.push(x)
          this.existImg = true;
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  deleteImg(){
  
    console.log(this.images[0])
    // const imgRef = ref(this.storage, 'img/angular.svg');
    const imgRef = ref(this.storage, this.images[0]);
    deleteObject(imgRef).then(() => {
      console.log("Borrar Datos")
      this.getImg()
      this.existImg = false;
    })
    
  }
}
