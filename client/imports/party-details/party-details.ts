import { Component } from '@angular/core';
import { RouteParams, RouterLink } from '@angular/router-deprecated';
import {Parties} from '../../../collections/parties.ts';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Meteor } from 'meteor/meteor';
import { RequireUser } from 'angular2-meteor-accounts-ui';
import {CanActivate, ComponentInstruction} from '@angular/router-deprecated';

function checkPermissions(instruction: ComponentInstruction) {
  var partyId = instruction.params['partyId'];
  var party = Parties.findOne(partyId);
  return (party && party.owner == Meteor.userId());
}

@Component({
  selector: 'party-details',
  templateUrl: '/client/imports/party-details/party-details.html',
  directives: [RouterLink]
})

//@RequireUser()
@CanActivate(checkPermissions)
export class PartyDetails {
  party: Object;
  partyForm: ControlGroup;

  constructor(params: RouteParams) {
    var partyId = params.get('partyId');
    this.party = Parties.findOne(partyId);

    let fb = new FormBuilder();
    this.partyForm = fb.group({
     name: [''],
     description: [''],
     location: ['']
    });
  }

  saveParty(party) {
     if (Meteor.userId()) {
       Parties.update(party._id, {
         $set: {
           name: party.name,
           description: party.description,
           location: party.location
         }
       });
     } else {
       alert('Please log in to change this party');
     }
   }

 savePartyValid(party) {
    if (this.partyForm.valid) {
      this.saveParty(party);
    }
  }
}
