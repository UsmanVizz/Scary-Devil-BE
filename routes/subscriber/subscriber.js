const express = require('express');
const router = express.Router();
const subs = require('../../controllers/subscribers/subscribers.js');
const { validateUserData } = require('../../middleware/validateUsers.js')
require('dotenv').config();


// router.post('/login', subs.add);
router.post('/delete_all', validateUserData, subs.del_all);
router.delete('/delete_one/:id', validateUserData, subs.del_one);
// router.get('/signup', validateUserData, subs.get_all);
// router.get('/signup', validateUserData, subs.get_one);



router.get("/", async (req, res) => {
    res.status(500).send('Node User Working')
})

module.exports = router;