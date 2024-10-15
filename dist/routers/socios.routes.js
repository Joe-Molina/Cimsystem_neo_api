"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socios_controller_1 = require("../controllers/socios.controller");
const router = (0, express_1.Router)();
router.get('/info/:accion', socios_controller_1.Socios.getOne);
router.get('/', socios_controller_1.Socios.getAll);
exports.default = router;
