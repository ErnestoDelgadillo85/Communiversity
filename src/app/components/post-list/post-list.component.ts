import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  
  posts: Post[];

  constructor(private postService: PostService,
    public userService: UserService) { 
    this.posts = [];
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  async onClickDelete(post: Post) {
    const response = await this.postService.deletePost(post);
    console.log(response);
  }
}
