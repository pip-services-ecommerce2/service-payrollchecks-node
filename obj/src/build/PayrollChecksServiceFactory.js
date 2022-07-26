"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollChecksServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const PayrollChecksMongoDbPersistence_1 = require("../persistence/PayrollChecksMongoDbPersistence");
const PayrollChecksFilePersistence_1 = require("../persistence/PayrollChecksFilePersistence");
const PayrollChecksMemoryPersistence_1 = require("../persistence/PayrollChecksMemoryPersistence");
const PayrollChecksController_1 = require("../logic/PayrollChecksController");
const PayrollChecksHttpServiceV1_1 = require("../services/version1/PayrollChecksHttpServiceV1");
class PayrollChecksServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(PayrollChecksServiceFactory.MemoryPersistenceDescriptor, PayrollChecksMemoryPersistence_1.PayrollChecksMemoryPersistence);
        this.registerAsType(PayrollChecksServiceFactory.FilePersistenceDescriptor, PayrollChecksFilePersistence_1.PayrollChecksFilePersistence);
        this.registerAsType(PayrollChecksServiceFactory.MongoDbPersistenceDescriptor, PayrollChecksMongoDbPersistence_1.PayrollChecksMongoDbPersistence);
        this.registerAsType(PayrollChecksServiceFactory.ControllerDescriptor, PayrollChecksController_1.PayrollChecksController);
        this.registerAsType(PayrollChecksServiceFactory.HttpServiceDescriptor, PayrollChecksHttpServiceV1_1.PayrollChecksHttpServiceV1);
    }
}
exports.PayrollChecksServiceFactory = PayrollChecksServiceFactory;
PayrollChecksServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-payrollchecks", "factory", "default", "default", "1.0");
PayrollChecksServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-payrollchecks", "persistence", "memory", "*", "1.0");
PayrollChecksServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-payrollchecks", "persistence", "file", "*", "1.0");
PayrollChecksServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-payrollchecks", "persistence", "mongodb", "*", "1.0");
PayrollChecksServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-payrollchecks", "controller", "default", "*", "1.0");
PayrollChecksServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-payrollchecks", "service", "http", "*", "1.0");
//# sourceMappingURL=PayrollChecksServiceFactory.js.map