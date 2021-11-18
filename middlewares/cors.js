import cors from "cors";

export default (app, env) => {
    if (env !== "production") {
        app.use(cors());
    }
}