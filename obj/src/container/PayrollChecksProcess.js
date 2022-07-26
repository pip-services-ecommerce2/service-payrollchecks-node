"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollChecksProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const PayrollChecksServiceFactory_1 = require("../build/PayrollChecksServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class PayrollChecksProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("payroll_checks", "Payroll checks microservice");
        this._factories.add(new PayrollChecksServiceFactory_1.PayrollChecksServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.PayrollChecksProcess = PayrollChecksProcess;
//# sourceMappingURL=PayrollChecksProcess.js.map