import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatecontactsComponent } from './createcontacts/createcontacts.component';

export const routes: Routes = [
    {path: 'createcontacts', component: CreatecontactsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: '', component: HomeComponent}
];
