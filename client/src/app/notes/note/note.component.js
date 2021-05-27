"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteComponent = void 0;
var core_1 = require("@angular/core");
var NoteComponent = /** @class */ (function () {
    function NoteComponent() {
        this.noteChange = new core_1.EventEmitter();
    }
    NoteComponent.prototype.open = function (note) {
        this.note = note;
        this.noteChange.emit(this.note);
    };
    __decorate([
        core_1.Input()
    ], NoteComponent.prototype, "note", void 0);
    __decorate([
        core_1.Output()
    ], NoteComponent.prototype, "noteChange", void 0);
    NoteComponent = __decorate([
        core_1.Component({
            selector: 'app-note',
            templateUrl: './note.component.html',
            styleUrls: ['./note.component.scss']
        })
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
