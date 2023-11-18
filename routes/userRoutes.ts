import BaseRoutes from "./baseRoutes";
import { UserController } from "../controllers"

class UserRoutes extends BaseRoutes{
   public setRoutes(): void {
        this.routes.put("/:id", UserController.edit);
   }
}

export default new UserRoutes().getRoutes();