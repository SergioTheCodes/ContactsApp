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

  editContact(id: string) {
    // Navigate to the edit form with the contact ID
  }

  deleteContact(id: string) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactsService.deleteContact(id).subscribe({
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
