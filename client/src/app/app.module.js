"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var delete_note_component_1 = require("./notes/modals/delete-note/delete-note.component");
var edit_note_component_1 = require("./notes/modals/edit-note/edit-note.component");
var token_interceptor_1 = require("./shared/classes/token.interceptor");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var material_module_1 = require("./shared/material.module");
var app_routing_module_1 = require("./app-routing.module");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./app.component");
var notes_component_1 = require("./notes/notes.component");
var note_component_1 = require("./notes/note/note.component");
var navigation_component_1 = require("./notes/navigation/navigation.component");
var login_component_1 = require("./auth/login/login.component");
var register_component_1 = require("./auth/register/register.component");
var auth_component_1 = require("./auth/auth.component");
var snack_bar_1 = require("@angular/material/snack-bar");
var create_note_component_1 = require("./notes/modals/create-note/create-note.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                navigation_component_1.NavigationComponent,
                note_component_1.NoteComponent,
                notes_component_1.NotesComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                auth_component_1.AuthComponent,
                create_note_component_1.CreateNoteComponent,
                edit_note_component_1.EditNoteComponent,
                delete_note_component_1.DeleteNoteComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                material_module_1.MaterialModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, multi: true, useClass: token_interceptor_1.TokenInterceptor },
                { provide: snack_bar_1.MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
