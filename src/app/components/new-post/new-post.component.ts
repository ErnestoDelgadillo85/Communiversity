import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  formulario: FormGroup;

  constructor(private postService: PostService,
    private userService: UserService) {
    this.formulario = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(),
    })
  }

  async onSubmit() {
    const date = new Date()
    let datos = {
      ...this.formulario.value,
      datetime: date,
      date: date.toDateString(),
      author: this.userService.getUserName(),
      authorId: this.userService.getUserId()
    }
    console.log(datos);
    const response = await this.postService.addPost(datos);
    console.log(response);
    this.formulario.reset();
  }

}
