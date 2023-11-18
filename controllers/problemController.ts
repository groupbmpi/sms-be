import { Request, Response } from "express";
import ResponseBuilder from "../types/response/builder";

class ProblemController {
    getProblems = async (req: Request, res: Response) => {
        try {
            throw new Error("Test error")
            res.status(200).json(
                ResponseBuilder.success(
                    200,
                    "Get problems successfully"
                )
            )
        } catch (error: any) {
            res.status(500).json(
                ResponseBuilder.error(
                    500,
                    error.message
                )
            )
        }
    }

	createProblem = async (req: Request, res: Response) => {

    }
}

export default new ProblemController