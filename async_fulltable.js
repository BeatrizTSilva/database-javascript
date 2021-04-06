const {DB} = require('./weird.js');
const {Client} = require('pg'); /* will require the library Client */

const client = new Client({ /* we need to send a json object */
    user: DB.username,
    host: DB.hostname,
    password: DB.database_password,
    port: 5432,
    database: DB.database_name
})

execute()

async function execute (){ /* it will pause before going to the next method */
    try{
        await client.connect() /* returns a promise */
        console.log("Connected Successfully")
        const results = await client.query("SELECT * FROM " + DB.schema) /* you need to use await so that it doesnt execute automatically */
        console.table(results.rows)
    }
    catch (ex){
        console.log(`Something wrong happened ${ex}`)
    }
    finally{
        await client.end()
        console.log("Client disconnected successfully")
    }
}