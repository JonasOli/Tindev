import Dev from "../models/Dev";
import express from "express";

export default {
    async store(req: express.Request, res: express.Response) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev: any = await Dev.findById(user);
        const targetDev: any = await Dev.findById(devId);

        if (!targetDev) {
            return res.send(400).json({ error: "dev not exists" });
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log("Deu match");
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json({ ok: true });
    }
};
