import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { IPayrollChecksController } from './IPayrollChecksController';
export declare class PayrollChecksController implements IConfigurable, IReferenceable, ICommandable, IPayrollChecksController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getChecks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PayrollCheckV1>>;
    getCheckById(correlationId: string, id: string): Promise<PayrollCheckV1>;
    createCheck(correlationId: string, check: PayrollCheckV1): Promise<PayrollCheckV1>;
    updateCheck(correlationId: string, check: PayrollCheckV1): Promise<PayrollCheckV1>;
    deleteCheckById(correlationId: string, id: string): Promise<PayrollCheckV1>;
}
