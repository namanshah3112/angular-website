import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginsucessService {
  userdetail='';
  constructor(private data:HttpClient) { }

  CheckData(data:any){
    let url="https://reqres.in/api/login" ;
     return this.data.post(url,data);
}
}