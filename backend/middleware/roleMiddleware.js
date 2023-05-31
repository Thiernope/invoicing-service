import { ADMIN, USER } from "../constants/index.js"

const ROLES = {
    User: USER,
    Admin: ADMIN
}

const checkRole = (...userRoles) => {
    return (req, res, next) => {
        if(!req?.user && !req?.roles ) {
            res.status(401)
            throw new Error("You are not authorized to use our platform");
         }
        
         const incomingRolesArray = [...userRoles]

         const roleFound = req.roles
         .map(role => incomingRolesArray.includes(role))
         .find(value => value === true)


         if(!roleFound) {
            res.status(401);
            throw new Error("You are not permitted to perform this kind of request")
         }

         next();
    }
}

const role = { ROLES, checkRole }

export default role;
