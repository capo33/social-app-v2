"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
// Routes imports
var Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
var User_routes_1 = __importDefault(require("./routes/User.routes"));
var Post_routes_1 = __importDefault(require("./routes/Post.routes"));
var errorHandler_1 = require("./middlewares/errorHandler");
// Load env vars
dotenv_1.default.config();
var db_1 = require("./config/db");
// Initialize express
var app = (0, express_1.default)();
// Set port
var port = process.env.PORT || "5000";
// Connect to MongoDB
(0, db_1.connectDB)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Make uploads folder static
if (process.env.NODE_ENV === "production") {
    var __dirname_1 = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname_1, "/frontend/build")));
    // for any route that is not api, redirect to index.html
    app.get("*", function (req, res) {
        return res.sendFile(path_1.default.resolve(__dirname_1, "frontend", "build", "index.html"));
    });
}
else {
    // Welcome route
    app.get("/", function (req, res) {
        res.json({
            message: "API is running...",
        });
    });
}
// Routes
app.use("/api/v1/auth", Auth_routes_1.default);
app.use("/api/v1/users", User_routes_1.default);
app.use("/api/v1/posts", Post_routes_1.default);
// Error handler middleware
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// Start server
try {
    app.listen(port, function () {
        console.log("Server is running on port ".concat(port, " \uD83D\uDE80"));
    });
}
catch (error) {
    if (error instanceof Error) {
        console.log("Error occured: (".concat(error.message, ")"));
    }
}
