import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../service/contact.service";
import {iKontakti} from "../models/iKontakti";
import {iGrupa} from "../models/iGrupa";

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public loading:boolean = false;
  public contactId:string | null = null;
  public contact:iKontakti = {} as iKontakti;
  public errorMessage : string | null = null;
  public group:iGrupa = {} as iGrupa;


  constructor(private activatedRoute : ActivatedRoute,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=> {
      this.contactId = param.get('contactId')
    });
    if(this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data)=> {
        this.contact= data;
        this.loading= false;
        this.contactService.getGroup(data).subscribe((data)=> {
          this.group = data;
        });
      }, (error)=> {
          this.errorMessage = error;
          this.loading = false;
      });
    }
  }

  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
