import { AuthMiddleware } from "middlewares/auth/authMiddleware";
import BaseRoutes from "./baseRoutes";
import { UserController } from "@controllers"

class UserRoutes extends BaseRoutes {
   public setRoutes(): void {
      this.routes.post("/register/", UserController.registerUser);
      this.routes.post("/login/",UserController.loginUser)

      this.routes.put("/verify/", UserController.verifyUser);
      this.routes.get("/verify/", UserController.getUnverifiedUser);

      this.routes.put("/activate/",UserController.activateUser);

      this.routes.put("/:id", UserController.edit);
   }
}

export default new UserRoutes().getRoutes();