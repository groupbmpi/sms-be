import { BaseRoutes } from "@routes";
import { ProblemController } from "@controllers"
import { AuthMiddleware } from "@middlewares";

class ProblemRoutes extends BaseRoutes {
   public setRoutes(): void {
        this.routes.get("/", ProblemController.getReport);
        this.routes.post("/", [AuthMiddleware], ProblemController.createReport);
   }
}

export default new ProblemRoutes().getRoutes();