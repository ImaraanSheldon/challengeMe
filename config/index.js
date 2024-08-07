import {createPool} from "mysql2";
import "dotenv/config"
// import { error } from "console"

// connection link
let connection = createPool({
    host: process.env.hostData,
    user: process.env.userData,
    password: process.env.passwordData,
    database: process.env.dataName,
    multipleStatements: true,
    connectionLimit: 30,
})
connection.on('connection', (pool)=>{
    if(!pool) throw new Error('Unable to connect < _ >')
})

// export
export{
    connection
}