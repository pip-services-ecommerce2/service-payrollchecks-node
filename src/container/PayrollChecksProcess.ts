import { ProcessContainer } from 'pip-services3-container-nodex';

import { PayrollChecksServiceFactory } from '../build/PayrollChecksServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class PayrollChecksProcess extends ProcessContainer {

    public constructor() {
        super("payroll_checks", "Payroll checks microservice");
        this._factories.add(new PayrollChecksServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
