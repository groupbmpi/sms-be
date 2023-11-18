import BaseRoutes from "./baseRoutes";
import { ProblemController } from "../controllers"

class ProblemRoutes extends BaseRoutes{
   public setRoutes(): void {
        this.routes.get("/", ProblemController.getAll);
        this.routes.get("/:creatorId", ProblemController.getByCreatorId);
        this.routes.post("/", ProblemController.create);
   }
}

export default new ProblemRoutes().getRoutes();