import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private router: Router, 
    private flash: FlashMessagesService, 
    private auth: AuthService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.auth.getAuth().subscribe( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    })  

    this.showRegister = this.settings.getSettings().allowRegistration;

  }

  onLogout(){
    this.auth.logout();
    this.flash.show('You have successfully logged out', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/login'])
  }

}
