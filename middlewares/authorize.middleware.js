const User = require('../models/user')

function hasAuthorize(permission){
    const user = User.findOne({
        where: {
            id: req.session.user.id
        }
    })    
}