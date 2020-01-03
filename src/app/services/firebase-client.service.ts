import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Client } from '../models/Cleint';

@Injectable({
  providedIn: 'root'
})
export class FirebaseClientService {

  collectionOfClients: AngularFirestoreCollection<Client>;
  clientDocument: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {

    this.collectionOfClients = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));

   }

   getClients(): Observable<Client[]> {
     //get clients with their ID stored in Firebase
     this.clients = this.collectionOfClients.snapshotChanges().pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as Client;
         data.id = action.payload.doc.id;
         return data;
       });
     }));
     return this.clients;
   }

   newClient(client: Client){
    this.collectionOfClients.add(client);
   }

   getClient(clientId: string): Observable<Client>{
    this.clientDocument = this.afs.doc<Client>(`clients/${clientId}`)
    this.client = this.clientDocument.snapshotChanges().pipe(map( action => {
      if(action.payload.exists === false){
        return null
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data 
      }
    }));
    return this.client
   }

   updateClient(client: Client){
     this.clientDocument = this.afs.doc(`clients/${client.id}`);
     this.clientDocument.update(client);
   }

   deleteClient(client: Client){
    this.clientDocument = this.afs.doc(`clients/${client.id}`);
    this.clientDocument.delete();
  }

}
