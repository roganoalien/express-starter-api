import mongoose from "mongoose";
import { config } from "./config";

mongoose.connect(config.db.uri);

const connection = mongoose.connection;

connection.once("open", () => {
	console.log(`Mongodb connected to ${config.db.uri}`);
});

connection.once("error", (err) => {
	console.log(`Error at connecting with Mongodb db ${config.db.uri}`);
	console.log(err);
	process.exit(0);
});
