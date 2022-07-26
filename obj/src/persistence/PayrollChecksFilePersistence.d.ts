import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { PayrollChecksMemoryPersistence } from './PayrollChecksMemoryPersistence';
import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
export declare class PayrollChecksFilePersistence extends PayrollChecksMemoryPersistence {
    protected _persister: JsonFilePersister<PayrollCheckV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
