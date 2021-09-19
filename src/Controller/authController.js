const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var joi = require('joi');
var userModel = require('../Model/userModel');
var userService = require('../Service/userService');



module.exports ={
    signIn : async (req,res,next) => {
        let data = req.body
        try{
            var result = await userService.getUser({email: data.email, type: data.type});
            if(result){
                const resultPass = await bcrypt.compare(req.body.password, result.password);
                if(resultPass){
                    let payLoad = {
                        email: data.email,
                        type: data.type,
                    }
                    let signOptions = {
                        expiresIn: "1d",
                        algorithm: "HS256"
                    };
                    const token = await jwt.sign(payLoad, process.env.jwt_key, signOptions);
                    res.json({token: token});
                }
                else {
                    throw new Error("Username or password missmatched....!!")
                }
            }
            else{
                throw new Error("NOT_FOUND");
            }

        }
        catch(err) {
            if (err.message == "NOT_FOUND") {
                err.status = 404
                err.message = "User data not found"
            }
            if (err.message == "Username or password missmatched....!!") {
                err.status = 403
            }
            next(err);
        }

    },


    signUp : async (req,res,next) => {
        try{
            var signupData = await userService.signUp({email : req.body.email});

            if(signupData === null) {
                var object = new userModel(req.body)
                object =  await object.save();
                object1 = JSON.parse(JSON.stringify(object));
                delete object1.password;
                res.send(object1);
            }
            else {
                throw new Error('Exists');
            }
        }
        catch(err) {
            if(err.message == 'Exists'){
                err.status = 409
                err.message = "User data already exists"
            }
            next(err);
        }

    }
}