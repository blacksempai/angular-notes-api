"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesComponent = void 0;
var core_1 = require("@angular/core");
var NotesComponent = /** @class */ (function () {
    function NotesComponent(auth) {
        this.auth = auth;
    }
    NotesComponent.prototype.selectNote = function (note) {
        this.selectedNote = note;
    };
    NotesComponent.prototype.logout = function () {
        this.auth.logout();
    };
    __decorate([
        core_1.Input()
    ], NotesComponent.prototype, "selectedNote", void 0);
    NotesComponent = __decorate([
        core_1.Component({
            selector: 'app-notes',
            templateUrl: './notes.component.html',
            styleUrls: ['./notes.component.scss']
        })
    ], NotesComponent);
    return NotesComponent;
}());
exports.NotesComponent = NotesComponent;
