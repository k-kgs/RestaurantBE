const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://test1:connect1@cluster0.3qaok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function connectTo(uri){
    const client = new MongoClient(uri);
    await client.connect();
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);

        // await multipleUserEntry(client, [
        //     {
        //         name: "kgs",
        //         role: "admin",
        //         code: 512
        //     },
        //     {
        //         name: "kumar",
        //         role: "user",
        //         code: 513
        //     },
        //     {
        //         name: "gaurav",
        //         role: "user",
        //         code: 514
        //     },
        // ]);

        await showUser(client, {name:"kgs"});
       const rest =  await client.db("usertest").collection("userdetails").findOne({name: "kgs"}, function(err, document) {
            console.log(document.name);
          }).toArray();
        console.log("******************* rest ***************",rest)
    } catch (e) {
        console.log("********************* timeout***********")
        console.error(e);
    } finally {
        await client.close();
    }
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function multipleUserEntry(client, listOfUser){
    const result = await client.db("usertest").collection("userdetails").insertMany(listOfUser);
    //                   client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    if(result){
        console.log(`${result.insertedCount} new details are created with the following id(s):`);
        console.log(result.insertedIds);
    }

}

async function showUser(client, query){
    const result = await client.db("usertest").collection("userdetails").find(query);
    //                   client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    if(result){
        console.log(` Result : ${result}`); //new details are created with the following id(s):`);
        console.log(query);
    }

}

connectTo(uri);
