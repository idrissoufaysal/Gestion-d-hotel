const jwt = require('jsonwebtoken')
const { creatError } = require('./error')

const verifyToken = (req, res, next) => {
    const token = req.cookie.accessToken
    if (!token) {
        return next(creatError(401, "you are not authentiquated"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(creatError(401, "token is not valid"))
        req.user = user
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) return next(creatError(403, "you are not authorized"))
        }
    })
}


const authenticateUser = async (req, res, next) => {
    console.log('Middleware: authenticateUser');

    // const token = req.cookies.accessToken;
    const token = req.headers.authorization?.split(' ')[1]; // Extraction du token du format "Bearer TOKEN"

    if (!token) {
        console.log('Token non trouvé');
        return res.status(401).json({ error: "Vous n'etes pas connecter" });
    }

    console.log(req.headers.authorization);

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) {
            console.log('Erreur de vérification du token +', err);
            return res.status(483).json({ error: "Token non valide !" });
        }

        console.log('Token vérifié avec succès');
        req.userInfo = userInfo; // Ajoute les informations de l'utilisateur à l'objet de requête
        next(); // Passe à la suite du traitement
    });
};
//module.exports= authenticateUser  

module.exports = { verifyToken, verifyUser, authenticateUser }