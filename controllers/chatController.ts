import { ChatHandler } from "@handlers";
import BaseController from "./baseController";
import { Request, Response } from "express";
import { IChatDTO, IChatRequest, IChatRequestQuery, ResponseBuilder } from "@types";
import { UnauthorizedException } from "@exceptions";

class ChatController extends BaseController<ChatHandler> {
    constructor() {
        super(new ChatHandler());
    }

    public addChat = async (req: Request<unknown>, res: Response) => {
        try {
            const body : IChatRequest = req.body;

            if(!req.isAuthenticated){
                throw new UnauthorizedException('User is not authenticated');
            }

            await this.handler.createChat(body, req.userID!!);
            res.status(201).json(
                ResponseBuilder.success(
                    null,
                    "",
                    201
                )
            )
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    public getChat = async (req: Request<unknown,unknown,unknown,IChatRequestQuery>, res: Response) => {
        try {
            if(!req.isAuthenticated){
                throw new UnauthorizedException('User is not authenticated');
            }

            const { lowID } = req.query;

            const chats = await this.handler.getChat(req.userID!!,lowID);

            res.status(200).json(
                ResponseBuilder.success<IChatDTO[]>(
                    chats,
                    "",
                    200
                )
            )
        } catch (error: any) {
            this.handleError(res, error);
        }
    }
}

export default new ChatController();