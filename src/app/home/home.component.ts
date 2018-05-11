import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {WateserviceService} from "../services/wateservice.service";
import {Router} from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {forEach} from "@angular/router/src/utils/collection";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';



//declare  var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    public contents = [];
    public KeysList: any[] = []
    public kaywords:any;

    constructor(private _WateserviceService: WateserviceService,private router: Router,private fb:FormBuilder
                ,public ngProgress: NgProgress){

    }

    categories: any;
    governments: any;
    settings: any;
    img:string ='./assets/img/thumps/dark/';
    today = Date.now();
    lang :boolean;
    public model: any;
    public governmentSearch: any = 0;

    searchForm: FormGroup;


    ngOnInit() {
        this.ngProgress.start();
        this.getAllCategories();
        this.getAllGovernments();
        this.getSiteSettings();
        this.lang = this.setValuseLang();
        this.getKeywords();
        this.searchForm  = this.fb.group({
            name: [''],
        });
        this.ngProgress.done();
    }

    setValuseLang(){
      return  this._WateserviceService.checkLang();
    }

    getSiteSettings(){
        this._WateserviceService
            .getSiteSettings()
            .subscribe(settings => {
                this.settings = settings[0];
            })
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

    changeLanguage($event){
        if($event == 'en'){
            localStorage.setItem('lang', 'en');
        }else{
            localStorage.setItem('lang', 'ar');
        }
        this.router.navigate(['/']);

    }

    search(){
            console.log(name);
            this.router.navigate(["search/",this.model,this.governmentSearch]);
    }

    getKeywords(){
        // var KeysList = [];
        this._WateserviceService
            .getAllKeywords()
            .subscribe(res => {
                //this.kaywords = res.contacts;
                for (let obj of res.contacts) {
                    let words = obj.keywords.split(',');
                    for(let word of words)
                    this.KeysList.push(word);
                }
                console.log(this.KeysList);
            })
    }
}
