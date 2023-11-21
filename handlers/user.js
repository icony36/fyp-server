const db = require("../models");

exports.getUser = async function(req, res, next){
    try{
        const id = req.params.id;
        
        const user = await db.User.findById(id);

        return res.status(200).json(user);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.getUsers = async function(req, res, next){
    try{
        const user = await  db.User.find({});

        return res.status(200).json(user);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.updateUser = async function(req, res, next){
    const id = req.params.id;

    try{
        // find user
        const user = await db.User.findById(id);

        // update user
        await db.User.findByIdAndUpdate(id, {...req.body});

        return res.status(200).json({message: `User successfully updated.`});
    } catch(err){
         // if validation fail
         if(err.code === 11000){
            err.message = "Sorry, the username is used.";
        }

        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.deleteUser = async function(req, res, next){
    try{
        const id = req.params.id;

        const user = await db.User.findById(id);

        if(!user){
            return next({
                status: 422,
                message: "User is not exist."
            })
        }

        await user.remove();

        return res.status(200).json({message: `User ${id} deleted!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.suspendUser = async function(req, res, next){
    try{
        const id = req.params.id;

        // update user
        await db.User.findByIdAndUpdate(id, {isSuspended: req.body.isSuspended});

        return res.status(200).json({message: `User ${req.body.isSuspended ? "suspended" : "unsuspended"}!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};