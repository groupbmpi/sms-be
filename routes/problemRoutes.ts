import BaseRoutes from "./baseRoutes";
import { ProblemController } from "../controllers"

class ProblemRoutes extends BaseRoutes{
   public setRoutes(): void {
        this.routes.get("/", ProblemController.getProblems);
        this.routes.post("/", ProblemController.createProblem);
   }
}

export default new ProblemRoutes().getRoutes();