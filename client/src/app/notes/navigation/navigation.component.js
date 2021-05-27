"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationComponent = void 0;
var forms_1 = require("@angular/forms");
var edit_note_component_1 = require("./../modals/edit-note/edit-note.component");
var delete_note_component_1 = require("./../modals/delete-note/delete-note.component");
var core_1 = require("@angular/core");
var tree_1 = require("@angular/material/tree");
var tree_2 = require("@angular/cdk/tree");
var core_2 = require("@angular/core");
var create_note_component_1 = require("../modals/create-note/create-note.component");
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(dialog, treeService) {
        this.dialog = dialog;
        this.treeService = treeService;
        this.noteSelectedEvent = new core_2.EventEmitter();
        this.hasChild = function (_, node) { return !!node.children && node.children.length > 0; };
    }
    NavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.treeControl = new tree_2.NestedTreeControl(function (note) { return note.children; });
        this.dataSource = new tree_1.MatTreeNestedDataSource();
        this.filterField = new forms_1.FormControl();
        this.treeSub = this.treeService.getTree().subscribe(function (data) {
            _this.dataSource.data = null;
            _this.dataSource.data = data;
            _this.treeControl.dataNodes = data;
        });
    };
    NavigationComponent.prototype.ngOnDestroy = function () {
        this.treeSub.unsubscribe();
    };
    NavigationComponent.prototype.noteSelect = function (note) {
        this.selectedNote = note;
        this.noteSelectedEvent.emit(this.selectedNote);
    };
    NavigationComponent.prototype.filterChanged = function () {
        this.treeService.filter(this.filterField.value);
        this.treeControl.expandAll();
    };
    NavigationComponent.prototype.setFilterByName = function () {
        this.treeService.setFilterByContent(false);
        this.filterChanged();
    };
    NavigationComponent.prototype.setFilterByContent = function () {
        this.treeService.setFilterByContent(true);
        this.filterChanged();
    };
    NavigationComponent.prototype.openCreateDialog = function (path, isFolder) {
        var _this = this;
        var dialogRef = this.dialog.open(create_note_component_1.CreateNoteComponent, {
            width: '80%',
            data: {
                isFolder: isFolder,
                path: path
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.treeService.create(result);
            }
        });
    };
    NavigationComponent.prototype.openEditDialog = function (note) {
        var _this = this;
        var dialogRef = this.dialog.open(edit_note_component_1.EditNoteComponent, {
            width: '80%',
            data: note
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                if (_this.selectedNote == note)
                    _this.noteSelectedEvent.next(null);
                _this.treeService.update(result);
            }
        });
    };
    NavigationComponent.prototype.openDeleteDialog = function (note) {
        var _this = this;
        var dialogRef = this.dialog.open(delete_note_component_1.DeleteNoteComponent, {
            width: '50%',
            data: note
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                if (_this.selectedNote == note)
                    _this.noteSelectedEvent.next(null);
                _this.treeService.delete(note);
            }
        });
    };
    __decorate([
        core_2.Output()
    ], NavigationComponent.prototype, "noteSelectedEvent", void 0);
    __decorate([
        core_1.Input()
    ], NavigationComponent.prototype, "selectedNote", void 0);
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'app-navigation',
            templateUrl: './navigation.component.html',
            styleUrls: ['./navigation.component.scss']
        })
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
