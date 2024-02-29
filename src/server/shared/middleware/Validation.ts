import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = 'body' | 'header' | 'params' | 'query';

type Tgetschema = <T>(schema: Schema<T>) => Schema<T>

type TAllSchemas = Record<TProperty, Schema<any>>

type TGetAllSchemas = (getSchema: Tgetschema) => Partial<TAllSchemas>

type TValidator = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidator = (getAllSchemas) => async (req, res, next) => {
    console.log("...validator middleware.")
    const schemas = getAllSchemas(schema => schema)

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {

        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });
            console.log("try ok.")

        } catch (err) {
            const yupError = err as ValidationError;

            const errors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (!error.path) return;
                errors[error.path] = error.message;
            });
            console.log("catch! not ok");
            errorsResult[key] = errors;
        }
    })
    if (Object.entries(errorsResult).length === 0) {
        return next();
    }
    else {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: errorsResult })
    }

};