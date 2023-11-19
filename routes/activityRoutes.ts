import BaseRoutes  from "./baseRoutes";
import { ActivityController } from "@controllers";

class ActivityRoutes extends BaseRoutes{
    public setRoutes(): void {
        this.routes.get("/", ActivityController.getReport);
        this.routes.post("/", ActivityController.createReport);
        this.routes.put("/", ActivityController.updateReport);
        this.routes.delete("/", ActivityController.deleteReport);
    }
}

export default new ActivityRoutes().getRoutes();