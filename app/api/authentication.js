const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
const Session = require('../account/session');

const authenticate = (req, res, next) => {
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
                next();
                // res.json({ authenticated });
            })
            .catch(error => next(error));
    }
}

module.exports = authenticate;