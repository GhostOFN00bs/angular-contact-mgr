import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import { iGrupa } from '../models/iGrupa';
import { iKontakti } from '../models/iKontakti';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private serverUrl:string=`http://localhost:9000`;

  constructor(private httpClient : HttpClient) {
  }

  public getAllContacts():Observable<iKontakti[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<iKontakti[]>(dataURL).pipe(catchError(this.handleError))
  }

  public getContact(contactId :string):Observable<iKontakti>{
    let dataURL : string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<iKontakti>(dataURL).pipe(catchError(this.handleError));
  }


  public createContact(contact : iKontakti):Observable<iKontakti>{
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<iKontakti>(dataURL, contact).pipe(catchError(this.handleError))
  }


  public updateContact(contact : iKontakti, contactId : string):Observable<iKontakti>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<iKontakti>(dataURL, contact).pipe(catchError(this.handleError))
  }


  public deleteContact(contactId : string):Observable<{}>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError))
  }

  public getAllGroups():Observable<iGrupa[]> {
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<iGrupa[]>(dataURL).pipe(catchError(this.handleError))
  }

  public getGroup(contact: iKontakti):Observable<iGrupa>{
    let dataURL : string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<iGrupa>(dataURL).pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error : ${error.error.message}`
    } else {
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
