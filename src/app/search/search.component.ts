import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { DatePipe } from '@angular/common';

import { WateserviceService } from '../services/wateservice.service';

import {ActivatedRoute, Params, Router} from '@angular/router';
import { PagerService } from "../_services";
import * as _ from 'underscore';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgProgress} from "ngx-progressbar";
declare  var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewChecked {

    constructor(private _WateserviceService: WateserviceService,
                private router: Router,
                private route: ActivatedRoute,public ngProgress: NgProgress,
                private pagerService: PagerService,private fb:FormBuilder,) {
        route.params.subscribe(val => {
            this.ngProgress.start();
            this.name = this.route.snapshot.params['name'];
            this.gov = this.route.snapshot.params['gov'];
            this.getResult();
            this.getSiteSettings();
            this.getSliders();
            this.getAllGovernments();
            this.getAllCategories();
            this.lang = this.setValuseLang();
            this.searchForm  = this.fb.group({
                name: [''],
            });
            this.ngProgress.done();
        });
    }

    singleCat: any;
    subCat: any;
    settings: any;
    sliders: any;
    // pager object
    pager: any = {};
    name:string;
    gov:any;

    // paged items
    pagedItems: any[];
    today = Date.now();
    lang :boolean;
    error: string = '';
    searchForm: FormGroup;
    governments: any;
    categories: any;
    query: any;

    ngOnInit() {
        this.ngProgress.start();
        this.name = this.route.snapshot.params['name'];
        this.gov = this.route.snapshot.params['gov'];
        this.getResult();
        this.getSiteSettings();
        this.getSliders();
        this.getAllGovernments();
        this.lang = this.setValuseLang();
        this.getAllCategories();
        this.searchForm  = this.fb.group({
            name: [''],
        });
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

        $(window).resize(function(){
            var width = $(window).width();
            if ( (width <= 767) ) {
                $('.categories-cards').mCustomScrollbar({
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
        });
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

    getSliders(){
        this._WateserviceService
            .getSlidersSub()
            .subscribe(sliders => {
                this.sliders = sliders;
                // console.log(this.categories);
            })
    }

    getResult(){
        let name = this.route.snapshot.params['name'];
        let gov = this.route.snapshot.params['gov'];

        this._WateserviceService
            .search(name,gov)
            .subscribe(singleCat => {
                console.log(singleCat.contacts);
                if(singleCat == 'no data'){
                    if(this.lang){
                        this.error = "No results to show";
                    }
                    else {
                        this.error = "لم يتم العثور علي أي بيانات";
                    }

                }else {
                    this.singleCat = singleCat.contacts;
                    this.subCat = singleCat.namesub[0];
                    // initialize to page 1
                    this.setPage(1);
                }

            })
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.singleCat.length, page);

        // get current page of items
        this.pagedItems = this.singleCat.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    search(){
        this.router.navigate(["search/",this.name,this.gov]);
    }

    getAllGovernments(){
        this._WateserviceService
            .getAllgovernments()
            .subscribe(governments => {
                this.governments = governments;
                // console.log(this.categories);
            })
    }
    getAllCategories(){
        this._WateserviceService
            .showAllCategories()
            .subscribe(categories => {
                this.categories = categories;
            });
    }

    }
