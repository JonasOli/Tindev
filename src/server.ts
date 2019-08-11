import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const server = express();

mongoose.connect(
    "mongodb+srv://jonasfissicaro:jonasfissicaro@cluster0-oilsa.mongodb.net/omnistack?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
