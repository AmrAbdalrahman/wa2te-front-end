import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
    constructor(@Inject(DOCUMENT) private document){}

    ngOnInit() {
        this.chooseLanguage();
        this.selectstyle();
    }


    selectstyle(){
        if(localStorage.getItem('lang') == 'en'){
            this.document.getElementById('theme').setAttribute('href', 'assets/css/output/style.css');
        }
        else {
            this.document.getElementById('theme').setAttribute('href', 'assets/ar/css/style.css');
        }
    }

    chooseLanguage(){
        if (localStorage.getItem('lang') === null) {
            localStorage.setItem('lang', 'en');
        }

    }






}
