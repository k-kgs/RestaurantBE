const controller = require('./controller');

app.post("/getAdminDetails", controller.getAdminDetails);
app.post("/getInventory", controller.getInventory);
app.post("/addInventory", controller.addInventory);
app.put("/updateInventory", controller.updateInventory);
app.delete("/deleteInventory", controller.deleteInventory);
