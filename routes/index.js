const express = require('express');
const router = express.Router();
const admin = require('./users/user.js');
const subs = require('./subscriber/subscriber.js');


router.use('/admin', admin)
router.use('/subscriber', subs)

router.get("/", async (req, res) => {
    res.status(500).send('Node Working')
})



module.exports = router;