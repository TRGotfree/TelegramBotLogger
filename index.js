const config = require("./config.json");
const BotLogger = require("./logger");

const logInfo = async function () {
    const logger = new BotLogger(process.env.TOKEN, config);
    logger.sendInfo("Test info message", config.recipients);
}

const logError = async function () {
    const logger = new BotLogger(process.env.TOKEN, config);
    logger.sendError(new Error("Test error object!"), config.recipients);
}

await logInfo();
await logError();
