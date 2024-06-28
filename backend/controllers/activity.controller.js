// Implement application logic in controllers.

const Activity = require("../models/activity.model");

// * It's an async function that uses the Activity model to find all activities and 
// then returns a status of 200 with the activities in the response body.
const getActivities=async(req,res)=>{
    try{
        const activities=await Activity.find();
        res.status(200).json(activities);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};


// * It creates a new activity and saves it to the database.
const addActivity=async(req,res)=>{
    const activity=new Activity(req.body);
    try{
        await activity.save();
        res.status(201).json({message:"Activity added successfully"});
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

module.exports = {
    getActivities,
    addActivity,
  };
