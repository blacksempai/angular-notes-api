"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var note_1 = require("../controllers/note");
var router = express_1.default.Router();
exports.router = router;
router.get('/', passport_1.default.authenticate('jwt', { session: false }), note_1.getAll);
router.post('/', passport_1.default.authenticate('jwt', { session: false }), note_1.create);
router.patch('/:id', passport_1.default.authenticate('jwt', { session: false }), note_1.update);
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), note_1.remove);
