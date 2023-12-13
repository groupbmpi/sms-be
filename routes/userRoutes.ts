import { AuthMiddleware } from "@middlewares";
import BaseRoutes from "./baseRoutes";
import { UserController } from "@controllers"

class UserRoutes extends BaseRoutes {
   public setRoutes(): void {
      this.routes.post("/register/accepted", UserController.registerUserAutoAccepted);
      this.routes.post("/register/", UserController.registerUser);
      this.routes.post("/login/",UserController.loginUser)

      this.routes.put("/verify/", UserController.verifyUser);
      this.routes.get("/verify/", UserController.getUnverifiedUser);

      this.routes.put("/activate/",UserController.activateUser);

      this.routes.get("/:id", [AuthMiddleware], UserController.getUserById);
      this.routes.put("/:id", [AuthMiddleware], UserController.updateUnverifiedUser);

      this.routes.put("/", [AuthMiddleware], UserController.updateUser);
      this.routes.get("/", [AuthMiddleware], UserController.getUser);
      this.routes.get("/auth/profile", [AuthMiddleware], UserController.getRoleUser);

      this.routes.post("/admin",UserController.registerAdmin);
   }
}

export default new UserRoutes().getRoutes();