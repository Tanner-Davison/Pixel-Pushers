const { MongoClient, ServerApiVersion } = require('mongodb');
const {MONGO_AUTH} = process.env;
const uri = "mongodb+srv://tannerdavison95:Luliann465$@pixelpushers.fwax35m.mongodb.net/?retryWrites=true&w=majority&appName=PixelPushers";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
   
    console.log("Connected to MongoDB!");  
    return client; 
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error; 
  } finally {
    
    // await client.close();
  }
}

module.exports = {
  connectToDatabase 
};