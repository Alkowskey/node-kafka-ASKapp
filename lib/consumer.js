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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
var kafkajs_1 = require("kafkajs");
var temp_1 = require("./models/temp");
var clientId = process.env.CLIENTID || "nodejs-producer";
var brokers = [process.env.BROKERS || "localhost:9092"];
var topic = process.env.TOPIC || "message";
var kafka = new kafkajs_1.Kafka({
    clientId: clientId,
    brokers: brokers,
    logLevel: kafkajs_1.logLevel.INFO,
});
var consumer = kafka.consumer({
    groupId: clientId,
    minBytes: 5,
    maxBytes: 1e6,
    // wait for at most 3 seconds before receiving new data
    maxWaitTimeInMs: 3000,
});
var i = 0, sum = 0;
var consume = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // first, we wait for the client to connect and subscribe to the given topic
            return [4 /*yield*/, consumer.connect()];
            case 1:
                // first, we wait for the client to connect and subscribe to the given topic
                _a.sent();
                return [4 /*yield*/, consumer.subscribe({ topic: topic, fromBeginning: true })];
            case 2:
                _a.sent();
                return [4 /*yield*/, consumer.run({
                        // this function is called every time the consumer gets a new message
                        eachMessage: function (_a) {
                            var message = _a.message;
                            return __awaiter(void 0, void 0, void 0, function () {
                                var temp;
                                return __generator(this, function (_b) {
                                    // here, we just log the message to the standard output
                                    i++;
                                    if (!isNaN(Number(message.value))) {
                                        sum += Number(message.value);
                                    }
                                    else {
                                        throw new Error("value is not a number: " + typeof message.value);
                                    }
                                    if (i % 10 == 0) {
                                        temp = temp_1.Temp.build({ temp: sum / 10, timestamp: new Date() });
                                        temp.save();
                                        console.log("avg temp: " + temp.temp + " time: " + temp.timestamp.toISOString());
                                        sum = 0;
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        },
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.consume = consume;
