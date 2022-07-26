import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { PayrollCheckV1Schema } from '../data/version1/PayrollCheckV1Schema';
import { IPayrollChecksController } from './IPayrollChecksController';

export class PayrollChecksCommandSet extends CommandSet {
    private _logic: IPayrollChecksController;

    constructor(logic: IPayrollChecksController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetPayrollChecksCommand());
		this.addCommand(this.makeGetPayrollCheckByIdCommand());
		this.addCommand(this.makeCreatePayrollCheckCommand());
		this.addCommand(this.makeUpdatePayrollCheckCommand());
		this.addCommand(this.makeDeletePayrollCheckByIdCommand());
    }

	private makeGetPayrollChecksCommand(): ICommand {
		return new Command(
			"get_checks",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getChecks(correlationId, filter, paging);
            }
		);
	}

	private makeGetPayrollCheckByIdCommand(): ICommand {
		return new Command(
			"get_check_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('check_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let checkId = args.getAsString("check_id");
                return await this._logic.getCheckById(correlationId, checkId);
            }
		);
	}

	private makeCreatePayrollCheckCommand(): ICommand {
		return new Command(
			"create_check",
			new ObjectSchema(true)
				.withRequiredProperty('check', new PayrollCheckV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let check = args.get("check");
                return await this._logic.createCheck(correlationId, check);
            }
		);
	}

	private makeUpdatePayrollCheckCommand(): ICommand {
		return new Command(
			"update_check",
			new ObjectSchema(true)
				.withRequiredProperty('check', new PayrollCheckV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let check = args.get("check");
                return await this._logic.updateCheck(correlationId, check);
            }
		);
	}
	
	private makeDeletePayrollCheckByIdCommand(): ICommand {
		return new Command(
			"delete_check_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('check_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let checkId = args.getAsNullableString("check_id");
                return await this._logic.deleteCheckById(correlationId, checkId);
			}
		);
	}

}