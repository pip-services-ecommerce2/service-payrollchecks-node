import { ConfigParams } from 'pip-services3-commons-nodex';

import { PayrollChecksMemoryPersistence } from '../../src/persistence/PayrollChecksMemoryPersistence';
import { PayrollChecksPersistenceFixture } from './PayrollChecksPersistenceFixture';

suite('PayrollChecksMemoryPersistence', ()=> {
    let persistence: PayrollChecksMemoryPersistence;
    let fixture: PayrollChecksPersistenceFixture;
    
    setup(async () => {
        persistence = new PayrollChecksMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new PayrollChecksPersistenceFixture(persistence);
        
        await persistence.open(null);
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