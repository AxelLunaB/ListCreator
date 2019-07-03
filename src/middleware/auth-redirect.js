module.exports = function (options = {}) {
  return function authRedirect(req, res, next) {
    // console.log('authRedirect');

    // if (req.authenticated) {
    //   console.log('authenticated');

    //   return res.redirect('/');
    // }

    // if (!req.app.passport._strategy(strategy)) {
    //   return next(new Error(`Your '${strategy}' authentication strategy is not registered with passport.`));
    // }
    // from express-session for OAuth1?
    req.app.authenticate('jwt', options)(req).then((result = {}) => {
      // console.log('authRedirect function');
      if (result.success) {
        // console.log('success');

        return res.redirect('/');
      }

      if (result.fail) {
        // console.log('fail');
      }

      if (result.redirect) {
        // console.log('redirecting');
        return res.redirect('/');
      }

      // Only gets here if pass() is called by the strategy
      next();
    }).catch(next);
  };
};
