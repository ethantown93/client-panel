import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private flash: FlashMessagesService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.auth.register(this.email, this.password).then( res => {
      this.flash.show('You have successfully registered and logged in', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    })
    .catch( err => {
      this.flash.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      })
    })
  }

}
