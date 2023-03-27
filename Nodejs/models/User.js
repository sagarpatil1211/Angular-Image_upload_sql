const { resolve } = require("path");
let Database = require("./Database")
class User {
    constructor() {
        this.id = 0;
        this.name = "";
        this.picpath = "";
        this.db = new Database();
        this.sql = "";

    }

    post = ()=>{
        if(this.id == 0){
            this.sql = `INSERT INTO admission( name, picpath) VALUES ('${this.name.replace(/'/g, "''")}','${this.picpath}')`;
        }
        else{
            this.sql = `UPDATE admission SET name='${this.name.replace(/'/g, "''")}',picpath='${this.picpath}' WHERE id =${this.id};`
        }
        return new Promise((resolve,reject)=>{
            this.db.query(this.sql).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    list(){
        this.sql = `SELECT * FROM admission`
        return new Promise((resolve,reject)=>{
            this.db.query(this.sql).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    get(){
        this.sql = `SELECT * FROM admission WHERE id = ${this.id}`
        return new Promise((resolve,reject)=>{
            this.db.query(this.sql).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    
    delete(){
        this.sql = `DELETE FROM admission WHERE  id = ${this.id}`
        return new Promise((resolve,reject)=>{
            this.db.query(this.sql).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    



}

module.exports = User;