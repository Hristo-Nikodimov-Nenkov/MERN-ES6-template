import {json, urlencoded} from "express";

const useExtendedUrlEncoded = true;

export default function (app) {
    app.use(json());
    app.use(urlencoded({extended: useExtendedUrlEncoded}));
}