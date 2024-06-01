const { MongoClient, ServerApiVersion } = require('mongodb');

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
    // ... (Your database operations)
    console.log("Connected to MongoDB!"); 
    return client; // Return the client object
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error; // Re-throw the error so it's handled by the calling function
  } finally {
    // Close the connection when done
    // await client.close();
  }
}

module.exports = {
  connectToDatabase 
};