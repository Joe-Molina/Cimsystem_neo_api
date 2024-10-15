"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuotas_socios_controller_1 = require("../controllers/cuotas_socios.controller");
const router = (0, express_1.Router)();
router.get('/', cuotas_socios_controller_1.CuotasMan.getAll);
exports.default = router;
