import {BaseRoutes} from "@routes";
import { DataController } from "@controllers";

class DataRoutes extends BaseRoutes{
    public setRoutes(): void {
        this.routes.get("/actreport",  DataController.getDataFormActivityReport)
        this.routes.get("/probreport",  DataController.getDataFormProblemReport)
        this.routes.get("/user",  DataController.getDataFormUser)
        this.routes.get("/lembaga",  DataController.getDataFormLembaga)
    }
}

export default new DataRoutes().getRoutes();