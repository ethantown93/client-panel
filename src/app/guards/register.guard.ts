import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class RegisterGuard implements CanActivate{
    constructor(
        private router: Router,
        private settings: SettingsService,
        private flash: FlashMessagesService
    ){}

    canActivate(): boolean {
        if(this.settings.getSettings().allowRegistration){
            return true;
        } else {
            this.flash.show('Registration is temporarily disabled.', {
                cssClass: 'alert-danger', timeout: 4000
            })
            this.router.navigate(['/login']);
            return false;
        }
    }
}