const userModel = require('../Model/userModel');

module.exports = {

    signUp : async inputData => {
        return userModel.findOne(inputData);
    },

    getUser : async inputData => {
        return userModel.findOne(inputData)
    },

    getAllUsers: async page_no => {
        return userModel.find({},'email firstName lastName type' ).limit(10).skip(( page_no - 1 ) * 10 )
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
