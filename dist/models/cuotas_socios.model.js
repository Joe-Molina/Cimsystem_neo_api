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
exports.CuotasManModel = void 0;
const prisma_1 = require("../libs/prisma");
class CuotasManModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const mante = yield prisma_1.prisma.data_mante.findMany({
                select: {
                    accion: true,
                    mes_cuota: true,
                    marca: true,
                    monto: true,
                    divisa: true,
                    fecha_ini: true,
                }
            });
            return mante;
        });
    }
    static SortMaintenaceByAction(cuotas) {
        const sortedByAction = cuotas.reduce((acc, el) => {
            const { accion, marca, monto, divisa, fecha_ini } = el;
            const sliceAction = accion.trim();
            const date = fecha_ini.toISOString().split('T')[0];
            const CuotaMonnth = fecha_ini.getMonth();
            const CurrentMonth = new Date().getMonth();
            if (!acc[sliceAction]) {
                acc[sliceAction] = {
                    accion: sliceAction,
                    cuotas: [],
                    deudaTotal: 0,
                    mesesVencidos: 0,
                    deudaDolares: 0,
                    deudaDesde: ""
                };
            }
            if (!marca && acc[sliceAction].deudaDesde == "") {
                acc[sliceAction].deudaDesde = date;
            }
            if (!marca && CuotaMonnth < CurrentMonth - 1) {
                acc[sliceAction].mesesVencidos++;
                acc[sliceAction].deudaTotal += monto;
                acc[sliceAction].deudaDolares += divisa;
            }
            acc[sliceAction].cuotas.push({ marca, monto, divisa, date });
            return acc;
        }, {});
        return sortedByAction;
    }
}
exports.CuotasManModel = CuotasManModel;
