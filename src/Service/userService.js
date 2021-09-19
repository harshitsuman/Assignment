const userModel = require('../Model/userModel');

module.exports = {

    signUp : async inputData => {
        return userModel.findOne(inputData);
    },

    getUser : async inputData => {
        return userModel.findOne(inputData)
    },

    updateUser: async (id, updatedDataValue) => {
        let res = await userModel.updateOne({_id: id}, {$set: updatedDataValue})
        if(res)
            return res
        else
            return "Bad Input"
    },

    deleteUser : async (id) => {
        return userModel.deleteOne({_id: id})
    }
};
