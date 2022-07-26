const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams, RandomText } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PayrollCheckV1 } from '../../../src/data/version1/PayrollCheckV1';
import { PayrollChecksMemoryPersistence } from '../../../src/persistence/PayrollChecksMemoryPersistence';
import { PayrollChecksController } from '../../../src/logic/PayrollChecksController';
import { PayrollChecksHttpServiceV1 } from '../../../src/services/version1/PayrollChecksHttpServiceV1';
import { TestModel } from '../../data/TestModel';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let CHECK1: PayrollCheckV1 = TestModel.createPayrollCheck1();
let CHECK2: PayrollCheckV1 = TestModel.createPayrollCheck2();

suite('PayrollChecksHttpServiceV1', () => {
    let service: PayrollChecksHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let persistence = new PayrollChecksMemoryPersistence();
        let controller = new PayrollChecksController();

        service = new PayrollChecksHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-payrollchecks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-payrollchecks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-payrollchecks', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });

    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });


    test('CRUD Operations', async () => {
        let payrollCheck1, payrollCheck2: PayrollCheckV1;

        // Create one payroll check
        let payrollCheck = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/payroll_checks/create_check',
                {
                    check: CHECK1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(payrollCheck);

        assert.equal(payrollCheck.party_id, CHECK1.party_id);
        assert.equal(payrollCheck.state, CHECK1.state);
        assert.equal(payrollCheck.income_total, CHECK1.income_total);
        assert.equal(payrollCheck.deductions_total, CHECK1.deductions_total);
        assert.equal(payrollCheck.net_total, CHECK1.net_total);

        // TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK1);

        payrollCheck1 = payrollCheck;

        // Create another payroll check
        payrollCheck = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/payroll_checks/create_check',
                {
                    check: CHECK2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(payrollCheck);

        assert.equal(payrollCheck.party_id, CHECK2.party_id);
        assert.equal(payrollCheck.state, CHECK2.state);
        assert.equal(payrollCheck.income_total, CHECK2.income_total);
        assert.equal(payrollCheck.deductions_total, CHECK2.deductions_total);
        assert.equal(payrollCheck.net_total, CHECK2.net_total);

        // TestModel.assertEqualPayrollCheckV1(payrollCheck, CHECK2);

        payrollCheck2 = payrollCheck;

        // Get all payroll checks
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/payroll_checks/get_checks',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });


        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the payroll check
        payrollCheck1.number = RandomText.text(5, 32);

        payrollCheck = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/payroll_checks/update_check',
                {
                    check: payrollCheck1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(payrollCheck);
        assert.equal(payrollCheck.number, payrollCheck1.number);
        assert.equal(payrollCheck.id, CHECK1.id);

        payrollCheck1 = payrollCheck;

        // Delete payroll check
        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/payroll_checks/delete_check_by_id',
                {
                    check_id: payrollCheck1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);

        // Try to get delete payroll check
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/payroll_checks/get_check_by_id',
                {
                    check_id: payrollCheck1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);
    });
});