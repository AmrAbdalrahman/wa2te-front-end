import {AfterViewChecked, Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import { WateserviceService } from '../services/wateservice.service';

import {ActivatedRoute, Router} from '@angular/router';
//import * as $ from 'jquery';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {InvalidData} from "../invaliddata";
//Import ToastsManager
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgProgress } from 'ngx-progressbar';

declare  let $: any;


//declare let jQuery: any;
@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})



export class SingleComponent implements OnInit, AfterViewChecked {

    crruntId:number;
    single: any;
    branches: any ;
    related: any;
    settings: any;
    workTime: any;
    nameSub: any;
    sliders: any;
    lang :boolean;
    today = Date.now();

    lng: string;
    latt: string;
    url: string ;

    img:string ='./assets/img/thumps/';

    model = new InvalidData();

    modalRef: BsModalRef;

    invalidDataForm: FormGroup;

    user = {
        correct: [
            { name: 'phone',  selected: false, id: 1 },
            { name: 'working hours',  selected: false, id: 2 },
        ]
    };

  constructor(private _WateserviceService: WateserviceService,
              private router: Router,private fb:FormBuilder,public toastr: ToastsManager, vcr: ViewContainerRef,
              private route: ActivatedRoute,private modalService: BsModalService,public ngProgress: NgProgress) {
      this.toastr.setRootViewContainerRef(vcr);
      route.params.subscribe(val => {
          this.getSingle();
          this.getSiteSettings();
          this.lang = this.setValuseLang();
          this.getUrl();
      });

      this.invalidDataForm = this.fb.group({
          correct: this.buildcorrect(),
          email: [''],
          phone: [''],
          singleHours: [''],
          singlephone: [''],
      });
  }

    get invalidInfo(): FormArray {
        return this.invalidDataForm.get('correct') as FormArray;
    };



  ngOnInit() {
      this.ngProgress.start();
    this.getSingle();
    this.getSiteSettings();
      this.lang = this.setValuseLang();
      this.getUrl();
      this.ngProgress.done();
  }
    setValuseLang(){
        return  this._WateserviceService.checkLang();
    }

    ngAfterViewChecked(){

        $(document).ready(function() {
            $("body").css("overflow", "hidden");
        });
        let width = $(window).width();
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

    getSiteSettings(){
        this._WateserviceService
            .getSiteSettings()
            .subscribe(settings => {
                this.settings = settings[0];
            })
    }


    getSingle(){
        this.crruntId = this.route.snapshot.params['id'];

        this._WateserviceService
            .getSingle(this.crruntId)
            .subscribe(single=> {
                this.single = single.contact;
                this.branches = single.contact.branches;
                this.sliders = single.contact.sliders;
                this.workTime = single.date;
                this.related = single.related;
                this.nameSub = single.nameSub;
                this.lng = single.contact.lon;
                this.latt = single.contact.lat;

            });
    }
    getUrl() {
      return  this.url = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyC8RGMfpx-R-YOR2QwLc69OZN4CEW25StE &q='+this.latt+','+this.lng+'';

       // return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }

    mapContact(lat,lon){
        this.latt = lat;
        this.lng = lon;

    }

    mapBranch(lat,lon){
        this.latt = lat;
        this.lng = lon;

    }


    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }


    buildcorrect(){
        const arr = this.user.correct.map(s => {
            return this.fb.control(s.selected);
            // return this.fb.group({
            //   selected: [s.selected],
            //   id: [s.id]
            // }
        });
        return this.fb.array(arr);
    }

    addinvalidData(value) {
      this.model.contact_id = this.crruntId;
        console.log(this.model);
        this._WateserviceService
            .addInvalidData(this.model)
            .subscribe(response => {
                if(this.lang){
                    this.toastr.success('Thanks for Interesting!', 'Success!');
                }else {
                    this.toastr.success('شكرا علي إهتمامك !', 'Success!');
                }
            });

        const f = Object.assign({}, value, {
            correct: value.correct.map((s, i) => {
                return {
                    id: this.user.correct[i].id,
                    selected: s
                }
            })
            })

        //console.log(f);
    }





}
