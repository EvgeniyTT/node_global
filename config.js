const config = {};

config.mongoDbName = process.env.mongoDbName || 'mongodb';
config.serverPort = process.env.serverPort || 3000;

export default config;