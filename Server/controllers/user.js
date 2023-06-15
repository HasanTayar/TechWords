const User = require("../Models/user");
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "faild to retrevie users " + e });
  }
};

exports.register = async (req, res) => {
  console.log("register start");
  console.log("req-body", req.body);
  try {
    const { name, email, password, gender, birthdate } = req.body;
    const user = User({
      name,
      email,
      password,
      gender,
      birthdate,
    });
    await user.save();
    res.status(200).send({
      message: "A user created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "An error occurred while creating the User. Please try again.",
    });
  }
};

exports.login= async (req , res) => {
    try{
        const {email , password } = req.body;
        const user = User.findOne(email);
        if(!user){
        res.status(404).send({ message: "User not found." });
        }else{
            const isMatch = (user.password == password);
            if(!isMatch){
                res.status.send({message: "Invalid email or password."});
            }
        }
        res.status(200).send({ message: "Logged in successfully.", user });
    }catch(e){
        console.log(e);
        res.status(500).send({message: "some thing went wrong please try again later"});
    }
};
