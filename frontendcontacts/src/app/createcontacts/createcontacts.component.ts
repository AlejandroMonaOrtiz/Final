import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createcontacts',
  imports: [FormsModule, NgIf],
  templateUrl: './createcontacts.component.html',
  styleUrl: './createcontacts.component.css'
})
export class CreatecontactsComponent {

  name : string="";
  lastName : string="";
  landline : number= 0;
  mobilePhone : number= 0;
  email : string="";
  public showError : boolean = false;
  public showSuccess : boolean = false;

  constructor(private router: Router, private http:HttpClient){}

    ngOnInit() {
    var session = sessionStorage.getItem('token');

    console.log(session);

    if(session == null || session.trim() ==''){
      this.router.navigate(['/login']);
    }
  }

  createContact(){
    if(this.name.trim() == "" || this.lastName.trim() == "" || this.landline <= 0 || this.mobilePhone <= 0 || this.email.trim() == ""){
      this.showError = true;
    }
    else{
      var url = "http://localhost:6549/api/contact"; 

      var headers = new HttpHeaders();
      
      headers = headers.set(
        'content-Type', 'application/json',
      );

      headers = headers.append(
      'Authorization', sessionStorage.getItem('token')!
      );


      var body = {
        'name': this.name,
        'lastName' : this.lastName,
        'landline' : this.landline,
        'mobilePhone' : this.mobilePhone,
        'email' : this.email

      }

      console.log({headers})

      this.http.post(url, body, {headers}).subscribe({
        next: (resp: any) => { 
          this.showError = false;
          this.showSuccess = true;

        },
        error: err =>{ 
          console.log(err);
          console.error(err);
          this.showSuccess = false;
          this.showError = true;
        }
      });
    }

  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }
}

