"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (res, err) {
    res.status(500).json({
        success: false,
        error: err.message ? err.message : err
    });
});
