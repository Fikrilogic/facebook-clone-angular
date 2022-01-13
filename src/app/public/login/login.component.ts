import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })


  get email(): FormControl {
    return this.loginForm.get('email') as FormControl
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl
  }

  login() {
    this.auth.signIn(this.email.value, this.password.value)
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
      height: '300px',
      panelClass: 'register-container',
    })

    dialogRef.afterOpened().subscribe(result => {
      console.log('Register component opened')
    })

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Register component closed')
      }
    )
  }

}
