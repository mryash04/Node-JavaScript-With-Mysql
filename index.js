const express = require("express");
const mysql = require("mysql");

const app = express();

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodemysql'
});

db.connect( (err) =>{
    if(err)
        throw err;
        console.log("mysql connected");
} );

app.get("/", (req, res) =>{
    res.send("This is for about page side");
});

app.get("/createdb", (req, res) =>{
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err, result) =>{
        if(err){
            throw err;
        }
        else{
            console.log(result);
            res.send("database created");
        }
    });
});

app.get("/createpoststable", (req, res) =>{
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send("posts table created");
    });
});

app.get("/insertdatapostone", (req, res) =>{
    let post = {title:'Insert post one', body:'This is post one inserted into the table'};
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send("Data one post is inserted into the table posts");
    });
});

app.get("/insertdataposttwo", (req, res) =>{
    let post = {title:'Insert post two', body:'This is post two inserted into the table'};
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send("Data two post is inserted into the table posts");
    });
});

app.get("/geteveryposts", (req, res) =>{
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send("posts is fetched");
    });
});

app.get("/selectedpost/:id", (req, res) =>{
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{ 
        if(err) throw err;
        console.log(result);
        res.send("post fetched");
    });
});

app.get("/updatepost/:id", (req, res) =>{
    let newTitle = "Update title";
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{ 
        if(err) throw err;
        console.log(result);
        res.send("Post updated");
    });
});

app.get("/deletepost/:id", (req, res) =>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{ 
        if(err) throw err;
        console.log(result);
        res.send("Post deleted");
    });
});

app.listen(8000, () =>{
    console.log("This is listening port");
})