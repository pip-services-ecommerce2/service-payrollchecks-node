import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';

export interface IPayrollChecksController {
    getChecks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PayrollCheckV1>>;

    getCheckById(correlationId: string, check_id: string): Promise<PayrollCheckV1>;

    createCheck(correlationId: string, check: PayrollCheckV1): Promise<PayrollCheckV1>;

    updateCheck(correlationId: string, check: PayrollCheckV1): Promise<PayrollCheckV1>;

    deleteCheckById(correlationId: string, check_id: string): Promise<PayrollCheckV1>;
}
