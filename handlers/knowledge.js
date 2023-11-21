const db = require("../models");

exports.getKnowledges = async function(req, res, next){
    try{
        const knowledges = await db.Knowledge.find({});

        return res.status(200).json(knowledges);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.getKnowledge = async function(req, res, next){
    const id = req.params.id;
    
    try{
        const knowledges = await db.Knowledge.findById(id);

        return res.status(200).json(knowledges);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.createKnowledge = async function(req, res, next){
    const {title, description} = req.body;
    
    if (!title || !description ) {

        return next({
            status: 422,
            message: "Please provide required info."
        });
    }

    try{
        const knowledge = await db.Knowledge.create({
            title,
            description      
        });

        return res.status(200).json(knowledge);
    } catch(err){
         // if validation fail
         if(err.code === 11000){
            err.message = "Sorry, the knowledge title is used.";
        }

        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.updateKnowledge = async function(req, res, next){
    const id = req.params.id;

    try{

        // update Knowledge details
        await db.Knowledge.findByIdAndUpdate(id, {...req.body}, {useFindAndModify: false});

        return res.status(200).json({message: `Knowledge successfully updated.`});
    } catch(err){
         // if validation fail
         if(err.code === 11000){
            err.message = "Sorry, the Knowledge title is already used.";
        }

        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.deleteKnowledge = async function(req, res, next){
    try{
        const id = req.params.id;

        const knowledge = await db.Knowledge.findById(id);

        if(!knowledge){
            return next({
                status: 422,
                message: "Knowledge is not exist."
            })
        }

        await knowledge.remove();

        return res.status(200).json({message: `Knowledge deleted!`});
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.searchKnowledge = async function(req, res, next){
    const searchText = req.query.search;
    
    try{
        const knowledges = await db.Knowledge.find({ $text: { $search: searchText } });

        return res.status(200).json(knowledges);
    } catch(err){
        return next({
            status: 400,
            message: err.message
        });
    }
};