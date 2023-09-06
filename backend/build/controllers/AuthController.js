"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.login = exports.register = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var User_1 = __importDefault(require("../models/User"));
var generateToken_1 = require("../utils/generateToken");
// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, existingUser, salt, hashedPassword, user, token, _b, _, userWithoutPassword, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                existingUser = _c.sent();
                if (existingUser)
                    return [2 /*return*/, res.status(400).json({ message: "User already exists" })];
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 3:
                salt = _c.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 4:
                hashedPassword = _c.sent();
                return [4 /*yield*/, User_1.default.create({
                        username: username,
                        email: email,
                        password: hashedPassword,
                    })];
            case 5:
                user = _c.sent();
                token = (0, generateToken_1.generateToken)(user._id);
                _b = user.toObject(), _ = _b.password, userWithoutPassword = __rest(_b, ["password"]);
                // Set cookies
                res.status(201).json(__assign(__assign({ success: true, message: "User created successfully" }, userWithoutPassword), { token: token }));
                return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                if (error_1 instanceof Error)
                    res.status(400).json({
                        success: false,
                        message: "Something went wrong",
                        error: error_1.message,
                    });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, token, _b, _, userWithoutPassword, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(422).json({ message: "Invalid email or password" })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                isMatch = _c.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(422).json({ message: "Invalid email or password" })];
                }
                token = (0, generateToken_1.generateToken)(user._id);
                _b = user.toObject(), _ = _b.password, userWithoutPassword = __rest(_b, ["password"]);
                // Set cookies
                res.status(200).json(__assign({ success: true, message: "Welcome ".concat(user.username), token: token }, userWithoutPassword));
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                if (err_1 instanceof Error)
                    res.status(500).json({ message: err_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
var forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, answer, newPassword, existingUser, salt, hashedPassword, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, answer = _a.answer, newPassword = _a.newPassword;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
                if (!existingUser) {
                    res.status(400);
                    throw new Error("Invalid credentials");
                }
                // Check if email is provided
                if (!email) {
                    res.status(400);
                    throw new Error("Please provide your email");
                }
                // Check if answer is provided
                if (!answer) {
                    res.status(400);
                    throw new Error("Please provide your answer");
                }
                // // Check if answer is correct
                // const isAnswerCorrect = await bcrypt.compare(answer, existingUser.answer);
                // if (!isAnswerCorrect) {
                //   res.status(400);
                //   throw new Error("Invalid credentials");
                // }
                // Check if newPassword is provided
                if (existingUser.answer !== answer) {
                    res.status(400);
                    throw new Error("Invalid credentials");
                }
                // Check if newPassword is empty
                if (!newPassword) {
                    res.status(400);
                    throw new Error("Please provide a new password");
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, salt)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(existingUser._id, {
                        password: hashedPassword,
                    })];
            case 4:
                user = _b.sent();
                res.status(200).json({
                    success: true,
                    message: "Password updated successfully",
                    user: user,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
