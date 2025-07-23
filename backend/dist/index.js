"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const app = (0, express_1.default)();
const JWT_SECRET = "jwt1234";
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = jsonwebtoken_1.default.sign({
        id: 1
    }, JWT_SECRET);
    res.cookie("token", token);
    res.send("You are logged in ");
});
app.get("/", (req, res) => {
    const token = req.cookies.token;
    const payload = jsonwebtoken_1.default.verify("token", JWT_SECRET);
    const userId = payload.id;
    res.send({
        userID: userId
    });
});
app.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.send("congratulation , you have been successfully logged outz");
});
app.listen(port, () => {
    console.log(`the server is running on ${port}`);
});
