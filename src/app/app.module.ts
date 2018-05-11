import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';

// noinspection TypeScriptCheckImport
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';



import { WateserviceService } from './services/wateservice.service';
import {MessageService} from "./services/message.service";
import {SafeUrlPipe} from "./safeurlpipe";
import { SingleCategoryComponent } from './single-category/single-category.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { SingleComponent } from './single/single.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
import { PagerService } from "./_services";
//Import toast module
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { SearchPipePipe } from './search-pipe.pipe';
import { NgProgressModule } from 'ngx-progressbar';


@NgModule({
  declarations: [
    AppComponent,
    SingleCategoryComponent,
    SidenavComponent,
    HomeComponent,
    SingleComponent,
    AboutComponent,
    ContactComponent,
    SearchComponent,
      SafeUrlPipe,
      SearchPipePipe
  ],
  imports: [
    BrowserModule,  AppRoutingModule,FormsModule,NgbModule.forRoot(),
      MatInputModule,ModalModule.forRoot(),ToastModule.forRoot(),
      ReactiveFormsModule,HttpClientModule,TypeaheadModule.forRoot(),NgProgressModule,
      MatAutocompleteModule,BrowserAnimationsModule,Ng2AutoCompleteModule
  ],
  providers: [WateserviceService,MessageService,PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
