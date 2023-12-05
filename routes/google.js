import passport from "passport"
import passportGoogle from "passport-google-oauth"
import { to } from "await-to-js"

import { getUserByProviderId, createUser } from "../../database/user"
import { signToken } from "../utils"

const GoogleStrategy = passportGoogle.OAuth2Strategy

const strategy = (app) => {
  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`,
  }

  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    // TODO
  }

  passport.use(new GoogleStrategy(strategyOptions, verifyCallback))

  return app
}

export { strategy }