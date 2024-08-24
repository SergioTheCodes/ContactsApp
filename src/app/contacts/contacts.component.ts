import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.less'
})
export class ContactsComponent {
  contacts: any[] = [];  

  constructor(private contactsService: ContactsService, private router: Router,) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactsService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
      },
      error: (error) => {
        alert('Failed to load contacts: ' + error.message);
      }
    });
  }

  editContact(contact: any) {
    this.router.navigate(['/contacts', contact.id, 'edit']);
  }

  deleteContact(contact: any) {
    if (confirm('Are you sure you want to delete this contact?')) {      
      this.contactsService.deleteContact(contact).subscribe({
        next: () => {
          this.loadContacts();
        },
        error: (error) => {
          alert('Failed to delete contact: ' + error.message);
        }
      });
    }
  }
}
