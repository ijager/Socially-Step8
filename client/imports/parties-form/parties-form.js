"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_1 = require('@angular/common');
var parties_ts_1 = require('../../../collections/parties.ts');
var meteor_1 = require('meteor/meteor');
var angular2_meteor_accounts_ui_1 = require('angular2-meteor-accounts-ui');
var angular2_meteor_1 = require('angular2-meteor');
var PartiesForm = (function (_super) {
    __extends(PartiesForm, _super);
    function PartiesForm() {
        _super.call(this);
        var fb = new common_1.FormBuilder();
        this.partiesForm = fb.group({
            name: ['', common_1.Validators.required],
            description: [''],
            location: ['', common_1.Validators.required]
        });
        console.log("form:", this.user, meteor_1.Meteor.user());
    }
    PartiesForm.prototype.addParty = function (party) {
        if (this.partiesForm.valid) {
            parties_ts_1.Parties.insert({
                name: party.name,
                description: party.description,
                location: party.location,
                owner: meteor_1.Meteor.userId()
            });
            this.partiesForm.controls['name'].updateValue('');
            this.partiesForm.controls['description'].updateValue('');
            this.partiesForm.controls['location'].updateValue('');
        }
        else {
            alert('Please log in to add a party');
        }
    };
    PartiesForm = __decorate([
        core_1.Component({
            selector: 'parties-form',
            templateUrl: '/client/imports/parties-form/parties-form.html'
        }),
        angular2_meteor_accounts_ui_1.InjectUser(), 
        __metadata('design:paramtypes', [])
    ], PartiesForm);
    return PartiesForm;
}(angular2_meteor_1.MeteorComponent));
exports.PartiesForm = PartiesForm;
//# sourceMappingURL=parties-form.js.map