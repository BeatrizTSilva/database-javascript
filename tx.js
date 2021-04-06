/* transactions */
/* disadvantage is that you are connecting and disconnecting for every single request or execution */
const {DB} = require('./weird.js');
const {Client} = require('pg')

const client = new Client ({
    user: DB.username,
    host: DB.hostname,
    password: DB.database_password,
    port: 5432,
    database: DB.database_name
})

execute()

async function execute () {

    try{
        await client.connect()
        await client.query("BEGIN") /* begin the transaction */
        await client.query("INSERT into " + DB.schema + " VALUES ($1,$2, $3, $4, $5, $6, $7)", [6, 2, 3, 4, 5, 6, 7])
        console.log("Inserted a new row")
        await client.query("COMMIT")
    }
    catch(ex){
        console.log("Failed to execute " + ex) /* this */
        /* OR */
        console.log(`Failed to execute ${ex}`) /* this */
        await client.query("ROLLBACK")
    }
    finally{
        await client.end()
        console.log("Closed connection")
    }
}