const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri= "mongodb://test1:connect1@cluster0-shard-00-00.3qaok.mongodb.net:27017,cluster0-shard-00-01.3qaok.mongodb.net:27017,cluster0-shard-00-02.3qaok.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-f21tqu-shard-0&authSource=admin&retryWrites=true&w=majority"
    //const uri = "mongodb+srv://test1:connect1@cluster0.3qaok.mongodb.net/usertest?retryWrites=true&w=majority";
              // mongodb+srv://test1:<password>@cluster0.3qaok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    //const uri = "mongodb+srv://test1:connect1@cluster0.3qaok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);