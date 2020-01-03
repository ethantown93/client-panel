import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseClientService } from '../../services/firebase-client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Cleint';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm', {static: false}) form:any;

  constructor(
    private flash: FlashMessagesService,
    private clientService: FirebaseClientService,
    private router: Router,
    private settings: SettingsService
    ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settings.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if(!valid){
      this.flash.show('Please enter valid form information', {cssClass: 'alert-danger', timeout: 4000})
    } else {
      this.clientService.newClient(value);
      this.flash.show('Client has been successfully added', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
