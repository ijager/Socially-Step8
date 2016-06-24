import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Parties } from '../../../collections/parties.ts';
import { Meteor } from 'meteor/meteor';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';

@Component({
  selector: 'parties-form',
  templateUrl: '/client/imports/parties-form/parties-form.html'
})

@InjectUser()
export class PartiesForm extends MeteorComponent{
  user: Meteor.User;
  partiesForm: ControlGroup;

  constructor() {
    super();
    let fb = new FormBuilder();

    this.partiesForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required]
    });

    console.log("form:", this.user, Meteor.user());
  }

    addParty(party) {
       if (this.partiesForm.valid) {
         Parties.insert({
          name: party.name,
          description: party.description,
          location: party.location,
          owner: Meteor.userId()
        });

        (<Control>this.partiesForm.controls['name']).updateValue('');
        (<Control>this.partiesForm.controls['description']).updateValue('');
        (<Control>this.partiesForm.controls['location']).updateValue('');

      } else {
        alert('Please log in to add a party');
      }
    }
}
