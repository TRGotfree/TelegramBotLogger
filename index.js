const fs = require("fs");
const promisify = require("util").promisify;
const fileReader = promisify(fs.readFile);

const loadConfiguration = async function (pathToConfig) {
    try {

        const config = await fileReader(pathToConfig, "utf8");
        if (!config)
            throw new Error("Configuration file not read or not found!");

        return JSON.parse(config);

    } catch (error) {
        throw error;
    }
}