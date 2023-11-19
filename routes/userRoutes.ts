import BaseRoutes from "./baseRoutes";
import { UserController } from "../controllers"

class UserRoutes extends BaseRoutes{
   public setRoutes(): void {
        this.routes.put("/:id", UserController.edit);
        this.routes.post("/", UserController.registerUser);
        this.routes.put("/verify/", UserController.verifyUser);
   }
}

export default new UserRoutes().getRoutes();