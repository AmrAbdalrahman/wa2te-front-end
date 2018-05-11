import { Component, OnInit } from '@angular/core';
import {WateserviceService} from "../services/wateservice.service";
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private _WateserviceService: WateserviceService,public ngProgress: NgProgress) { }


    settings: any;
    lang :boolean;
    today = Date.now();

  ngOnInit() {
      this.ngProgress.start();
      this.getSiteSettings();
      this.lang = this.setValuseLang();
      this.ngProgress.done();
  }
    getSiteSettings(){
        this._WateserviceService
            .getSiteSettings()
            .subscribe(settings => {
                this.settings = settings[0];
            })
    }

    setValuseLang(){
        return  this._WateserviceService.checkLang();
    }


}
