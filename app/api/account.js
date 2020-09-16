const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
const { setSession } = require('./helper.js');
const Session = require('../account/session');
const { validationRules, validate } = require('../account/validator');

const router = new Router();

router.post('/signup', validationRules(), validate, (req, res, next) => {
    const { email, password, name, address, phone } = req.body;
    const emailHash = hash(email);
    const passwordHash = hash(password);

    AccountTable.getAccount({ emailHash })
        .then(({ account }) => {
            if(!account) {
                return AccountTable.storeAccount({ emailHash, passwordHash, name, address, phone })
            } else {
                const error = new Error('This email is already registered');
                error.statusCode = 409;
                throw(error);
            }
        })
        .then(() => {
            return setSession({ email, res });
        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(error => next(error));
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    AccountTable.getAccount({ emailHash: hash(email) })
        .then(({ account }) => {
            if(account && account.passwordHash === hash(password)) {
                const { sessionId } = account;
                return setSession({ email, res, sessionId });
            } else {
                const error = new Error('Incorrect email/password');
                error.statusCode = 409;
                throw error;
            }
        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
    const { email } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId: null,
        emailHash: hash(email)
    })
    .then(() => {
        res.clearCookie('sessionString');
        res.status(200).redirect('/');
        // res.json({ message: 'logout successful' });
    })
    .catch(error => next(error));
});

router.get('/authenticated', (req, res, next) => {
    const { sessionString } = req.cookies;

    if(!sessionString || !Session.isValid(sessionString)) {
        const error = new Error('Invalid session');
        error.statusCode = 400;

        return next(error);
    } else {
        const { email, id } = Session.parse(sessionString);

        AccountTable.getAccount({ email, emailHash: hash(email) })
            .then(({ account }) => {
                const authenticated = (account && account.sessionId === id);

                res.json({ authenticated });
            })
            .catch(error => next(error));
    }
});

module.exports = router;
