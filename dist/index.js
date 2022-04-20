"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("./routes/post"));
const serve_1 = __importDefault(require("./routes/serve"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// home page to upload new images
app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: path_1.default.resolve(__dirname, '../') });
});
// image serve route
app.use('/img', serve_1.default);
// upload route
app.use('/post', post_1.default);
app.listen(port, () => console.log('listening ...'));
exports.default = app;
