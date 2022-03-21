import BlackToken from "../models/model.blacktoken";

export const cronController = async () => {
	BlackToken.deleteMany({}, function (err) {
		console.log("success");
		if (err) console.error(err);
	});
};
