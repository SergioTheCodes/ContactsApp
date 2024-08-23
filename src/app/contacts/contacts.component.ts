import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.less'
})
export class ContactsComponent {
  contacts: any[] = [];

  constructor(private contactsService: ContactsService) {}

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
    if (contact) {
      this.contactsService.updateContact(contact).subscribe({
        next: (contact) => {
          this.loadContacts();
        },
        error: (error) => {
          alert('Failed to load contact: ' + error.message);
        }
      });
    }
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
