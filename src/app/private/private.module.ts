import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PrivateRoutingModule } from './private-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { PostComponent } from './home/post/post.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
