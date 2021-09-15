//const { json } = require('express');
//const { getsingleDetail } = require('../../services/connectDb');
const dbUtils = require('../../services/dbUtils');
exports.getAdminDetails = getAdminDetails;
exports.getInventory = getInventory;
exports.addInventory = addInventory;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
console.log("================= controller admin===========");

async function getAdminDetails(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "adminCreds";
    const response = {
        "message": "Record Found",
        "status":  200,
        "data" :  {}
    };
    try{
        const result = await dbUtils.read(db_name, collection_name, data);
        if(result === "No record found"){
            response.message = result;
        }else{
            response.data = {id: result._id, email: result.email}
        }
        res.send((response));
    }catch(err){
        response.status = 400,
        response.message = "Technical Error"
        res.send(JSON.stringify(response));

    }
}


async function getInventory(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "inventory";
    const response = {
        "message": "Record Found",
        "status":  200,
        "data" :  data
    };
    console.log(req.body)
    try{
        const result = await dbUtils.readAll(db_name, collection_name, data);
        if(result === "No record found"){
            response.message = result;
        }else if (result == false){
            response.message = "Technical error";
        }else{
            response.data = result;
        }
        res.send((JSON.stringify(response)));
    }catch(err){
        response.status = 400,
        response.message = "Technical Error"
        res.send(JSON.stringify(response));

    }
}

async function addInventory(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "inventory";
    const response = {
        "message": "Item added succesfully",
        "status":  200,
        "data" :  {}
    };
    try{
        const exist = await dbUtils.read(db_name, collection_name, data);
        console.log("Hii there ",req.body);
        if(exist === "No record found"){
            console.log("Inside No record found ");
            const result = await dbUtils.insert(db_name, collection_name, data);
        }else{
            response.message = "Item already exist!";
            data = exist;
        }
        res.send((JSON.stringify(response)));
    }catch(err){
        response.status = 400,
        response.message = "Technical Error"
        res.send(JSON.stringify(response));
    }
}

async function updateInventory(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "inventory";
    const response = {
        "message": "Item updated succesfully",
        "status":  200,
        "data" :  {}
    };
    const query = {no: data.no}
    try{
        const exist = await dbUtils.read(db_name, collection_name, query);
        
        if(exist === "No record found"){
            response.message = "Item not exist!";
            data = exist;
        }else{
            const result = await dbUtils.update(db_name, collection_name, query, data);
            data = result;
        }
        res.send((JSON.stringify(response)));
    }catch(err){
        response.status = 400,
        response.message = "Technical Error"
        res.send(JSON.stringify(response));

    }
}

async function deleteInventory(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "inventory";
    const response = {
        "message": "Item deleted successfully",
        "status":  200,
        "data" :  {}
    };
    try{
        const result = await dbUtils.delete(db_name, collection_name, data);
        if(result === "NoTFound"){
            response.message = "No record Found, Unable to delete";
        }else if(result==true){
            response.data = result;
        }else{
            response.message = "Technical Error";
        }
        res.send((JSON.stringify(response)));
    }catch(err){
        response.status = 400,
        response.message = "Technical Error"
        res.send(JSON.stringify(response));

    }
}