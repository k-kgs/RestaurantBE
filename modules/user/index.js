const controller = require('./controller');

app.get("/getUserDetail", controller.getUserDetail);
app.post("/addUserDetail", controller.addUserDetail);
app.get("/getItems", controller.getItems);
app.put("/updateCreds", controller.updateUserDetail);
app.post("/getResetLink", controller.getResetLink);