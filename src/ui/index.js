"use strict";
/**
 * UI Extension SDK
 *
 * SDK for building Voiden UI extensions (renderer process)
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = exports.UIExtension = void 0;
var Extension_1 = require("./Extension");
Object.defineProperty(exports, "UIExtension", { enumerable: true, get: function () { return Extension_1.UIExtension; } });
var Extension_2 = require("./Extension"); // Backward compatibility
Object.defineProperty(exports, "Extension", { enumerable: true, get: function () { return Extension_2.UIExtension; } });
// Export all types
__exportStar(require("./types"), exports);
