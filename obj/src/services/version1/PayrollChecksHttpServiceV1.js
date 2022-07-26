"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollChecksHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class PayrollChecksHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/payroll_checks');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-payrollchecks', 'controller', 'default', '*', '1.0'));
    }
}
exports.PayrollChecksHttpServiceV1 = PayrollChecksHttpServiceV1;
//# sourceMappingURL=PayrollChecksHttpServiceV1.js.map