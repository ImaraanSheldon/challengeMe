import express, { response } from 'express'
import path from 'path'
import bodyParser from 'body-parser';
import { connection as dataB } from './config/index.js'

// making the express app
const app = express();
// display port
const port = process.env.PORT || 4000;
// declare router
const router = express.Router();

// middleware
app.use(router,
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended:true
    })
)

// endpoints
router.get('^/$|challengeMe', (req, res)=>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})

// All Users
router.get('/Users', (req, res)=>{
    const userQry = `SELECT userName, userSurname, userAge, userEmail, userPassword FROM Users`
    dataB.query(userQry, (err, results)=>{
        try{
            if(err) throw new Error('No Users Found!')
                res.json({
                    status:res.statusCode,
                    results
            })
        }
        catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    })
})
// Users based off ID
router.get('/users/:id', (req, res)=>{
    try{
        const userQry = `SELECT userName, userSurname, userAge, userEmail FROM Users WHERE userID = ?`

        dataB.query(userQry,[req.params.id], (err, result)=>{
            if(err) throw new Error('error')
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
        })
    }
    catch(e){
        res.json({
            status:404,
            msg: e.message
        })
    }
})

// All Products
router.get('/Products', (req, res)=>{
    const productsQry = `SELECT productName, productQuantity, productPrice, productURL FROM Products`
    dataB.query(productsQry, (err, results)=>{
        try{
            if(err) throw new Error('No Users Found!')
                res.json({
                    status:res.statusCode,
                    results
            })
        }
        catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    })
})

// Single Products
router.get('/Products/:id', (req, res)=>{
    const productsQry = `SELECT productName, productQuantity, productPrice, productURL FROM Products WHERE productID = ?;`
    dataB.query(productsQry,[req.params.id], (err, result)=>{
        try{
            if(err) throw new Error('No Products Found!')
                res.json({
                    status:res.statusCode,
                    result : result[0]
            })
        }
        catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    })
})
router.post('/users',bodyParser.json(), (req, res)=>{
    let data = req.body;
    let user = {
        userName: data.userName,
        userSurname: data.userSurname,
        userAge: data.userAge,
        userEmail: data.userEmail,
        userPassword: data.userPassword
      }
    dataB.query(`INSERT INTO Users SET ?;`, [user])
      res.json({
        status: 200,
        msg: 'sup gng'
      })
})
app.listen(port, ()=>{
    console.log(`Server on port: ${port}`)
})