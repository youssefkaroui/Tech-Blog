const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
 

  try {
    const signupData = await User.create(req.body);
   

    req.session.save(() => {
      req.session.userId = signupData.id;
      req.session.loggedIn = true;

      res.status(200).json(signupData);
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const loginData = await User.findOne({ where: { email: req.body.userEmail } });

    if (!loginData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const loginPassword = loginData.checkPassword(req.body.UserPassword); 
    
    if (!loginPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = loginData.id;
      req.session.loggedIn = true;
      
      res.json({ user: loginData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;