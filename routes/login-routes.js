  Login = () => {

      const login = (req, res) => {
          const loginUsername = req.params.username;
          if (loginUsername && !req.session.username) {
              req.session.username = loginUsername;
          }

          res.redirect('/');
      }

      const home = (req, res) => {
          let greeting = 'Hello';
          if (req.session.username) {
              greeting += (", " + req.session.username)
          }
          res.send(greeting);
      }

      const logout = (req, res) => {
          delete req.session.user;
          res.redirect('/');
      }

      return {
          login,
          home,
          logout
      }
  }