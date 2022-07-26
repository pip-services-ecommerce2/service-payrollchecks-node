"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollChecksFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const PayrollChecksMemoryPersistence_1 = require("./PayrollChecksMemoryPersistence");
class PayrollChecksFilePersistence extends PayrollChecksMemoryPersistence_1.PayrollChecksMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.PayrollChecksFilePersistence = PayrollChecksFilePersistence;
//# sourceMappingURL=PayrollChecksFilePersistence.js.map