"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
var core_1 = require("@angular/core");
var NoteService = /** @class */ (function () {
    function NoteService(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    NoteService.prototype.getNotes = function () {
        return this.http.get('/api/note');
    };
    NoteService.prototype.create = function (note) {
        return this.http.post('/api/note', note);
    };
    NoteService.prototype.update = function (note) {
        return this.http.patch("/api/note/" + note._id, note);
    };
    NoteService.prototype.delete = function (note) {
        return this.http.delete("/api/note/" + note._id);
    };
    NoteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], NoteService);
    return NoteService;
}());
exports.NoteService = NoteService;
