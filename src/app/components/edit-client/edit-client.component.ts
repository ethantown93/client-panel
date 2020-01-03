import { Component, OnInit } from '@angular/core';
import { FirebaseClientService } from '../../services/firebase-client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Cleint';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  
  id: string; 
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private flash: FlashMessagesService, 
    private clientService: FirebaseClientService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settings.getSettings().disableBalanceOnEdit;

    // grab id from url
    this.id = this.route.snapshot.params['id']
    // grab client from firebase
    this.clientService.getClient(this.id).subscribe( client =>
      this.client = client)
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(!valid){
      this.flash.show('Form values are incorrect',{
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flash.show('The Client has been updated.',{
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/client/'+this.id])
    }
  }

}
