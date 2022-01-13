import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { IUser } from '../interface/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: any;
  private userState: any;
  private currentUser = new BehaviorSubject<any>(null);

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.afs.collection('/user')
          .doc(user.uid).valueChanges().subscribe(
            userProfile => {
              // console.log('user profile', userProfile)
              this.userData = userProfile
              console.log(this.userData)
              this.currentUser.next(this.userData);
            }
          )
        this.userState = user
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'))
      }
    })
  }

  getUserData(): Observable<any> {
    return this.currentUser.asObservable()
  }


  async signUp(email: string, password: string, profile: IUser): Promise<any> {
    const user = await this.auth.createUserWithEmailAndPassword(email, password)
    if (user) {
      this.afs.collection('user').doc(user.user.uid).set({
        avatar: profile.avatar,
        email: email,
        firstName: profile.firstName,
        lastName: profile.lastName
      }).then(
        res => {
          this.afs.collection('user').doc(user.user.uid)
            .valueChanges()
            .subscribe(user => {
              if (user) {
                this.currentUser.next(user)
              }
            })
        }
      )
    }
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.snack.open('Login success', 'close', {
          duration: 5000, verticalPosition: 'top', horizontalPosition: 'right'
        })
        this.router.navigate(['private/home'])
      })
      .catch(err => {
        this.snack.open('Login Failed', 'close', {
          duration: 5000, verticalPosition: 'top', horizontalPosition: 'right'
        })
      })
  }

  isLogin(): boolean {
    const data = JSON.parse(localStorage.getItem('user'))
    return (data !== null) ? true : false
  }

  logout(): void {
    this.auth.signOut().then(res => {
      localStorage.removeItem('user')
      this.userData = null;
      this.currentUser.next(this.userData)
      this.router.navigate(['private/login'])
    })
  }

  get user(): Observable<User> {
    return this.currentUser
  }
}
