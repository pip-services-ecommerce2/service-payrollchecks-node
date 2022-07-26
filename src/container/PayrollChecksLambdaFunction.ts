import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { PayrollChecksServiceFactory } from '../build/PayrollChecksServiceFactory';

export class PayrollChecksLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("payroll_checks", "Payroll checks function");
        this._dependencyResolver.put('controller', new Descriptor('service-payrollchecks', 'controller', 'default', '*', '*'));
        this._factories.add(new PayrollChecksServiceFactory());
    }
}

export const handler = new PayrollChecksLambdaFunction().getHandler();