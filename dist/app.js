"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var config_1 = __importDefault(require("./config/config"));
var passport_2 = __importDefault(require("./middleware/passport"));
var auth_1 = require("./routes/auth");
var note_1 = require("./routes/note");
mongoose_1.default.connect(config_1.default.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(function () { console.log('MongoDB Connected'); })
    .catch(function (err) { console.log(err); });
var app = express_1.default();
exports.app = app;
app.use(passport_1.default.initialize());
passport_2.default(passport_1.default);
app.use(morgan_1.default('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/api/auth', auth_1.router);
app.use('/api/note', note_1.router);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, '..', 'client', 'dist', 'angular-notes'))); //  '../client/dist/angular-notes'
    app.get('/*', function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, '..', 'client', 'dist', 'angular-notes', 'index.html'));
    });
}
