import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'https://localhost:7080/api/Contact'; *

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetContacts`).pipe(
      catchError(this.handleError<any[]>('GetContacts', []))
    );
  }

  getContact(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetContactById?id=${id}`).pipe(
      catchError(this.handleError<any>(`GetContactById id=${id}`))
    );
  } 

  createContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddContact`, contact).pipe(
      catchError(this.handleError<any>('AddContact'))
    );
  }

  updateContact(contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateContact`, contact).pipe(
      catchError(this.handleError<any>('UpdateContact'))
    );
  }

  deleteContact(contact: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: contact
    }
    return this.http.delete<any>(`${this.apiUrl}/DeleteContact`, httpOptions).pipe(
      catchError(this.handleError<any>('DeleteContact'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
