const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ email, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        if(sessionId) {
            sessionString = Session.sessionString({ email, id: sessionId });
            setSessionCookie({ sessionString, res });

            resolve({ message: 'session restored' })
        } else {
            session = new Session({ email });
            sessionString = session.toString();

            AccountTable.updateSessionId({
                sessionId: session.id,
                emailHash: hash(email)
            })
            .then(() => {
                setSessionCookie({ sessionString, res });

                resolve({ message: 'session created' });        
            })
            .catch(error => reject(error));
        }
    });
}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true
        // secure: true
    });
}

module.exports = { setSession };