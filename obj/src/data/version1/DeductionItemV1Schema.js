"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeductionItemV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class DeductionItemV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('description', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('total', pip_services3_commons_nodex_2.TypeCode.Float);
        this.withOptionalProperty('ytd_total', pip_services3_commons_nodex_2.TypeCode.Float);
    }
}
exports.DeductionItemV1Schema = DeductionItemV1Schema;
//# sourceMappingURL=DeductionItemV1Schema.js.map