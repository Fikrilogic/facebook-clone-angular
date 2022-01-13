import { Injectable } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore'
import * as firebase from '@firebase/firestore';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { PostId } from '../interface/post.interface';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  currentUser: User;
  post: AngularFirestoreCollection<PostId>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe((user) => this.currentUser = user)
    this.post = afs.collection('/posts')
  }


  getAllPosts() {
    return this.post.snapshotChanges()
      .pipe(
        map(action => action.map(
          item => ({ id: item.payload.doc.id, ...item.payload.doc.data() })
        ))
      )
  }

  async postMessage(message: string, ownerName: string, otherItems: any): Promise<void> {
    try {
      await this.afs.collection('/posts').add({
        message,
        title: ownerName,
        user_id: this.currentUser.uid,
        time: firebase.serverTimestamp(),
        ...otherItems
      })
    } catch (e) {
      console.log(e)
    }

  }
}
