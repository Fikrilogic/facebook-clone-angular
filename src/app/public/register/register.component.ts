import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  // private dialogRef: MatDialogRef<RegisterComponent>, @inject(MAT_DIALOG_DATA) private data: DialogData
  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  validDisable: boolean = false

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dialogRef.close()
  }


  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    avatar: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),

  })

  register(): any {
    this.validDisable = true
    this.auth.signUp(this.email.value, this.password.value, { firstName: this.firstName.value, lastName: this.lastName.value, avatar: this.avatar.value }).then((value) => {
      this.snack.open('Register success', 'close', {
        duration: 5000, verticalPosition: 'top', horizontalPosition: 'right'
      })
      this.dialogRef.close()
    }).catch(value => {
      this.snack.open('Register Failed', 'close', {
        duration: 5000, verticalPosition: 'top', horizontalPosition: 'right'
      })
    })
  }


  get firstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl
  }
  get lastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl
  }
  get email(): FormControl {
    return this.registerForm.get('email') as FormControl
  }
  get avatar(): FormControl {
    return this.registerForm.get('avatar') as FormControl
  }
  get password(): FormControl {
    return this.registerForm.get('password') as FormControl
  }

  closeDialog(): void {
    this.dialogRef.close(true)
  }

}
