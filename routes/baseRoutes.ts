import { Router } from 'express';

abstract class BaseRoutes {
    protected routes: Router;

    constructor() {
        this.routes = Router();
        this.setRoutes();
    }

    abstract setRoutes(): void;
    public getRoutes(): Router {
        return this.routes;
    }
}

export default BaseRoutes;