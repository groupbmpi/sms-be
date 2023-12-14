import { ChatController } from "@controllers";
import BaseRoutes from "./baseRoutes";
import { AuthMiddleware } from "middlewares";

class ChatRoutes extends BaseRoutes {
    public setRoutes(): void {
        this.routes.get("/",AuthMiddleware, ChatController.getChat);
        this.routes.post("/",AuthMiddleware, ChatController.addChat);
    }
}

export default new ChatRoutes().getRoutes();