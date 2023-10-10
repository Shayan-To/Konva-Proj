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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var konva_1 = require("konva");
var base_1 = require("./base");
var logicalWidth = 1000;
var logicalHeight = 1000;
var stage = (0, base_1.createStage)(logicalWidth, logicalHeight);
var layer = new konva_1.default.Layer({});
stage.add(layer);
var back = new konva_1.default.Rect({
    fill: "lightblue",
    width: logicalWidth,
    height: logicalHeight,
});
layer.add(back);
var cellDim = 100;
var gridWidth = logicalWidth / cellDim;
var gridHeight = logicalHeight / cellDim;
var bodyQueue = [];
var direction = [1, 0];
var head = negate(direction);
var moveDelay = 500;
// arrow function === lambda
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, _;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _i = 0, _a = new Array(4).fill(0).map(function (_, i) { return i; });
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                _ = _a[_i];
                moveHead();
                createCell(head);
                return [4 /*yield*/, delay(moveDelay)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                if (!true) return [3 /*break*/, 6];
                moveHead();
                createCell(head);
                bodyQueue.splice(0, 1)[0].remove();
                return [4 /*yield*/, delay(moveDelay)];
            case 5:
                _b.sent();
                return [3 /*break*/, 4];
            case 6: return [2 /*return*/];
        }
    });
}); })();
document.onkeydown = function (e) {
    var newDirection;
    switch (e.key) {
        case "ArrowLeft":
            newDirection = [-1, 0];
            break;
        case "ArrowRight":
            newDirection = [1, 0];
            break;
        case "ArrowUp":
            newDirection = [0, -1];
            break;
        case "ArrowDown":
            newDirection = [0, 1];
            break;
    }
    if (newDirection !== undefined && !eq(newDirection, negate(direction))) {
        direction = newDirection;
    }
};
function moveHead() {
    head = mod(add(head, direction), [gridWidth, gridHeight]);
}
function add(_a, _b) {
    var x1 = _a[0], y1 = _a[1];
    var x2 = _b[0], y2 = _b[1];
    return [x1 + x2, y1 + y2];
}
function negate(_a) {
    var x = _a[0], y = _a[1];
    return [-x, -y];
}
function mod(_a, _b) {
    var x1 = _a[0], y1 = _a[1];
    var x2 = _b[0], y2 = _b[1];
    return [((x1 % x2) + x2) % x2, ((y1 % y2) + y2) % y2];
}
function eq(_a, _b) {
    var x1 = _a[0], y1 = _a[1];
    var x2 = _b[0], y2 = _b[1];
    return x1 === x2 && y1 === y2;
}
function createCell(_a) {
    var x = _a[0], y = _a[1];
    var cell = new konva_1.default.Rect({
        fill: "black",
        width: cellDim,
        height: cellDim,
        x: x * cellDim,
        y: y * cellDim,
    });
    layer.add(cell);
    bodyQueue.push(cell);
}
function delay(ms) {
    return new Promise(function (resolve) { return setInterval(resolve, ms); });
}
