import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.less'
})
export class ContactFormComponent implements OnInit {
  contact: any = { name: '', phoneNumber: 0 };
  isEditMode: boolean = false;

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.isEditMode = true;
      this.contactsService.getContact(contactId).subscribe({
        next: (contact) => {
          this.contact = contact;
        },
        error: (error) => {
          alert('Failed to load contact: ' + error.message);
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.contactsService.updateContact(this.contact).subscribe({
        next: () => {
          this.router.navigate(['/contacts']);
        },
        error: (error) => {
          alert('Failed to update contact: ' + error.message);
        }
      });
    } else {
      this.contact.phoneNumber
      this.contactsService.createContact(this.contact).subscribe({
        next: () => {
          this.router.navigate(['/contacts']);
        },
        error: (error) => {
          alert('Failed to create contact: ' + error.message);
        }
      });
    }
  }
}
