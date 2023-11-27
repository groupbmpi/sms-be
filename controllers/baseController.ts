import { BaseHandler } from "@handlers";

abstract class BaseController<T extends BaseHandler> {
    protected handler: T;

    constructor(handler: T) {
        this.handler = handler;
    }
}

export default BaseController;