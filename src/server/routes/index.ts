import { Router } from "express";
import {StatusCodes} from "http-status-codes"

const router = Router();

router.get("/get", (_, res) => {
    return res.send("Testando... OK!");
})

router.post("/post", (req, res) => {
    console.log(req.body)

    return res.status(StatusCodes.ACCEPTED).json(req.body);
})



export { router };