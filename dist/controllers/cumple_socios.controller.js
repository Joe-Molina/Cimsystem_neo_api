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
exports.PartnerBirthdays = void 0;
const prisma_1 = require("../libs/prisma");
const cumple_socios_model_1 = require("../models/cumple_socios.model");
class PartnerBirthdays {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const socios = yield cumple_socios_model_1.PartnerBirthdaysModel.getAllPartners();
            const familiares = yield prisma_1.prisma.deta_socios.findMany({
                where: {
                    par_fam: 1
                },
                select: {
                    activa: true,
                    accion: true,
                    fec_fam: true,
                    nom_fam: true,
                }
            });
            const data = [...socios, ...familiares];
            const sin_disfrutantes = yield data.filter((e) => (e === null || e === void 0 ? void 0 : e.accion[0]) !== "D");
            console.log(sin_disfrutantes);
            const cumples = yield sin_disfrutantes.reduce((acc, el) => {
                const { accion, activa, cedula, fec_fam, fecha_nac, celular, e_mail, nom_fam, nombre } = el;
                if (!acc[accion]) {
                    acc[accion] = {
                        accion,
                        celular,
                        e_mail,
                        socios: []
                    };
                }
                acc[accion].socios.push({ nombre: nombre || nom_fam, fecha_nac: fec_fam || fecha_nac });
                return acc;
            }, {});
            return (cumples)
                ? res.json(cumples)
                : res.sendStatus(404);
        });
    }
}
exports.PartnerBirthdays = PartnerBirthdays;
