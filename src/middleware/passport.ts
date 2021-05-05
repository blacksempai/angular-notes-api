import passport from 'passport';
import { Strategy, ExtractJwt} from 'passport-jwt';
import config from '../config/config';
import User from '../models/User';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt
};

export default (passport: passport.PassportStatic) => {
    passport.use(
        new Strategy(options, async (payload, done)=>{
            try{
                const user = await User.findById(payload.userId).select('email id');
                if(user) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            }
            catch(e) {
                //TODO: Handle error
            }
        })
    );
};