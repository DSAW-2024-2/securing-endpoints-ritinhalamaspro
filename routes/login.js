require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

let adminPasswordHash;

(async () => {
    adminPasswordHash = await bcrypt.hash('admin', 10);
})();

router.post('/', async (req, res) => {
    const userPassword = req.body.password;

    if (!userPassword) {
        return res.status(400).send('Cannot find password');
    }

    try {
        if (await bcrypt.compare(userPassword, adminPasswordHash)) {
            const username = req.body.username;
            const user = { name: username };

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            return res.status(403).send('Not allowed');
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
});

module.exports = router;
