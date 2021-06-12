"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temp = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var tempSchema = new mongoose_1.default.Schema({
    temp: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});
tempSchema.statics.build = function (attr) {
    return new Temp(attr);
};
var Temp = mongoose_1.default.model("Temp", tempSchema);
exports.Temp = Temp;
Temp.build({
    temp: 26.2,
    timestamp: new Date(),
});
