// import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
// import User from "../models/model.user";
// import { config } from "../config";

// const opts: StrategyOptions = {
// 	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 	secretOrKey: config.jwt.secret
// };

// export default new Strategy(opts, async (payload, done) => {
// 	try {
// 		const user = await User.findById(payload.id);
// 		if (user) return done(null, user);
// 		return done(null, false);
// 	} catch (error) {
// 		return done(new Error(`🥷🏼 🚨 👮🏼‍♂️ Unauthorized`), null);
// 	}
// });
