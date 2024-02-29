import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICity {
    name: string;
    state: string;
}

interface IFilter {
    filter?: string
}

// const bodyValidation: yup.ObjectSchema<ICity> = yup.object({
//     name: yup.string().required().min(4),
//     state: yup.string().required().min(4),

// })


export const createBodyValidation = validation((getSchema) => ({
    body: getSchema<ICity>(yup.object().shape({
        name: yup.string().required().min(4),
        state: yup.string().required().min(4),

    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().required().min(3),
    }))
}));


export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
    console.log(req.body);
    return res.send("Create!");
};