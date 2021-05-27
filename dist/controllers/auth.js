"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var User_1 = __importDefault(require("../models/User"));
var error_handler_1 = __importDefault(require("../utils/error-handler"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var candidate, isPasswordCorrect, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
                case 1:
                    candidate = _a.sent();
                    if (candidate) {
                        isPasswordCorrect = bcryptjs_1.default.compareSync(req.body.password, candidate.password);
                        if (isPasswordCorrect) {
                            token = jsonwebtoken_1.default.sign({
                                email: candidate.email,
                                userId: candidate._id
                            }, config_1.default.jwt, { expiresIn: 3600 });
                            res.status(200).json({
                                token: "Bearer " + token
                            });
                        }
                        else {
                            res.status(401).json({
                                message: 'Password is incorrect'
                            });
                        }
                    }
                    else {
                        res.status(404).json({
                            message: 'User with this email doesn\'t exist'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var candidate, salt, password, user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
                case 1:
                    candidate = _a.sent();
                    if (!candidate) return [3 /*break*/, 2];
                    res.status(409).json({
                        message: 'User with this email is already exists'
                    });
                    return [3 /*break*/, 6];
                case 2:
                    salt = bcryptjs_1.default.genSaltSync(10);
                    password = req.body.password;
                    user = new User_1.default({
                        email: req.body.email,
                        password: bcryptjs_1.default.hashSync(password, salt)
                    });
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, user.save()];
                case 4:
                    _a.sent();
                    res.status(201).json(user);
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    error_handler_1.default(res, e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
