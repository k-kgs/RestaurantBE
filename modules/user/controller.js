const dbUtils = require('../../services/dbUtils');
const mailService = require('../../services/mailService');
exports.getItems = getItems;
exports.getUserDetail = getUserDetail;
exports.addUserDetail = addUserDetail;
exports.updateUserDetail = updateUserDetail;
exports.getResetLink = getResetLink;

async function getUserDetail(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "userCreds";
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

async function addUserDetail(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "userCreds";
    const response = {
        "message": "Registration succesfull",
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
            response.message = "User already exist!";
            response.data = {id: exist._id, email: exist.email};
        }
        res.send((JSON.stringify(response)));
    }catch(err){
        response.status = 400,
        response.message = "Technical Error"
        res.send(JSON.stringify(response));
    }
}


async function getItems(req, res){
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


async function updateUserDetail(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "userCreds";
    const response = {
        "message": "User Details updated succesfully",
        "status":  200,
        "data" :  {}
    };
    const query = {email: data.email}
    try{
        const exist = await dbUtils.read(db_name, collection_name, query);
        console.log("exist ",exist)
        if(exist === "No record found"){
            response.message = "User not exist!";
            response.data = exist;
        }else{
            console.log("In else block above catch ")
            const result = await dbUtils.update(db_name, collection_name, query, data);
            response.data = result;
        }
        res.send((JSON.stringify(response)));
    }catch(err){
        console.log("In catch block update creds")
        response.status = 400,
        response.message = "Technical Error"
        res.send(JSON.stringify(response));

    }
}

async function getResetLink(req, res){
    const data = req.body;
    db_name = "testAdmin";
    collection_name = "userCreds";
    const response = {
        "message": "Reset Link send",
        "status":  200,
        "data" :  {}
    };
    const query = {email: data.email}
    try{
        const exist = await dbUtils.read(db_name, collection_name, query);
        
        if(exist === "No record found"){
            response.message = "User not exist!";
            response.data = exist;
        }else{
            id = exist._id;
            email = exist.email;
            const link = generateLink(id);
            let result = await mailService.sendMail(email, link);
            console.log("result ",result)
            if(result){
                let data = {sent:true}
                response.data = data;
                res.send(JSON.stringify(response));
            }else{
                res.send(JSON.stringify(response));
            }
        }
    }catch(err){
        console.log(err);
        response.status = 400,
        response.message = "Technical Error"
        res.send(JSON.stringify(response));
    }
}

function generateLink(id){
    const FE_ENDPOINT = "testtocheck";
    const link = `${FE_ENDPOINT}/${id}`;
    return link;
}





