import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';

export interface IPayrollChecksPersistence extends IGetter<PayrollCheckV1, string>, IWriter<PayrollCheckV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PayrollCheckV1>>;

    getOneById(correlationId: string, id: string): Promise<PayrollCheckV1>;

    create(correlationId: string, item: PayrollCheckV1): Promise<PayrollCheckV1>;

    update(correlationId: string, item: PayrollCheckV1): Promise<PayrollCheckV1>;

    deleteById(correlationId: string, id: string): Promise<PayrollCheckV1>;
}
