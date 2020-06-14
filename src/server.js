const express = require('express');
const server = express();

const db = require('./database/db');

// configurar pasta public
server.use(express.static('public'))

server.use(express.urlencoded({extended: true}));

//configurar template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

// 1 -> página inicial
server.get('/', (req, res) => {
  return res.render("index.html");
});

// 2 -> criar ponto de coleta
server.get('/create-point', (req, res) => {
  // req.query();

  return res.render("create-point.html");
});

server.post('/save-point', (req, res) => {
  //inserir dados no banco de dados
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ];

  function afterInsertData(err){
    if(err){
      console.log(err);
      return res.send("Erro no cadastro!");
    }
    
    return res.render('create-point.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

// 3 -> pesquisar ponto de coleta
server.get('/search', (req, res) => {

  const search = req.query.search;

  if(search == ""){
    return res.render('search-results.html', { total: 0});
  }


  //pegar bancos de dados.
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err){
      return console.log(err);
    }

    const total = rows.length;
    //mostrar pg html com dados do bd
    console.log(total);
    return res.render("search-results.html", { places: rows, total });
  });
});

//ligar o servidor
server.listen(3000);

