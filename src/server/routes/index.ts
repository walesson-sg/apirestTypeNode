import { Router } from "express";
import { CityController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
    return res.send("... OK!");
})

router.post("/city", CityController.createBodyValidation, CityController.create)


export { router };