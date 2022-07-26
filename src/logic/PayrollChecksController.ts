import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { PayrollCheckV1 } from '../data/version1/PayrollCheckV1';
import { PayrollCheckStateV1 } from '../data/version1/PayrollCheckStateV1';
import { IPayrollChecksPersistence } from '../persistence/IPayrollChecksPersistence';
import { IPayrollChecksController } from './IPayrollChecksController';
import { PayrollChecksCommandSet } from './PayrollChecksCommandSet';

export class PayrollChecksController implements  IConfigurable, IReferenceable, ICommandable, IPayrollChecksController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-payrollchecks:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(PayrollChecksController._defaultConfig);
    private _persistence: IPayrollChecksPersistence;
    private _commandSet: PayrollChecksCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IPayrollChecksPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new PayrollChecksCommandSet(this);
        return this._commandSet;
    }
    
    public async getChecks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<PayrollCheckV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getCheckById(correlationId: string, id: string): Promise<PayrollCheckV1> {
        return await this._persistence.getOneById(correlationId, id);
    }

    public async createCheck(correlationId: string, check: PayrollCheckV1): Promise<PayrollCheckV1> {

        check.state = check.state || PayrollCheckStateV1.New;
        check.create_time = new Date();
        check.update_time = new Date();

        check = PayrollCheckV1.calculateTotals(check);

        return await this._persistence.create(correlationId, check);
    }

    public async updateCheck(correlationId: string, check: PayrollCheckV1): Promise<PayrollCheckV1> {

        check.state = check.state || PayrollCheckStateV1.New;
        check.update_time = new Date();
    
        check = PayrollCheckV1.calculateTotals(check);
        
        return await this._persistence.update(correlationId, check);
    }

    public async deleteCheckById(correlationId: string, id: string): Promise<PayrollCheckV1> {  
        return await this._persistence.deleteById(correlationId, id);
    }

}
