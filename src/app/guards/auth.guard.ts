import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private flash: FlashMessagesService
    ){}

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(auth => {
            if(!auth) {
                this.router.navigate(['/login']);
                this.flash.show('You are not authorized to access that page.',{
                    cssClass: 'alert-danger', timeout: 4000
                })
                return false;
            } else {
                return true;
            }
        }));
    }
}