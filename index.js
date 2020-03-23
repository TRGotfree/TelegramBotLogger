const fs = require("fs");
const promisify = require("util").promisify;
const fileReader = promisify(fs.readFile);
const BotLogger = require("./logger");

const loadConfiguration = async function (pathToConfig) {
    const config = await fileReader(pathToConfig, "utf8");
    if (!config)
        throw new Error("Configuration file not read or not found!");

    return JSON.parse(config);
}

const logInfo = async function () {
    const config = await loadConfiguration();
    const logger = new BotLogger(process.env.TOKEN, config);
    logger.sendInfo("Test info message", config.recipients);
}

const logError = async function () {
    const config = await loadConfiguration();
    const logger = new BotLogger(process.env.TOKEN, config);
    logger.sendError(new Error("Test error object!"), config.recipients);
}

await logInfo();
await logError();
