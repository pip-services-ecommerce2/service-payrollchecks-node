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
exports.PayrollChecksCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const PayrollCheckV1Schema_1 = require("../data/version1/PayrollCheckV1Schema");
class PayrollChecksCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetPayrollChecksCommand());
        this.addCommand(this.makeGetPayrollCheckByIdCommand());
        this.addCommand(this.makeCreatePayrollCheckCommand());
        this.addCommand(this.makeUpdatePayrollCheckCommand());
        this.addCommand(this.makeDeletePayrollCheckByIdCommand());
    }
    makeGetPayrollChecksCommand() {
        return new pip_services3_commons_nodex_2.Command("get_checks", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getChecks(correlationId, filter, paging);
        }));
    }
    makeGetPayrollCheckByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_check_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('check_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let checkId = args.getAsString("check_id");
            return yield this._logic.getCheckById(correlationId, checkId);
        }));
    }
    makeCreatePayrollCheckCommand() {
        return new pip_services3_commons_nodex_2.Command("create_check", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('check', new PayrollCheckV1Schema_1.PayrollCheckV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let check = args.get("check");
            return yield this._logic.createCheck(correlationId, check);
        }));
    }
    makeUpdatePayrollCheckCommand() {
        return new pip_services3_commons_nodex_2.Command("update_check", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('check', new PayrollCheckV1Schema_1.PayrollCheckV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let check = args.get("check");
            return yield this._logic.updateCheck(correlationId, check);
        }));
    }
    makeDeletePayrollCheckByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_check_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('check_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let checkId = args.getAsNullableString("check_id");
            return yield this._logic.deleteCheckById(correlationId, checkId);
        }));
    }
}
exports.PayrollChecksCommandSet = PayrollChecksCommandSet;
//# sourceMappingURL=PayrollChecksCommandSet.js.map