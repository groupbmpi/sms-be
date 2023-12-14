import { NewsController } from "@controllers";
import { createNewsRequestMiddleware, updateNewsRequestMiddleware, paramNewsRequestMiddleware, deleteNewsRequestMiddleware } from "@middlewares";
import { BaseRoutes } from "@routes";

class NewsRoutes extends BaseRoutes {
    public setRoutes(): void {
        this.routes.get('/', NewsController.getAllNews);
        this.routes.get('/optimum-dates', NewsController.getNewsOptimumDates);
        this.routes.get('/:newsId', [paramNewsRequestMiddleware], NewsController.getNewsById);
        this.routes.post('/', [createNewsRequestMiddleware], NewsController.createNews);
        this.routes.put('/:newsId', [updateNewsRequestMiddleware], NewsController.updateNews);
        this.routes.delete('/:newsId', [deleteNewsRequestMiddleware], NewsController.deleteNews);
    }
}

export default new NewsRoutes().getRoutes();