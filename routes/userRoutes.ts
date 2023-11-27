import BaseRoutes from "./baseRoutes";
import { UserController } from "@controllers"

class UserRoutes extends BaseRoutes {
   public setRoutes(): void {
      this.routes.post("/", UserController.registerUser);
      this.routes.put("/verify/", UserController.verifyUser);
      this.routes.get("/verify/", UserController.getUnverifiedUser);
      this.routes.put("/:id", UserController.edit);
   }
}

export default new UserRoutes().getRoutes();