import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { IPayrollChecksPersistence } from './IPayrollChecksPersistence';
export declare class PayrollChecksMongoDbPersistence extends IdentifiableMongoDbPersistence<PayrollCheckV1, string> implements IPayrollChecksPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PayrollCheckV1>>;
}
