import express from "express";
import DevController from "./controllers/DevController";
import LikeController from "./controllers/LikeController";
import DislikeController from "./controllers/DislikeController";

const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => {
    return res.json({ message: `Olá ${req.query.name}` });
});

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);
routes.post("/devs/:devId/likes", LikeController.store);
routes.post("/devs/:devId/dislikes", DislikeController.store);

export default routes;
