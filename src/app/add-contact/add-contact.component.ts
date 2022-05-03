import { Component, OnInit } from '@angular/core';
import {iKontakti} from "../models/iKontakti";
import {iGrupa} from "../models/iGrupa";
import {ContactService} from "../service/contact.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading : boolean = false;
  public contact : iKontakti = {} as iKontakti;
  public errorMessage : string | null = null;
  public groups : iGrupa[] = [] as iGrupa[];

  constructor(private contactService : ContactService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data)=> {
      this.groups = data;
    }, (error) => {
      this.errorMessage = error;
    });
  }

  public createSubmit(){
    this.contactService.createContact(this.contact).subscribe((data)=>{
      this.router.navigate(['/']).then();
    }, (error)=> {
    this.errorMessage = error;
    this.router.navigate(['/contacts/add']).then();
  })
 }
}
