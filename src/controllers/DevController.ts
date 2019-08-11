import express from "express";
import axios from "axios";
import Dev from "../models/Dev";

export default {
    async index(req: express.Request, res: express.Response) {
        const { user } = req.headers;

        const loggedDev: any = await Dev.findById(user);

        const users = await Dev.find({
            $and: [{ _id: { $ne: user } }, { _id: { $nin: loggedDev.likes } }, { _id: { $nin: loggedDev.dislike } }]
        });

        return res.json(users);
    },

    async store(req: express.Request, res: express.Response) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (!!userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({ name, user: username, bio, avatar });

        return res.json(dev);
    }
};
