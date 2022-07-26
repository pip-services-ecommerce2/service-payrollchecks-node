"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.PayrollChecksLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const PayrollChecksServiceFactory_1 = require("../build/PayrollChecksServiceFactory");
class PayrollChecksLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("payroll_checks", "Payroll checks function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-payrollchecks', 'controller', 'default', '*', '*'));
        this._factories.add(new PayrollChecksServiceFactory_1.PayrollChecksServiceFactory());
    }
}
exports.PayrollChecksLambdaFunction = PayrollChecksLambdaFunction;
exports.handler = new PayrollChecksLambdaFunction().getHandler();
//# sourceMappingURL=PayrollChecksLambdaFunction.js.map