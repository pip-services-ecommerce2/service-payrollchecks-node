import { PayrollChecksFilePersistence } from '../../src/persistence/PayrollChecksFilePersistence';
import { PayrollChecksPersistenceFixture } from './PayrollChecksPersistenceFixture';

suite('PayrollChecksFilePersistence', ()=> {
    let persistence: PayrollChecksFilePersistence;
    let fixture: PayrollChecksPersistenceFixture;
    
    setup(async () => {
        persistence = new PayrollChecksFilePersistence('./data/payroll_checks.test.json');

        fixture = new PayrollChecksPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });
});