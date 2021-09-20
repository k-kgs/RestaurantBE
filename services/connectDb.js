const {MongoClient} = require('mongodb');
var config = require('../config/loginCreds.json');
//exports.initDb = connectToServer;
//exports.closeDb = module.closeDb;
//exports.getDb = module.getDb;
//exports.connectDatabase = connectDatabase;
exports.insertDb = insertDb;
exports.initDb = initDb;
exports.getsingleDetail = getsingleDetail;
exports.updateList = upsertListingByName;
user = config.databaseCreds.user;
password = config.databaseCreds.password;
//const uri = `mongodb+srv://${user}:${password}@cluster0.3qaok.mongodb.net/testDB?retryWrites=true&w=majority`
const uri= `mongodb://${user}:${password}@cluster0-shard-00-00.3qaok.mongodb.net:27017,cluster0-shard-00-01.3qaok.mongodb.net:27017,cluster0-shard-00-02.3qaok.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-f21tqu-shard-0&authSource=admin&retryWrites=true&w=majority`

const client = new MongoClient(uri);

async function initDb(){
    console.log(uri)
    
    try{
        result = await client.connect();
        //console.log(result);
        
        if(result){
            console.log("============================ Database connected =================")
            return client;
        }

    }
    catch(err){
        console.log("Error while connecting to database !");
    }
}

//initDb();
var _db;

// async function connectDatabase(){
//   console.log("============================ Database connection called  =================",uri);
//   const client = new MongoClient(uri);
//   result = await client.connect();
//   if(result){
//                 console.log("============================ Database connected =================")
//                 //return client;
//             }
// }

async function insertDb(obj){
  //db = this.getDb();
  //console.log("db ",db);
  response = await client.db("usertest").collection('userdetails').insertOne(obj);
  console.log(`New listing created with the following id: ${response.insertedId}`);
  
}

async function getsingleDetail(collection_name, query){
  res = await client.db("usertest").collection(`${collection_name}`).find(query).toArray();
  console.log(" result of find() => ",res);
  return res;
}


async function upsertListingByName(collection_name, nameOfListing, updatedListing) {
  const result = await client.db("usertest").collection(collection_name)
                      .updateOne({ name: nameOfListing },
                                 { $set: updatedListing },
                                 { upsert: true });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);

  if (result.upsertedCount > 0) {
      console.log(`One document was inserted with the id ${result.upsertedId._id}`);
  } else {
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}
//connectDatabase();















































// module.exports = {

//   connectToServer: async function( callback ) {
//     try{
//         await MongoClient.connect( uri,  { useNewUrlParser: true }, function( err, client ) {
//             _db  = client.db('testDB');
//             //return callback( err );
//           } );
//           console.log("============================ Database connected =================");
//         //   _db.collectionNames(function(err, collections){
//         //     console.log("collection names => ",collections);
//         // }); 
//     }catch(err){
//         console.log(err);
//     }
    
//   },

//   getDb: function() {
//       console.log("get db called ", _db)
//     return this._db;
//   },
//   closeDb: async function closeDb(){
    
//     await client.close();
//     console.log("================ Database connection closed ================");
//   },
//   insertDb: async function(obj){
//     db = this.getDb();
//     console.log("db ",db);
//     response = await this.client.db("testDB").collection('c1').insertOne(obj);
//     console.log(`New listing created with the following id: ${response.insertedId}`);
//   }
// };

