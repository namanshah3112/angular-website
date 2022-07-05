import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  
  @Output() value = new EventEmitter();
  today =new Date()

  ngOnInit(): void {

  }
  details = new FormGroup({
  fname:new FormControl('',Validators.required),
  Mname:new FormControl('',Validators.required),
  Lname:new FormControl('',Validators.required),
  
    Mnumber : new FormControl ('', [Validators.required , Validators.minLength(10),Validators.maxLength(10)]),
    Tnumber : new FormControl ('', [Validators.required , Validators.minLength(7),Validators.maxLength(14)]),
    
   
    tdate : new FormControl ('', [Validators.required ]),
    Blood:new FormControl ('', [Validators.required ]),
    Gender: new FormControl('',[Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    Status : new FormControl ('', [Validators.required ]),
  })
    get ErrorFname() {

      return this.details.get('fname');
    }
  
    get ErrorMname() {

      return this.details.get('Mname');
    }
  
    get ErrorLname() {
   
      return this.details.get('Lname');
    }
  
    get ErrorTelephone() {
  
      return this.details.get('Tnumber');
    }
  
    get Errornumber() {
 
  
      return this.details.get('Mnumber');
    }
  
    get Erroremail() {
      return this.details.get('email');
    }
    get ErrorDate() {
      return this.details.get('tdate');
    }
    get ErrorGender() {
      return this.details.get('Gender');
  
    }
  
    get ErrorStatus() {
      return this.details.get('Status');
  
    }
    get ErrorBlood() {
      return this.details.get('Blood');
  
    } 
   valuech(){
    console.warn(this.details.value);
    
   }

}

