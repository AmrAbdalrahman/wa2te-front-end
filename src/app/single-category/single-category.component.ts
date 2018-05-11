import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { WateserviceService } from '../services/wateservice.service';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgProgress} from "ngx-progressbar";

declare  var $: any;

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit, AfterViewChecked {

  constructor(private _WateserviceService: WateserviceService,
    private router: Router,
    private route: ActivatedRoute,public ngProgress: NgProgress) {
      route.params.subscribe(val => {
          this.getSingleCategory();
          this.getSiteSettings();
          this.lang = this.setValuseLang();
      });
  }

    singleCat: any;
    subCat: any;
    settings: any;
    sliders = [];
    today = Date.now();
    lang :boolean;

  ngOnInit() {
      this.ngProgress.start();
    this.getSingleCategory();
      this.getSiteSettings();
      this.lang = this.setValuseLang();
      this.ngProgress.done();
  }
    ngAfterViewChecked(){
        $(document).ready(function() {
            $("body").css("overflow", "hidden");
        });
        var width = $(window).width();
        if ( (width <= 767) ) {
            $('.categories-cards, #single .place-details').mCustomScrollbar({
                theme: "inset",
                mouseWheelPixels: 200,
                // scrollInertia: .1,
                scrollButtons:{ enable: true }
            });
            // Fix Single Catg Row
            $('.single-card.asGrid').removeClass('asGrid').addClass('asRow');
        } else {
            $('.categories-cards, .place-details, .result-cards, header > nav > ul, #cities, #single .place-details').mCustomScrollbar({
                theme: "inset",
                mouseWheelPixels: 200,
                // scrollInertia: .1,
                scrollButtons:{ enable: true }
            });
        }
    }

    setValuseLang(){
        return  this._WateserviceService.checkLang();
    }
    getSiteSettings(){
        this._WateserviceService
            .getSiteSettings()
            .subscribe(settings => {
                this.settings = settings[0];
                // console.log(this.categories);
            })
    }

    getSingleCategory():any {
        var id = this.route.snapshot.params['id'];

        this._WateserviceService
            .getSubCat(id)
            .subscribe(subCategory => {
                this.subCat = subCategory.subCat;
                this.singleCat = subCategory.subCat.contacts;
                this.sliders = subCategory.subCat.sliders;
                //console.log (this.today);
            })
    }

}
