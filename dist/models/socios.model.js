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
exports.SociosModel = void 0;
const prisma_1 = require("../libs/prisma");
class SociosModel {
    static getAllPartners() {
        return __awaiter(this, void 0, void 0, function* () {
            const socio = yield prisma_1.prisma.mae_socios.findMany({
                select: {
                    accion: true,
                    activa: true,
                    status: true,
                    cedula: true,
                    nombre: true,
                    tipo_socio: true,
                }
            });
            return socio;
        });
    }
    static getPartner(accion) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const socio = yield prisma_1.prisma.mae_socios.findFirst({
                select: {
                    nombre: true,
                    accion: true,
                    activa: true,
                    status: true,
                    tipo_socio: true,
                    fecha_nac: true,
                    e_mail_rep: true,
                    fax_tra: true,
                    sexo: true,
                    nfcId: true,
                    cedula: true,
                    e_mail: true,
                    estado_civ: true,
                    nacionalid: true,
                    direccion: true,
                    celular: true,
                    telefonos: true,
                    telefonos_rep: true,
                    telefonos_tra: true,
                    empresa_tra: true,
                    cedula_rep: true,
                    nombre_rep: true,
                    cuotas_man: true,
                    rif_tra: true,
                    profesion: true,
                    nota: true,
                    fecha_ing: true,
                },
                where: {
                    accion
                }
            });
            let nacionalidad = "";
            switch (socio === null || socio === void 0 ? void 0 : socio.nacionalid) {
                case 1:
                    nacionalidad = "Venezolano";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 2:
                    nacionalidad = "Italiana";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 3:
                    nacionalidad = "Española";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 4:
                    nacionalidad = "Portuguesa";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 5:
                    nacionalidad = "Colombiana";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 6:
                    nacionalidad = "Peruana";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 7:
                    nacionalidad = "Estadounidense";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 8:
                    nacionalidad = "China";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 9:
                    nacionalidad = "Mexicana";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 10:
                    nacionalidad = "Brasilera";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 11:
                    nacionalidad = "Libaneza";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 12:
                    nacionalidad = "Argentina";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 13:
                    nacionalidad = "Chilena";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 14:
                    nacionalidad = "Austriaca";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 15:
                    nacionalidad = "Uruguaya";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 16:
                    nacionalidad = "Francesa";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 17:
                    nacionalidad = "Alemana";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 18:
                    nacionalidad = "Japonesa";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 19:
                    nacionalidad = "Cubana";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 20:
                    nacionalidad = "Ecuatoriana";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case 21:
                    nacionalidad = "Siria";
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
            }
            const response = Object.assign(Object.assign({}, socio), { nombre_rep: (_a = socio === null || socio === void 0 ? void 0 : socio.nombre_rep) === null || _a === void 0 ? void 0 : _a.trim(), nacionalidad });
            return response;
        });
    }
    static getAllFamiliares(accion) {
        return __awaiter(this, void 0, void 0, function* () {
            const familiares = yield prisma_1.prisma.deta_socios.findMany({
                select: {
                    accion: true,
                    nom_fam: true,
                    fec_fam: true,
                    sexo_fam: true,
                    nfcId: true,
                    ced_fam: true,
                    par_fam: true,
                    cel_fam: true,
                    email_fam: true,
                    edo_civil: true,
                },
                where: {
                    accion
                }
            });
            return familiares;
        });
    }
    static getAllPases(accion) {
        return __awaiter(this, void 0, void 0, function* () {
            const pases = yield prisma_1.prisma.carnet_traba.findMany({
                select: {
                    accion: true,
                    nombre: true,
                    activo: true,
                    cedula: true,
                    cargo: true,
                    email: true,
                    fecha_venc: true,
                    nfcId: true,
                    celular: true,
                },
                where: {
                    accion
                }
            });
            pases.forEach((p) => {
                if (typeof p.nombre == 'string') {
                    p.nombre = p.nombre.trim();
                }
            });
            return pases;
        });
    }
}
exports.SociosModel = SociosModel;
