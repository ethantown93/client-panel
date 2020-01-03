import { Component, OnInit } from '@angular/core';
import { FirebaseClientService } from '../../services/firebase-client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Cleint';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  updateBalance: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private flash: FlashMessagesService, 
    private clientService: FirebaseClientService) { }

  ngOnInit() {
    // grab id from url
    this.id = this.route.snapshot.params['id']
    // grab client from firebase
    this.clientService.getClient(this.id).subscribe( client => {
      if(client !== null ){
        if(client.balance > 0){
          this.hasBalance = true;
        }
      }
      this.client = client;
    })
  }

  updateClientBalance(){
    this.clientService.updateClient(this.client);
    this.flash.show('Client Balance has been updated',{
    cssClass:'alert-success', timeout: 4000
  });
  }

  onDelete(){
    if(confirm('Are you sure you want to delete this client?')){
      this.clientService.deleteClient(this.client)
      this.flash.show('Client successfully deleted',{
      cssClass: 'alert-success', timeout: 4000
    })
    this.router.navigate(['/']);
    }
  }

}
