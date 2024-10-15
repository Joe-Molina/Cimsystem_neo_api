"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cumple_socios_controller_1 = require("../controllers/cumple_socios.controller");
const router = (0, express_1.Router)();
router.get('/', cumple_socios_controller_1.PartnerBirthdays.getAll);
exports.default = router;
