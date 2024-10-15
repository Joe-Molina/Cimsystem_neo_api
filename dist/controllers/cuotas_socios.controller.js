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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuotasMan = void 0;
const cuotas_socios_model_1 = require("../models/cuotas_socios.model");
class CuotasMan {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuotasMante = yield cuotas_socios_model_1.CuotasManModel.getAll();
            const deuda_socios = yield cuotas_socios_model_1.CuotasManModel.SortMaintenaceByAction(cuotasMante);
            res.json(deuda_socios);
        });
    }
}
exports.CuotasMan = CuotasMan;
