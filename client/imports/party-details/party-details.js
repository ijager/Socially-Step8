"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var parties_ts_1 = require('../../../collections/parties.ts');
var common_1 = require('@angular/common');
var meteor_1 = require('meteor/meteor');
var router_deprecated_2 = require('@angular/router-deprecated');
function checkPermissions(instruction) {
    var partyId = instruction.params['partyId'];
    var party = parties_ts_1.Parties.findOne(partyId);
    return (party && party.owner == meteor_1.Meteor.userId());
}
var PartyDetails = (function () {
    function PartyDetails(params) {
        var partyId = params.get('partyId');
        this.party = parties_ts_1.Parties.findOne(partyId);
        var fb = new common_1.FormBuilder();
        this.partyForm = fb.group({
            name: [''],
            description: [''],
            location: ['']
        });
    }
    PartyDetails.prototype.saveParty = function (party) {
        if (meteor_1.Meteor.userId()) {
            parties_ts_1.Parties.update(party._id, {
                $set: {
                    name: party.name,
                    description: party.description,
                    location: party.location
                }
            });
        }
        else {
            alert('Please log in to change this party');
        }
    };
    PartyDetails.prototype.savePartyValid = function (party) {
        if (this.partyForm.valid) {
            this.saveParty(party);
        }
    };
    PartyDetails = __decorate([
        core_1.Component({
            selector: 'party-details',
            templateUrl: '/client/imports/party-details/party-details.html',
            directives: [router_deprecated_1.RouterLink]
        }),
        router_deprecated_2.CanActivate(checkPermissions), 
        __metadata('design:paramtypes', [router_deprecated_1.RouteParams])
    ], PartyDetails);
    return PartyDetails;
}());
exports.PartyDetails = PartyDetails;
//# sourceMappingURL=party-details.js.map