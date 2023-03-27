let express = require("express");
let bodyparser = require("body-parser");
let app = express();
let User = require("../models/User");
let fs = require("fs");



let router = express.Router();

router.post("/", (req,res)=>{
    let body = req.body;
    // console.log(body);
    let object = new User();
    object.name = body.name;

    let image = body.image;
    // console.log(image);
    // object.picpath = image
    if(image !== ""){
        let filename = (Math.random() + 1).toString(36).substring(3);      // generate random file name
        image = image.split(",").pop();
        fs.writeFileSync("public/users/" + filename + ".png", image,'base64')   // write file  in given path
        object.picpath = "users/" + filename + ".png";                      // assign to picpath
      
    }

    object.post().then(result=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch(err=>{
        res.end(JSON.stringify({status : "failed", data : err}))

    })
})

router.put("/:id", (req,res)=>{
    let body = req.body;
    // console.log(body);
    let object = new User();
    object.id = req.params.id ;
    object.name = body.name;
    let image = body.image;
    // console.log(image);
    // console.log(image.includes("png"));
    if(image.includes("png")){
        object.picpath = body.image
    }
   else if(image != ""){
        let filename = (Math.random() + 1).toString(36).substring(7);
        image = image.split(",").pop();
        fs.writeFileSync("public/users/"+ filename +".png", image, 'base64')
        object.picpath = "users/" + filename + ".png";
    }


    object.post().then(result=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch(err=>{
        res.end(JSON.stringify({status : "failed", data : err}))

    })
})

router.get("/", (req,res)=>{
    let object = new User();
    object.list().then(result=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch(err=>{
        res.end(JSON.stringify({status : "failed", data : err}))
    })
})

router.get("/:id", (req,res)=>{
    let object = new User();
    object.id = req.params.id;
    object.get().then(result=>{
        if(result.length > 0){
        res.end(JSON.stringify({status : "success", data : result[0]}))
        }
        else{
        res.end(JSON.stringify({status : "failed", data : "Record not found" }))

        }    
    }).catch(err=>{
        res.end(JSON.stringify({status : "failed", data : err}))
    })
})

router.delete("/:id", (req,res)=>{
    let object = new User();
    object.id = req.params.id;
    object.delete().then(result=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch(err=>{
        res.end(JSON.stringify({status : "failed", data : err}))
    })
})

module.exports = router ;