import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  formulario: FormGroup;
  public file: any = {};
  public fileURL: string = "";
  public progress: number = 0;
  public datos: any = {};

  constructor(private postService: PostService,
    private userService: UserService,
    public modalRef: MdbModalRef<NewPostComponent>,
    public storage: Storage,
    private toastr: ToastrService) {
    this.formulario = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(),
    })
  }

  setPostValue() {
    const date = new Date();
    this.datos = {
      ...this.formulario.value,
      datetime: date,
      date: date.toLocaleDateString('es-MX'),
      author: this.userService.getUserName(),
      authorId: this.userService.getUserId(),
      imageUrl: this.fileURL
    }
  }

  // async onSubmit() {
  //   const date = new Date()
  //   this.uploadImage();
  //   let datos = {
  //     ...this.formulario.value,
  //     datetime: date,
  //     date: date.toLocaleDateString('es-MX'),
  //     author: this.userService.getUserName(),
  //     authorId: this.userService.getUserId(),
  //     imageUrl: this.fileURL
  //   }
  //   console.log(datos);
  //   const response = await this.postService.addPost(datos);
  //   console.log(response);
  //   this.formulario.reset();
  // }

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }

  uploadImage() {
    const storageRef = ref(this.storage, `images/${this.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on('state_changed',
    (snapshot) => {
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`progress is ${this.progress}%`);
      console.log(this.progress);
    },
    (error) => {
      console.log(error.message);
      this.toastr.error(error.message, 'Ha ocudido un error', {
        timeOut: 3000,
      });
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        this.fileURL = downloadURL;
        console.log(`file is in ${downloadURL}`);
        console.log(this.fileURL);

        this.setPostValue();
        this.postService.addPost(this.datos).then(response => {
          console.log(response);
          this.formulario.reset();
          this.modalRef.close();
        });
      });
      
    }
    )
    
  }

}
