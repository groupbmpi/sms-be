import { NewsController } from "../controllers";
import { storeNewsRequestMiddleware } from "../middlewares/requests/news/storeNewsRequestMiddleware";
import { updateNewsRequestMiddleware } from "../middlewares/requests/news/updateNewsRequestMiddleware";
import BaseRoutes from "./baseRoutes";

class NewsRoutes extends BaseRoutes {
    public setRoutes(): void {
        this.routes.get('/news', NewsController.getAllNews);

        this.routes.get('/users/:creatorId/news', NewsController.getUserNews);
        this.routes.post('/users/:creatorId/news', [storeNewsRequestMiddleware], NewsController.storeNews);
        this.routes.put('/users/:creatorId/news/:newsId', [updateNewsRequestMiddleware],NewsController.updateNews);
        this.routes.delete('/users/:creatorId/news/:newsId', NewsController.deleteNews);
    }
}

export default new NewsRoutes().getRoutes();