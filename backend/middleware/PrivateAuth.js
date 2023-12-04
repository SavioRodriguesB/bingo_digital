var jwt = require("jsonwebtoken");

module.exports = function(req, res, next){
    var token = req.headers['authorization'];

    if(token != undefined){
        token = token.split(' ')[1];
        
        try {
            let decoded = jwt.verify(token,process.env.JWT_SECRET_ADMIN);
            if(validarParams(decoded, req.params) && validarParams(decoded, req.body)){
                return next()
            }
        } catch (error) {
        }

        try {
            decoded = jwt.verify(token,process.env.JWT_SECRET_USER);
            if(validarParams(decoded, req.params) && validarParams(decoded, req.body)){
                return next()
            }
        } catch (error) {
        }
        return res.sendStatus(403);

    }else{
        return res.sendStatus(403);
    }
}

function validarParams(jwtParams, reqParams){
    for(key of Object.keys(reqParams)){
        if(jwtParams[key] && jwtParams[key] != reqParams[key]){
            return false
        }
    }
    return true;
}