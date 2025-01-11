"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const manager_1 = __importDefault(require("./routes/manager"));
const pantry_1 = __importDefault(require("./routes/pantry"));
const delivery_1 = __importDefault(require("./routes/delivery"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/manager", manager_1.default);
app.use("/pantry", pantry_1.default);
app.use("/delivery", delivery_1.default);
app.use("/auth", auth_1.default);
mongoose_1.default.connect(process.env.MONGOOSE_CONNECTING_STRING || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
exports.default = app;
//# sourceMappingURL=app.js.map