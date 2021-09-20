const {MongoClient} = require('mongodb');
var config = require('../config/loginCreds.json');

user = config.databaseCreds.user;
password = config.databaseCreds.password;
const uri= `mongodb://${user}:${password}@cluster0-shard-00-00.3qaok.mongodb.net:27017,cluster0-shard-00-01.3qaok.mongodb.net:27017,cluster0-shard-00-02.3qaok.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-f21tqu-shard-0&authSource=admin&retryWrites=true&w=majority`
const client = new MongoClient(uri);

exports.initializeDb = initializeDb;
exports.insert = insert;
exports.read = read;
exports.readAll = readAll;
exports.update = update;
exports.delete = erase;

async function initializeDb(){
    console.log("********************** initiating connection  ********************")
    try{
        await client.connect();
        console.log("========================= Databse Connected =======================");
    }catch(err){
        console.log("Error while connecting to database ",err);
    }
}

//initializeDb();

async function insert(db_name, collection_name, obj){
    try{
        const insertResponse = await client.db(db_name).collection(collection_name).insertOne(obj);
        console.log(`Data of is inserted with the following id: ${insertResponse.insertedId}`);
        return true;
    }catch(err){
        console.log(`Error while Inserting data ${obj} and error message is ${err}`);
        //return false;
    }
}

// insert("usertest", 'userdetails', {name: "new db cruds testing 0", summary: "A better way to deal", operation: 5});


async function read(db_name, collection_name, obj){
    try{
        const readResponse = await client.db(db_name).collection(collection_name).findOne(obj);
        if(readResponse){
            console.log(`Record Found ${readResponse}`);
            return readResponse;
        }else{
            console.log(`No Record Found`);
            return "No record found";
        }
    }catch(err){
        console.log(`Faced error while fetching details for ${obj} and error is ${err}`);
        //return false;
    }
}
// read("usertest", 'userdetails', {name: "new db cruds testing 0"});
async function readAll(db_name, collection_name, obj){
    try{
        const readResponse = await client.db(db_name).collection(collection_name).find(obj).toArray();
        if(readResponse){
            //console.log(`Record Found ${readResponse}`);
            return readResponse;
        }else{
            console.log(`No Record Found`);
            return "No record found";
        }
    }catch(err){
        console.log(`Faced error while fetching details and error is ${err}`);
        return false;
    }
}

async function update(db_name, collection_name, obj, new_obj){
    try{
        const updateResponse = await client.db(db_name).collection(collection_name).updateOne(obj, {$set: new_obj});
        console.log(`${updateResponse.matchedCount} document matched the query criteria.`);
        console.log(`${updateResponse.modifiedCount} document was/were updated Successfully.`);
        return true;
    }catch(err){
        console.log(`Error while updating and the error is ${err}`);
        return false;
    }
}
// update("usertest", 'userdetails', {name: "new db cruds testing 0"}, {operation: 7});

async function erase(db_name, collection_name, obj){
    try{
        const deleteResponse = await client.db(db_name).collection(collection_name).deleteOne(obj);
        if((deleteResponse.deletedCount)){
            console.log(` !!!!!!!!!!!!! Deleted Successfully !!!!!!!!!!!!!!!! ${deleteResponse.deletedCount}`);
            return true;
        }else{
            console.log(`No record found `);
            return "NotFound";
        }
        
    }catch(err){
        console.log(`Error while deleting`);
        return false;
    }
    
}
async function call(){
    //await insert("usertest", 'userdetails', {name: "new db cruds testing 0", summary: "A better way to deal", operation: 5});
    await read("usertest", 'userdetails', {name: "new db cruds testing 0"});
    await update("usertest", 'userdetails', {name: "new db cruds testing 0"}, {operation: 7});
    erase("usertest", 'userdetails', {name: "new db cruds testing 0"});
}
//call();