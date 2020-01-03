import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    private flash: FlashMessagesService,
    private router: Router,
    private setting: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.setting.getSettings();
  }

  onSubmit(){
    this.setting.changeSettings(this.settings);
    this.flash.show('Settings have been saved.', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

}
