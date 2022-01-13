import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { PostId } from 'src/app/interface/post.interface';
import { IUser } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  search: Boolean = false;
  images: any[] = [
    'https://images-na.ssl-images-amazon.com/images/I/51DR2KzeGBL._AC_.jpg',
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://torange.biz/photofx/93/8/light-vivid-colors-fragment-love-background-rain-fall-cover-93412.jpg',
    'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_960_720.jpg',
    'https://c0.wallpaperflare.com/preview/956/761/225/5be97da101a3f.jpg',
  ];

  post: any[];
  data: [];
  user!: IUser;
  subs: Subscription[] = [];


  constructor(private postService: PostsService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.retrieveAllPost();
    this.retrieveUserData();
  }

  postForm: FormGroup = new FormGroup(
    {
      message: new FormControl(null)
    }
  )


  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe())
  }

  submitPost(): void {
    this.postService.postMessage(this.message.value, `${this.user.firstName} + ${this.user.lastName}`, {
      avatar: this.user.avatar,
      firstName: this.user.firstName,
      lastName: this.user.lastName
    }).then(
      res => {
        this.message.reset()
      }
    )
  }


  retrieveAllPost(): void {
    this.subs.push(this.postService.getAllPosts().subscribe(post => {
      this.post = post
    }))
  }

  retrieveUserData(): void {
    this.subs.push(this.authService.getUserData().subscribe(
      data => {
        this.user = data
      }
    ))
  }

  get message(): FormControl {
    return this.postForm.get('message') as FormControl
  }

}
