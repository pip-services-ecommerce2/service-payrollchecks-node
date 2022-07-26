import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { IncomeItemV1Schema } from './IncomeItemV1Schema';

export class PayrollCheckV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('number', TypeCode.String);
        this.withRequiredProperty('party_id', TypeCode.String);
        this.withOptionalProperty('state', TypeCode.String);
        this.withOptionalProperty('state_details', TypeCode.String);

        this.withOptionalProperty('period_from', TypeCode.DateTime);
        this.withOptionalProperty('period_to', TypeCode.DateTime);

        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withOptionalProperty('update_time', TypeCode.DateTime);
        this.withOptionalProperty('paid_time', TypeCode.DateTime);

        this.withOptionalProperty('payment_method_id', TypeCode.String);
        this.withOptionalProperty('payment_id', TypeCode.String);
        this.withOptionalProperty('check_number', TypeCode.String);

        this.withOptionalProperty('income', new ArraySchema(new IncomeItemV1Schema()));
        this.withRequiredProperty('income_total', TypeCode.Float);
        this.withOptionalProperty('ytd_income_total', TypeCode.Float);

        this.withOptionalProperty('deductions', new ArraySchema(new IncomeItemV1Schema()));
        this.withOptionalProperty('deductions_total', TypeCode.Float);
        this.withOptionalProperty('ytd_deductions_total', TypeCode.Float);

        this.withRequiredProperty('net_total', TypeCode.Float);
        this.withOptionalProperty('ytd_net_total', TypeCode.Float);
    }
}
