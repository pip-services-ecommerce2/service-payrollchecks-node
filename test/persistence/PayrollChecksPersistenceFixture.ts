const assert = require('chai').assert;

import { FilterParams, RandomText } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { PayrollCheckV1 } from '../../src/data/version1/PayrollCheckV1';
import { PayrollCheckStateV1 } from '../../src/data/version1/PayrollCheckStateV1';

import { IPayrollChecksPersistence } from '../../src/persistence/IPayrollChecksPersistence';
import { TestModel } from '../data/TestModel';

let CHECK1: PayrollCheckV1 = TestModel.createPayrollCheck1();
let CHECK2: PayrollCheckV1 = TestModel.createPayrollCheck2();
let CHECK3: PayrollCheckV1 = TestModel.createPayrollCheck3();

export class PayrollChecksPersistenceFixture {
    private _persistence: IPayrollChecksPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreatePayrollChecks() {
        // Create one payroll check
        let payrollCheck = await this._persistence.create(null, CHECK1);

        assert.isObject(payrollCheck);
        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK1);

        // Create another payroll check
        payrollCheck = await this._persistence.create(null, CHECK2);

        assert.isObject(payrollCheck);
        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK2);

        // Create yet another payroll check
        payrollCheck = await this._persistence.create(null, CHECK3);

        assert.isObject(payrollCheck);
        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK3);
    }

    public async testCrudOperations() {
        let payrollCheck1: PayrollCheckV1;

        // Create items
        await this.testCreatePayrollChecks();

        // Get all payroll checks
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        payrollCheck1 = page.data[0];

        // Update the payroll check
        payrollCheck1.number = RandomText.text(5, 32);

        let payrollCheck = await this._persistence.update(null, payrollCheck1);

        assert.isObject(payrollCheck);
        assert.equal(payrollCheck.number, payrollCheck1.number);

        payrollCheck1 = payrollCheck;

        // Delete payroll check
        await this._persistence.deleteById(null, payrollCheck1.id);

        // Try to get delete payroll check
        payrollCheck = await this._persistence.getOneById(null, payrollCheck1.id);

        assert.isNull(payrollCheck || null);
    }

    public async testGetWithFilter() {
        // Create payroll checks
        await this.testCreatePayrollChecks();

        // Get payroll checks filtered by customer id
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                party_id: '1'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get payroll checks by state
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                state: PayrollCheckStateV1.New
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get payroll checks by ids
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                ids: ['1', '3']
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get all payroll checks by period
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                from_time: new Date(2020, 1, 15),
                to_time: new Date(2020, 8, 15),
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        // Get one payroll check by period
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                from_time: new Date(2020, 4, 15),
                to_time: new Date(2020, 7, 15),
            }),
            new PagingParams()
        );
        
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
    }

}
