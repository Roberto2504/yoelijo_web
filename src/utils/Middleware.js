const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain       : 'tavuel506.auth0.com',
    clientID     : 'sckYiIiJNU2T923A89EEBHoy8SV4L0Ux',
    clientSecret : 'DitHeiCLkA1nXgz5yABoAu0KcwQCOHE4bnKZjxt7l_hKcK_fWvB4b8pTAac_9pa0',
    callbackURL  : 'http://localhost:2504',
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// ...
app.use(passport.initialize());
app.use(passport.session());
