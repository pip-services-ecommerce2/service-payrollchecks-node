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
exports.PayrollChecksController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const PayrollCheckV1_1 = require("../data/version1/PayrollCheckV1");
const PayrollCheckStateV1_1 = require("../data/version1/PayrollCheckStateV1");
const PayrollChecksCommandSet_1 = require("./PayrollChecksCommandSet");
class PayrollChecksController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(PayrollChecksController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new PayrollChecksCommandSet_1.PayrollChecksCommandSet(this);
        return this._commandSet;
    }
    getChecks(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getCheckById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, id);
        });
    }
    createCheck(correlationId, check) {
        return __awaiter(this, void 0, void 0, function* () {
            check.state = check.state || PayrollCheckStateV1_1.PayrollCheckStateV1.New;
            check.create_time = new Date();
            check.update_time = new Date();
            check = PayrollCheckV1_1.PayrollCheckV1.calculateTotals(check);
            return yield this._persistence.create(correlationId, check);
        });
    }
    updateCheck(correlationId, check) {
        return __awaiter(this, void 0, void 0, function* () {
            check.state = check.state || PayrollCheckStateV1_1.PayrollCheckStateV1.New;
            check.update_time = new Date();
            check = PayrollCheckV1_1.PayrollCheckV1.calculateTotals(check);
            return yield this._persistence.update(correlationId, check);
        });
    }
    deleteCheckById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.deleteById(correlationId, id);
        });
    }
}
exports.PayrollChecksController = PayrollChecksController;
PayrollChecksController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-payrollchecks:persistence:*:*:1.0');
//# sourceMappingURL=PayrollChecksController.js.map