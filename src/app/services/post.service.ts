import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Post} from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore: Firestore) { }
  

  addPost(post: Post) {
    const postRef = collection(this.firestore, 'posts');
    return addDoc(postRef, post);
  }

  getPosts(): Observable<Post[]> {
    const postRef = collection(this.firestore, 'posts');
    const q = query(postRef, orderBy('datetime', 'desc'))
    return collectionData(q, {idField: 'id'}) as Observable<Post[]>;
  }

  deletePost(post: Post) {
    const postDocRef = doc(this.firestore, `posts/${post.id}`);
    return deleteDoc(postDocRef);

  }
}
