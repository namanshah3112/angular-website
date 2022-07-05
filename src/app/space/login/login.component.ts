import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginsucessService } from 'src/app/loginsucess.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(public data:LoginsucessService) { }

  ngOnInit(): void {
  }
  UserDetails= new FormGroup({
     email : new FormControl('', [Validators.required,]),
     password : new FormControl('',[Validators.required,])
  });

  public get email(){
    return this.UserDetails.get('email');
  }
  public get password(){
    return this.UserDetails.get('password');
  }

  submitdata(){
    
    console.log(this.UserDetails);
    this.data.CheckData(this.UserDetails.value).subscribe((result)=>{
      console.warn(result);
    })
  }

}
