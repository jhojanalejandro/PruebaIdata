import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IUser } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  formUser!: FormGroup;
  valueName: any;
  valueLastName: any;
  userEmail: any
  valueImg: any;
  numberOfTicks = 0;
  nameRaffle!: FormControl;
  constructor(private userService: UserService, 
    private snackBar:MatSnackBar,
    private ref: ChangeDetectorRef,
    private _formBuilder: FormBuilder,    
    @Inject(MAT_DIALOG_DATA) private _data: { user: any }
    ) {
      setInterval(() => {
        this.numberOfTicks++;
        this.ref.detectChanges();
        this.ref.markForCheck();
      }, 1000);
     }

  ngOnInit(): void {
      console.log('llega',this._data.user);
      this.valueName = this._data.user.first_name;
      this.valueLastName = this._data.user.last_name;
      this.valueImg = this._data.user.avatar;
      this.userEmail = this._data.user.email;
      this.formUser = new FormGroup({
        valueName: new FormControl(this.valueName,Validators.required),
        valueLastName: new FormControl(this.valueLastName,Validators.required),
        userEmail: new FormControl(this.userEmail,Validators.required),
        valueImg: new FormControl(this.valueImg,Validators.required),

      })
 

    
  }
  
  async editUser() {

    const editUser: IUser={
      id: this._data.user[0].id,
      email: this.formUser.value.email,
      first_name: this.formUser.value.valueName,
      last_name: this.formUser.value.valueLastName,
      avatar: this.formUser.value.valueImg,
    };   
    (await  this.userService.updateUser(editUser)).subscribe((data : any) =>{
      if(data){
        this.snackBar.open('Registro Actualizado','Guardado',{
          duration:2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.ref.detectChanges();
        this.ref.markForCheck();
      }else{
        this.snackBar.open('Ha ocurrido un error','vuelve a intentarlo',{
          duration:2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }
}
