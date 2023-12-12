import { LembagaController } from "@controllers";
import { AuthMiddleware } from "@middlewares";
import BaseRoutes from "./baseRoutes";

class LembagaRoutes extends BaseRoutes{
    public setRoutes(): void {
        this.routes.get("/",  AuthMiddleware,LembagaController.getLembaga)
        this.routes.post("/", AuthMiddleware, LembagaController.createLembaga)
        this.routes.put("/",  AuthMiddleware, LembagaController.updateLembaga)
    }
}

export default new LembagaRoutes().getRoutes();