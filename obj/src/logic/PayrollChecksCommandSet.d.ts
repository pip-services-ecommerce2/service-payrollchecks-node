import { CommandSet } from 'pip-services3-commons-nodex';
import { IPayrollChecksController } from './IPayrollChecksController';
export declare class PayrollChecksCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IPayrollChecksController);
    private makeGetPayrollChecksCommand;
    private makeGetPayrollCheckByIdCommand;
    private makeCreatePayrollCheckCommand;
    private makeUpdatePayrollCheckCommand;
    private makeDeletePayrollCheckByIdCommand;
}
