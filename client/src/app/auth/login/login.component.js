"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router, route, snackBar) {
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.snackBar = snackBar;
        this.hide = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
        this.route.queryParams.subscribe(function (params) {
            if (params['registered']) {
                _this.snackBar.open('You have successfully created account. Now you can sign in');
            }
            else if (params['accessDenied']) {
                _this.snackBar.open('Please login or register first');
            }
            else if (params['sessionFailed']) {
                _this.snackBar.open('Session ended. Please login again');
            }
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.form.disable();
        this.aSub = this.auth.login(this.form.value).subscribe(function () {
            _this.router.navigate(['/']);
        }, function (err) {
            _this.snackBar.open(err.error.message);
            console.warn(err);
            _this.form.enable();
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
