//importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose();

// iniciar o bd
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;
 
db.serialize(() => {
  db.run(`DELETE FROM places WHERE id = ?`, [13], function(err) {
            if(err) {
                return console.log(err)
            }
    
            console.log("Registro deletado com sucesso ")
        })
 })