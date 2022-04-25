let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mysql = require('mysql')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req, res)=>{
    return res.send({error:false,message:'Welcome'})
})

let dbCon = mysql.createConnection({
    host: "node31258-rattana.app.ruk-com.cloud",
    user: "root",
    password: "MVCtwielIv",
    database: "shop",
    port: "11243"
})
dbCon.connect()


app.get('/shops',(req, res)=>{
    dbCon.query("SELECT * FROM mn_user",(err, result)=>{
        if(err) throw err

        let message =""
        if(result === undefined || result.length == 0){
            message = "Shop is empty"
        }else{
            message = "Successfully"
        }
        return res.send({error:false,message:message,data:result})
    })
})

app.get('/shops/:id',(req, res) => {
    let id = req.params.id

    if(!id) return res.status(400).send({error:true,message:"ID not found"})
    else{
        dbCon.query("SELECT * FROM mn_user WHERE id = ?",[id],(err, result) => {
            if(err) throw err
            
            let message = ""
            if(result === undefined || result.length == 0) message = "Not found"
            else message = "Successfully"
            return res.send({error:false,message:message,data:result[0]})
        })
    }
})

app.post('/shops/create',(req, res)=>{
    let name = req.body.name
    let price = req.body.price

    if(!name || !price){
         return res.status(400).send({error:true,message:"name and price must be provided"})
    }else{
        dbCon.query("INSERT INTO mn_user (name,price) VALUES(?,?)",[name,price],(err, result)=>{
            if(err) throw err
            return res.send({error:false,message:"Successfully",data:result})
        })
    }
})

app.put('/shops',(req, res)=>{
    let id = req.body.id
    let name = req.body.name
    let price = req.body.price

    if(!id || !name || !price) return res.status(400).send({error:true,message:"Id not provided"})
    else{
        dbCon.query("UPDATE mn_user SET name=?,price=? WHERE id=?",[name,price,id],(err, result)=>{
            if(err) throw err
            
            let message = ""
            if(result.changesRows === 0){
                message = "Not UPDATE"
            }else{
                message = "UPDATE Successfully"
            }
            return res.status(400).send({error:false,message:message,data:result})
        })
    }
})

app.delete('/shops/DELETE',(req, res) =>{
    let id = req.body.id

    if(!id) return res.status(400).send({error:true,message:"ID not provided"})
    else{
        dbCon.query("DELETE FROM mn_user WHERE id=?",[id],(err, result) =>{
            if(err) throw err
            let message = ""
            if(result.affectedRows === 0) message = "Not DELETE"
            else message = "DELETE Successfully"
            return res.send({error:false,message:message,data:result})
        })
    }

})

app.get('/user',(req, res) =>{
    dbCon.query("SELECT * FROM mn_user",(err, result) =>{
        if(err) throw err
        
        let message = ""
        if(result === undefined || result.length == 0) message = "User  not found"
        else message = "Successfully"
        return res.send({error:false,message:message,data:result})
    })
})

app.post('/user/create',(req, res)=>{
    let name = req.body.name
    let password = req.body.password
    let email = req.body.email

    if(!name || !password || !email) return res.status(400).send({error:true,message:"name password and email must be provided"})
    else{
        dbCon.query("INSERT INTO mn_user (name,password,email) VALUES (?,?,?)",[name,password,email],(err, result)=>{
            if(err) throw err
            return res.send({error:false,message:"Successfully",data:result})
        })
    }
})

app.put('/user',(req, res)=>{
    let id = req.body.id
    let name = req.body.name
    let password = req.body.password
    let email = req.body.email

    if(!id || !name || !password || !email) return res.status(400).send({error:true,message:"Not found"})
    else{
        dbCon.query("UPDATE mn_user SET name = ?, password = ?, email = ? WHERE id = ?",[name,password,email,id],(err, result)=>{
            if(err) throw err
            let message = ""
            if(result.changesRows === 0) message = "Not UPDATE"
            else message = "Successfully"
            return res.send({error:false,message:message,data:result})
        })
    }
})

app.delete('/user/DELETE',(req, res)=>{
    let id = req.body.id

    if(!id) return res.status(400).send({error:true,message:"ID must be provided"})
    else {
        dbCon.query("DELETE FROM mn_user WHERE id = ?",[id],(err, result)=>{
            if(err) throw err
            message = ""
            if(result.affectedRows ===0) message = "Not DELETE"
            else message = "Successfully"
            return res.send({error:false,message:message,data:result})
        })
    }
})

app.get('/user/:id',(req, res)=>{
    let id = req.params.id

    if(!id) return res.status(400).send({error:true,message:"ID must be provided"})
    else{
        dbCon.query("SELECT * FROM mn_user WHERE id = ?",[id],(err, result)=>{
            if(err) throw err
            let message = ""
            if(result === undefined|| result.length ==0) message = "Not Found"
            else message = "Successfully"
            return res.send({error:false,message:message,data:result[0]})
        })
    }
})



app.listen(3000,()=>{console.log('listening on port')})

