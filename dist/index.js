"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cumple_socios_routes_1 = __importDefault(require("./routers/cumple_socios.routes"));
const cuotas_socios_routes_1 = __importDefault(require("./routers/cuotas_socios.routes"));
const socios_routes_1 = __importDefault(require("./routers/socios.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3000;
app.use('/cumples', cumple_socios_routes_1.default);
app.use('/cuotas', cuotas_socios_routes_1.default);
app.use('/socios', socios_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
