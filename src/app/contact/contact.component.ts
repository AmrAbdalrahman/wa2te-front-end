import { Component, OnInit } from '@angular/core';
import {WateserviceService} from "../services/wateservice.service";
import {MessageService} from "../services/message.service";
import {Contact} from '../contact';
import {Router} from '@angular/router';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private _WateserviceService: WateserviceService,
    private messageService: MessageService,
    private router: Router,public ngProgress: NgProgress) { }

    settings: any;
    lang :boolean;
    title: string;
    today = Date.now();
    model = new Contact();

  ngOnInit() {
      this.ngProgress.start();
      this.getSiteSettings();
      this.lang = this.setValuseLang();
      this.changeTittle();
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

    addContactSubmit(){
            this._WateserviceService
                .addContact(this.model)
                .subscribe(response => {
                    if(this.lang){
                        this.messageService.showMessage("div#msg1","alert-info","The message has been sent successfully","glyphicon-ok" );

                    }else {
                        this.messageService.showMessage("div#msg1","alert-info","تم إرسال الرسالة بنجاح","glyphicon-ok" );

                    }
                })

    }

    changeTittle(){
        if((this.router.url) == '/advertise' && this.lang){
            this.title = 'Advertise with Us';
        }else if ((this.router.url) == '/advertise' && !this.lang){
            this.title = 'أعلن معنا';
        }
        else if ((this.router.url) == '/contact' && this.lang){
            this.title = 'Contact with Us';
        }else {
            this.title = 'تواصل معنا';
        }

    }


}
