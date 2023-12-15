import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ActivityRoutes, NewsRoutes, ProblemRoutes, UserRoutes, DataRoutes, LembagaRoutes, ChatRoutes } from '@routes';
import { queryParser } from 'express-query-parser';

export class ExpressInstance {
    private static expressInstance : ExpressInstance;
    
    private _app: express.Application;

    private constructor() {
        this._app = express();

        this._app.use(cors());

        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {
        this._app.use(express.json({limit: '50mb'}));
        this._app.use(express.urlencoded({limit: '50mb', extended:true}));
        this._app.use(morgan('dev'));
        this._app.use(cors({ origin: '*', credentials: true }));
        this._app.use(helmet({ crossOriginResourcePolicy: false }));
        this._app.use(cookieParser());
        this._app.use(queryParser({
            parseBoolean: true,
            parseNumber: true,
            parseUndefined: true,
            parseNull: true,
        }))
    }

    private setupRoutes(): void {
        this._app.use('/api/v1/problems', ProblemRoutes);
        this._app.use('/api/v1/user', UserRoutes);
        this._app.use('/api/v1/news', NewsRoutes);
        this._app.use('/api/v1/activity', ActivityRoutes);
        this._app.use('/api/v1/data', DataRoutes);
        this._app.use('/api/v1/lembaga', LembagaRoutes);
        this._app.use('/api/v1/chat', ChatRoutes);
    }

    public static getInstance(): ExpressInstance {
        if (! ExpressInstance.expressInstance) {
            ExpressInstance.expressInstance = new ExpressInstance()
        }

        return ExpressInstance.expressInstance;
    }

    public getApp(): express.Application {
        return this._app;
    }
}  