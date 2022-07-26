const assert = require('chai').assert;

import { RandomText } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';

import { PayrollCheckV1 } from '../../src/data/version1/PayrollCheckV1';
import { PayrollChecksLambdaFunction } from '../../src/container/PayrollChecksLambdaFunction';
import { TestModel } from '../data/TestModel';

let CHECK1: PayrollCheckV1 = TestModel.createPayrollCheck1();
let CHECK2: PayrollCheckV1 = TestModel.createPayrollCheck2();

suite('PayrollChecksLambdaFunction', () => {
    let lambda: PayrollChecksLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-payrollchecks:persistence:memory:default:1.0',
            'controller.descriptor', 'service-payrollchecks:controller:default:default:1.0'
        );

        lambda = new PayrollChecksLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });

    suiteTeardown(async () => {
        await lambda.close(null);
    });

    test('CRUD Operations', async () => {
        var payrollCheck1, payrollCheck2: PayrollCheckV1;

        // Create one payroll check
        let payrollCheck = await lambda.act(
            {
                role: 'payroll_checks',
                cmd: 'create_check',
                check: CHECK1
            }
        );

        assert.isObject(payrollCheck);
        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK1);

        payrollCheck1 = payrollCheck;

        // Create another payroll check
        payrollCheck = await lambda.act(
            {
                role: 'payroll_checks',
                cmd: 'create_check',
                check: CHECK2
            }
        );

        assert.isObject(payrollCheck);
        TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK2);

        payrollCheck2 = payrollCheck;

        // Get all payroll checks
        let page = await lambda.act(
            {
                role: 'payroll_checks',
                cmd: 'get_checks'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the payroll check
        payrollCheck1.number = RandomText.text(5, 32);

        payrollCheck = await lambda.act(
            {
                role: 'payroll_checks',
                cmd: 'update_check',
                check: payrollCheck1
            }
        );

        assert.isObject(payrollCheck);
        assert.equal(payrollCheck.number, payrollCheck1.number);
        assert.equal(payrollCheck.id, CHECK1.id);

        payrollCheck1 = payrollCheck;

        // Delete payroll check
        await lambda.act(
            {
                role: 'payroll_checks',
                cmd: 'delete_check_by_id',
                check_id: payrollCheck1.id,
            }
        );

        // Try to get delete payroll check
        payrollCheck = await lambda.act(
            {
                role: 'payroll_checks',
                cmd: 'get_check_by_id',
                check_id: payrollCheck1.id,
            }
        );
        
        assert.isNull(payrollCheck || null);
    });
});