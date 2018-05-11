import {Component, OnInit, AfterViewChecked } from '@angular/core';
import { WateserviceService } from '../services/wateservice.service';
import {ActivatedRoute, Params, Router,} from '@angular/router';
import { Location } from "@angular/common";

declare  var $: any;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewChecked {

    constructor(private _WateserviceService: WateserviceService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location
    ){}

    categories: any;
    lang :boolean;
    sub:boolean = false;
    query:any;

    ngOnInit() {
        this.getAllCategories();
        this.lang = this.setValuseLang();
    }

    setValuseLang(){
        return  this._WateserviceService.checkLang();
    }

    getAllCategories(){
        this._WateserviceService
            .showAllCategories()
            .subscribe(categories => {
                this.categories = categories;
            })
    }

    ngAfterViewChecked(){
        // $(document).on('click', '.navSideBar', function() {
        //     $('header').toggleClass('closed');
        //     $('i', this).toggleClass('ion-ios-arrow-thin-left ion-ios-arrow-thin-right');
        // });
    }

    showSub(cat){
        if(!this.sub) {
            this.sub = true;
            $('#'+cat).css('display', 'block');
            $(this).find('.ion-android-add').css('transform', 'rotate(45deg)');
        }
        else {
                this.sub = false;
            $('#'+cat).css('display', 'none');
            $(this).find('.ion-android-add').css('transform', 'rotate(0deg)');

        }
    }


}
