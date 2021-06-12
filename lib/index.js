"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var producer_1 = require("./producer");
var consumer_1 = require("./consumer");
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect("mongodb://localhost:27017/" + process.env.MONGO_INITDB_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, function () {
    console.log("Connected to mongo");
});
// call the `produce` function and log an error if it occurs
producer_1.produce().catch(function (err) {
    console.error("error in producer: ", err);
});
// start the consumer, and log any errors
consumer_1.consume().catch(function (err) {
    console.error("error in consumer: ", err);
});
