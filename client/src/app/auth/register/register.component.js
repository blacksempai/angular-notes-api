"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterComponent = void 0;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(auth, router, snackBar) {
        this.auth = auth;
        this.router = router;
        this.snackBar = snackBar;
        this.hide = true;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.form.disable();
        this.aSub = this.auth.register(this.form.value).subscribe(function () {
            _this.router.navigate(['/login'], { queryParams: { registered: true } });
        }, function (err) {
            _this.snackBar.open(err.error.message);
            console.warn(err);
            _this.form.enable();
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
