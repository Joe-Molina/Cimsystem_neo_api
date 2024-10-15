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
exports.Socios = void 0;
const socios_model_1 = require("../models/socios.model");
class Socios {
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accion } = req.params;
            const socio = yield socios_model_1.SociosModel.getPartner(accion);
            const familiares = (yield socios_model_1.SociosModel.getAllFamiliares(accion));
            const pases = (yield socios_model_1.SociosModel.getAllPases(accion));
            res.json({ socio, familiares, pases });
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const socios = (yield socios_model_1.SociosModel.getAllPartners()).filter((e) => e.activa == true);
            res.json(socios);
        });
    }
}
exports.Socios = Socios;
