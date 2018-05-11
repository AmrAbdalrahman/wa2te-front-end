import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { SingleComponent } from './single/single.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {SearchComponent} from "./search/search.component";



const routes:Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'singleSubCategory/:id', component: SingleCategoryComponent},
    {path: 'single/:id', component: SingleComponent},
    {path: 'about', component: AboutComponent},
    {path: 'advertise', component: ContactComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'search/:name/:gov', component: SearchComponent}

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }
