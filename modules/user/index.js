const controller = require('./controller');
console.log("======================= user called ================");
app.post("/getUserDetail", controller.getUserDetail);
app.post("/addUserDetail", controller.addUserDetail);
app.post("/getItems", controller.getItems);
app.put("/updateCreds", controller.updateUserDetail);
app.post("/getResetLink", controller.getResetLink);