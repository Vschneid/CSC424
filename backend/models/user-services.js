const mongoose = require("mongoose");
const userModel = require("./user");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    userToAdd.passwordEncrypt(user.password);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getAll(){
  return await userModel.find({ name: { $ne: null }, email: { $ne: null } }, { name: 1, email: 1 });
}

async function findUser(username, password) {
  try {
    const chk = await userModel.find({ username: username });
    return chk[0].passwordCheck(password);
  } catch (error) {
    console.log(error);
    return undefined;
  } 
}
/*
async function findUserById(id) {
  try {
      return await userModel.findById(id);
  } catch (error) {
      console.log(error);
      return undefined;
  }
}
*/
async function checkUser(username) {
  try {
    const chk = await userModel.find({ username: username });
    return chk[0] !== undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.findUser = findUser;
exports.addUser = addUser;
exports.checkUser = checkUser;
exports.getAll = getAll;