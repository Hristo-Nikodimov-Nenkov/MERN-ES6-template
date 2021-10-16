const defaultPort = 5000;
export const port = process.env.PORT || defaultPort;
export const staticFilesRelativePath = "./public"; // Path is relative to template root folder!

export default {
    port,
    staticFilesRelativePath
}