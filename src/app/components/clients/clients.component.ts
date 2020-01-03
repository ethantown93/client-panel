import { Component, OnInit } from '@angular/core';
import { FirebaseClientService } from '../../services/firebase-client.service'

import { Client } from '../../models/Cleint';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  balanceOwed: number;

  constructor(private clientService: FirebaseClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients,
      this.getTotal();
    })

  }

  getTotal(){
    this.balanceOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);

  }

}
