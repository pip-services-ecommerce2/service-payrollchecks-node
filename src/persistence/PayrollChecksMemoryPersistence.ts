import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { IPayrollChecksPersistence } from './IPayrollChecksPersistence';

export class PayrollChecksMemoryPersistence 
    extends IdentifiableMemoryPersistence<PayrollCheckV1, string> 
    implements IPayrollChecksPersistence {

    constructor() {
        super();
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let id = filter.getAsNullableString('id');
        let state = filter.getAsNullableString('state');
        let partyId = filter.getAsNullableString('party_id');
        let ids = filter.getAsObject('ids');

        let from_time = filter.getAsNullableDateTime('from_time');
        let to_time = filter.getAsNullableDateTime('to_time');
                
        // Process ids filter
        if (typeof ids === 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;
        
        return (item: PayrollCheckV1) => {
            if (id && item.id != id) 
                return false;
            if (ids && ids.indexOf(item.id) < 0)
                return false;
            if (state && item.state != state) 
                return false;
            if (partyId && item.party_id != partyId) 
                return false;
            if (from_time && item.period_to && from_time > item.period_to)
                return false;
            if (to_time && item.period_from && to_time < item.period_from)
                return false;
            return true; 
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PayrollCheckV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
}
