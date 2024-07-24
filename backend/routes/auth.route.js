const express=reuqire('express');

const {login}=require("../controllers/auth.controller");

const router=express.Router();

router.post("/login",login);

module.exports=router;
