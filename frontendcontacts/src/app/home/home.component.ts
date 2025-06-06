import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  contactsList : any[] = [];

  constructor(private router: Router, private http:HttpClient){}

  ngOnInit() {
    var session = sessionStorage.getItem('token');

    if(session == null || session.trim() ==''){
      this.router.navigate(['/login']);
    }

    this.loadContacts();
  }

  loadContacts() {
    const token = sessionStorage.getItem('token'); 

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); 

    const url = 'http://localhost:6549/api/contacts';

    this.http.get(url, { headers }).subscribe({
      next: (resp: any) => {
        this.contactsList = resp.contacts;
      },
      error: err => {
        console.error(err); 
      }
    });
  }


  logOut(){
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  navigateToCreateContact(){
    this.router.navigate(['/createcontacts']);
  } 

  deleteContact(id: string){
    if (confirm("¿Está seguro de eliminar este contacto?") == true) {
      
      var url = "http://localhost:6549/api/contact/"+id;

      var headers = new HttpHeaders();
      
      headers = headers.set(
        'content-Type', 'application/json',
      );

      headers = headers.append(
      'Authorization', sessionStorage.getItem('token')!
      );

      this.http.delete(url, {headers}).subscribe({
        next: (resp: any) => { 
          for(var i = 0; i < this.contactsList.length; i++){
            if(this.contactsList[i]._id == id){
              this.contactsList.splice(i, 1);
            }
          }
          
        },
        error: err =>{ 
          console.error(err);
        }
      });
    }
  }
}
