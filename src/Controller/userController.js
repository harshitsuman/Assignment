const userModel = require('../Model/userModel');
const userService = require('../Service/userService')

module.exports = {


    userProfile : async (req,res,next) => {
        try {
            const result = await userModel.find({},'email firstName lastName type' )
            res.send(result);
        }
        catch(err){
            res.status(500).send(err);
        };

    },

    postUserData : async (req,res,next) => {

        try{
            if(req.headers.type === 'admin') {
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
            } else {
                next("permisson denied")
            }
        }
        catch(err) {
            if(err.message == 'Exists'){
                err.status = 409 //409 is the correct status code for duplicate resource or resource already exists
                err.message = "User data already exists"
            }
            next(err);
        }

    },

    updateUser : async (req,res,next) => {
        let data = req.body
        let updatedDataValue = {firstName: data.firstName, lastName: data.lastName, email: data.email }
        if(req.headers.type === 'admin') {
            let updatedDataResult = await userService.updateUser(req.params.id, updatedDataValue)
            if(updatedDataResult)
                res.send({
                    acknowledged: updatedDataResult.acknowledged,
                    modifiedCount: updatedDataResult.modifiedCount
                })
            else {
                next(err)
            }
        } else {
            next("permisson denied")
        }
    },

    deleteUser : async (req,res,next) => {
        if(req.headers.type === 'admin') {
            let recordDeleted = await userService.deleteUser(req.params.id)
            res.send(recordDeleted)
        } else {
            next("permisson denied")
        }
    },
};
