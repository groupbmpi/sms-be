import { NewsController } from "@controllers";
import { AuthMiddleware } from "@middlewares";
import { BaseRoutes } from "@routes";

class NewsRoutes extends BaseRoutes {
    public setRoutes(): void {
        this.routes.get('/', [AuthMiddleware], NewsController.getAllNews);
        this.routes.get('/optimum-dates', NewsController.getNewsOptimumDates);
        this.routes.get('/:id', [AuthMiddleware], NewsController.getNewsById);
        this.routes.post('/', [AuthMiddleware], NewsController.createNews);
        this.routes.put('/:id', [AuthMiddleware], NewsController.updateNews);
        this.routes.delete('/:id', [AuthMiddleware], NewsController.deleteNews);
    }
}

export default new NewsRoutes().getRoutes();