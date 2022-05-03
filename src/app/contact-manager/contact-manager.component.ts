import { Component, OnInit } from '@angular/core';
import {iKontakti} from "../models/iKontakti";
import {ContactService} from "../service/contact.service";

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading:boolean = false;
  public contacts:iKontakti[] = [];
  public errorMessage: string | null = null;

  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data :iKontakti[]) => {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
        this.errorMessage = error;
        this.loading = false;
    })
  }

}
