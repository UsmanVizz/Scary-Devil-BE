const express = require('express');
const router = express.Router();
const userAuth = require('../../controllers/users/user.js');
const { validateUserData } = require("../../middleware/signUpValidation.js");


router.post('/login', userAuth.signIn);
router.post('/signup', validateUserData, userAuth.signup);


router.get("/", async (req, res) => {
    res.status(500).send('Node User Working')
})

module.exports = router;


