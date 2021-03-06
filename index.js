/* initialize the project */
const {DB} = require('./weird.js'); /* file for database parameters */
/* connect to the database you need to create a client object that will allow the connection to the database */
const {Client} = require('pg'); /* will require the library Client */
/* OR cont {Client} = require('pg'); */

/* create a client instance */
const client = new Client({ /* we need to send a json object */
    user: DB.username,
    host: DB.hostname,
    password: DB.database_password,
    port: 5432,
    database: DB.database_name
});


/* sync process */
client.connect()
.then(() => console.log("Connected Successfully"))
.then(() => client.query("SELECT * FROM " + DB.schema))
//.then(() => client.query("SELECT * FROM " + DB.schema + " WHERE t = $1", ['1'])) /* print the entire table -> async call  || using $1 will avoid an SQL injection -> [] refers to $1 */
.then(results => console.table(results.rows)) /* client.query will ouput a result that will be handled by "results" */
.catch(e => console.log(e))
.finally(() => client.end()) /* you always have to close the connection */