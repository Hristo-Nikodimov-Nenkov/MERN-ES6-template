import {static as staticFiles} from "express";
import path from "path";
import {staticFilesRelativePath} from "../configs/application.js";

const staticFilesPath = path.resolve(staticFilesRelativePath);

export default function (app){
    app.use(staticFiles(staticFilesPath));
}