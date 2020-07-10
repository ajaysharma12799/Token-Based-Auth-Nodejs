const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('auth-token'); // GETTING TOKEN FROM REQUEST HEADER
    if(token) { // CHECKING WHETHER TOKEN IS PRESENT
        try {
            const verified = jwt.verify(token, process.env.SECRET); // VERIFYING TOKEN USING JWT VERIFY METHOD
            req.user = verified; // SETTING VERIFIED VALUE IN USER OBJECT IN REQUEST
            next();
        }
        catch(error) {
            res.send(400).json('Invalid Token');
        }
    }
    else {
        res.status(401).json('Access Denied'); // IF TOKEN IS NOT PRESENT THEN USER CANNOT ACCESS PRIVATE ROUTES
    }
}