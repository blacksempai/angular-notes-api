import { Secret } from "jsonwebtoken";

export default {
    mongoURI: (<string>process.env.MONGO_URI),
    jwt: (<Secret>process.env.JWT)
}