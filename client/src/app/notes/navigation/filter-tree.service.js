"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTreeService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var FilterTreeService = /** @class */ (function () {
    function FilterTreeService(noteService, snackBar) {
        var _this = this;
        this.noteService = noteService;
        this.snackBar = snackBar;
        this.isfilterByContent = false;
        this.dataChange = new rxjs_1.BehaviorSubject([]);
        this.noteService.getNotes().subscribe(function (data) {
            _this.treeData = data;
            _this.dataChange.next(_this.treeData);
        });
    }
    FilterTreeService.prototype.getTree = function () {
        var _this = this;
        return this.dataChange.pipe(operators_1.map(function (notes) { return _this.buildTree(notes, 'root'); }));
    };
    FilterTreeService.prototype.create = function (note) {
        var _this = this;
        this.noteService.create(note).subscribe(function (newNote) {
            _this.treeData.push(newNote);
            _this.dataChange.next(_this.treeData);
        }, function (err) { return _this.snackBar.open("Note has not been updated due to server error. Name of file is not unique or parent folder has been deleted"); });
    };
    FilterTreeService.prototype.update = function (note) {
        var _this = this;
        this.noteService.update(note).subscribe(function (newNote) {
            var updatedNoteIndex = _this.treeData.findIndex(function (n) { return n._id === newNote._id; });
            _this.treeData[updatedNoteIndex] = newNote;
            _this.dataChange.next(_this.treeData);
        }, function (err) { return _this.snackBar.open("Note has not been created due to server error. Name of file is not unique or parent folder has been deleted"); });
    };
    FilterTreeService.prototype.delete = function (note) {
        var _this = this;
        this.noteService.delete(note).subscribe(function (response) {
            console.log("here");
            _this.treeData = _this.treeData.filter(function (n) { return n._id !== note._id; });
            _this.dataChange.next(_this.treeData);
            _this.snackBar.open(response.message);
        }, function (err) { return _this.snackBar.open("Note has not been deleted due to server error"); });
    };
    FilterTreeService.prototype.filter = function (filterText) {
        var _this = this;
        if (this.treeData) { // If data is fetched
            var filteredTreeData_1;
            if (filterText) { // If filter text is not empty
                if (this.isfilterByContent) {
                    filteredTreeData_1 = this.treeData.filter(function (d) { return d.content.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1; }); // filter array of notes for content match
                }
                else {
                    filteredTreeData_1 = this.treeData.filter(function (d) { return d.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1; }); // filter array of notes for name match
                }
                Object.assign([], filteredTreeData_1).forEach(function (ftd) {
                    var str = ftd.path;
                    var _loop_1 = function () {
                        var index = str.lastIndexOf('/');
                        str = str.substring(0, index); // cut last '/' symbol
                        var nameStartIndex = str.lastIndexOf('/') + 1; // index of first symbol of parrent folder name in path
                        if (filteredTreeData_1.findIndex(function (t) { return t.name === str.substring(nameStartIndex); }) === -1) { //if this folder is not in an array already
                            var obj = _this.treeData.find(function (d) { return d.name === str.substring(nameStartIndex); }); // find this folder
                            if (obj) {
                                filteredTreeData_1.push(obj);
                            }
                        }
                    };
                    while (str.lastIndexOf('/') > -1) {
                        _loop_1();
                    }
                });
            }
            else {
                filteredTreeData_1 = this.treeData;
            }
            this.dataChange.next(filteredTreeData_1);
        }
    };
    FilterTreeService.prototype.setFilterByContent = function (value) {
        this.isfilterByContent = value;
    };
    FilterTreeService.prototype.buildTree = function (notes, level) {
        var _this = this;
        return notes.filter(function (n) {
            return n.path.startsWith(level + '/')
                && (n.path.match(/\//g) || []).length === (level.match(/\//g) || []).length + 1;
        })
            .map(function (note) {
            if (note.isFolder) {
                var children = notes.filter(function (so) { return so.path.startsWith(level + '/'); });
                if (children && children.length > 0) {
                    note.children = _this.buildTree(children, note.path + note.name);
                }
            }
            return note;
        });
    };
    FilterTreeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FilterTreeService);
    return FilterTreeService;
}());
exports.FilterTreeService = FilterTreeService;
