"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthToken = setAuthToken;
exports.Log = Log;
const axios_1 = __importDefault(require("axios"));
const LOG_API_URL = 'http://20.207.122.201/evaluation-service/logs';
let _authToken = null;
function setAuthToken(token) {
    _authToken = token;
}
async function Log(stack, level, pkg, message) {
    if (!_authToken) {
        console.error('[Logger] No auth token set.');
        return;
    }
    try {
        await axios_1.default.post(LOG_API_URL, { stack, level, package: pkg, message }, {
            headers: {
                Authorization: 'Bearer ' + _authToken,
                'Content-Type': 'application/json',
            },
            timeout: 5000,
        });
        console.log('[Log] ' + level.toUpperCase() + ' [' + stack + '/' + pkg + ']: ' + message);
    }
    catch (err) {
        console.error('[Logger] Failed to send log:', err?.message);
    }
}
exports.default = Log;
//# sourceMappingURL=index.js.map