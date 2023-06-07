import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  url = "http://localhost:3000/enroll"
  constructor(private http:HttpClient) { }

  register(userData){

    return this.http.post<any>(this.url,userData);
  }

}
