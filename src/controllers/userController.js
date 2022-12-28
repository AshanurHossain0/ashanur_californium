const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
const createUser = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "empty request body" })
        }
        else {
            let savedData = await userModel.create(data);
            res.status(201).send({ status: true, msg: savedData });
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err })
    }
};

const loginUser = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "empty request body" })
        }
        let userName = data.emailId;
        let password = data.password;
        let user = await userModel.findOne({ emailId: userName, password: password });
        if (!user)
            return res.status(400).send({
                status: false,
                msg: "username or the password is not corerct",
            });
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                owner: "Ashanur Hossain"
            },
            "nurasha2000"
        );
        res.status(200).send({ status: true, token: token });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err })
    }
};

const getUserData = async function (req, res) {
    try {
        let userId = req.params.userId;
        let userDetails = await userModel.findById(userId);
        if (!userDetails)
            return res.status(404).send({ status: false, msg: "No such user exists" });

        res.status(200).send({ status: true, data: userDetails });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err })
    }
};

const updateUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send("No such user exists");
        }

        let userData = req.body;
        let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
        res.status(200).send({ status: true, data: updatedUser });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err })
    }
};
const deleteUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        let user = await userModel.findById(userId);
        //Return an error if no user with the given id exists in the db
        if (!user) {
            return res.status(404).send("No such user exists");
        }
        await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true });
        res.status(200).send({ status: true, msg: "deleted successfully" });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err })
    }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
