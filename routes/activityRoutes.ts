import { BaseRoutes } from "@routes";
import { ActivityController } from "@controllers";
import { AuthMiddleware } from "middlewares/auth/authMiddleware";

class ActivityRoutes extends BaseRoutes {
    public setRoutes(): void {
        this.routes.get("/",AuthMiddleware ,ActivityController.getReport);
        this.routes.post("/", AuthMiddleware, ActivityController.createReport);
        this.routes.put("/:id", AuthMiddleware, ActivityController.updateReport);
        this.routes.delete("/:id", AuthMiddleware, ActivityController.deleteReport);
    }
}

export default new ActivityRoutes().getRoutes();