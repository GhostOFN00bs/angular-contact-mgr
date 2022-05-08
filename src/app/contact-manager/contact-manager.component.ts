import { Component, OnInit } from '@angular/core';
import {iKontakti} from "../models/iKontakti";
import {ContactService} from "../service/contact.service";
import {iGrupa} from "../models/iGrupa";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Tag {
  name: string;
}


@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  searchText:any;
  public loading:boolean = false;
  public contacts:iKontakti[] = [];
  public groups:iGrupa[]=[];
  public errorMessage: string | null = null;


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public tags: Tag[] = [];


  add (event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our tags
    if (value) {
      this.tags.push({name: value});
    }
    // Clear the input value
    event.chipInput!.clear();
  }
  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }


  constructor(private contactService : ContactService) { }


  ngOnInit(): void {
    this.getAllContactsFromServer();
    this.getAllGroupsFromServer();
  }

  public getAllContactsFromServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data ) => {
      this.contacts = data;
      this.loading = false;

    },
      (error) => {
      this.errorMessage = error;
      this.loading = false;
    })
  }

  public getAllGroupsFromServer() {
    this.loading = true;
    this.contactService.getAllGroups().subscribe((data) => {
        this.groups = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      })
  }

  public clickDeleteContact(contactId : string | undefined) {
    if(contactId) {
      this.contactService.deleteContact(contactId).subscribe((data)=> {
        this.getAllContactsFromServer();
      }, (error)=>{
        this.errorMessage = error;
      });
    }
  }

  public isNotEmpty(){
    return Object.keys(this.contacts).length > 0 && Object.keys(this.groups).length > 0;
  }
}
