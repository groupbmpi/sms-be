import {BaseRoutes} from "@routes";
import { DataController } from "@controllers";
import { AuthMiddleware } from "middlewares";

class DataRoutes extends BaseRoutes{
    public setRoutes(): void {
        this.routes.get("/actreport", AuthMiddleware, DataController.getDataFormActivityReport)
        this.routes.get("/probreport", AuthMiddleware, DataController.getDataFormProblemReport)
        this.routes.get("/user", AuthMiddleware, DataController.getDataFormUser)
        this.routes.get("/lembaga", AuthMiddleware, DataController.getDataFormLembaga)
    }
}

export default new DataRoutes().getRoutes();