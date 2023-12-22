// const express = require('express');
// const server = express();
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const mysql = require('mysql');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const usuarios = [];

// // Chave secreta para assinar e verificar o token
// const chaveSecreta = '123456789';

// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());

// // Middleware de autenticação com token
// function authenticateToken(req, res, next) {
//   const token = req.headers.authorization;

//   if (token) {
//     jwt.verify(token, chaveSecreta, (err, decodedToken) => {
//       if (err) {
//         res.status(403).json({ error: 'Token inválido' }, err);
//       } else {
//         req.user = decodedToken;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ error: 'Token não fornecido' }, err);
//   }
// }

// // Rota de autenticação para gerar o token
// server.get('/login/:login/:pass', (req, res) => {
//   // Conecte-se ao banco de dados MySQL
//   const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'node_mysql_crud_db'
//   });


//   const query = 'SELECT * FROM login';

//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error('Erro ao executar a consulta:', err);
//       connection.end();
//       return;
//     }

//     console.log ($results);


//     // Converte os resultados em uma string JSON
//     const jsonString = JSON.stringify(results);
//     const nomeArquivo = 'login.json';
//     // Grava a string JSON em um arquivo
//     fs.writeFile(nomeArquivo, jsonString, 'utf8', (err) => {
//       if (err) {
//         console.error('Erro ao gravar o arquivo:', err);
//       }
//     });

//     connection.end(); // Encerra a conexão com o banco de dados
//   });

//   const jsonString = fs.readFileSync('./login.json', 'utf8');
//   const jsonData = JSON.parse(jsonString);

//   // const usuario = jsonData.find(user => req.params.login === user.login && req.params.pass === user.pass);

//   // Verifique se jsonData é um array antes de usar find
//   if (Array.isArray(jsonData)) {
//       const foundItem = jsonData.find(item => /* sua condição de busca */);
//       // Restante do código
//   } else {
//       console.error('jsonData não é um array.');
//   }

// if (usuario) {
//     const payload = { usuario: usuario };
//     // Gere o token com base no payload e na chave secreta
//     const token = jwt.sign(payload, chaveSecreta);
//     res.json({ token: token });
//     console.log('Token enviado');
//   } else {
//     // Bloco de captura de exceção
//     res.status(401).json({ error: 'Credenciais inválidas' });
//     console.log('Request inválido');
//   }
// });

// //Teste de autenticação com Token
// server.get('/usuarios/teste', authenticateToken, (req, res) => {
//   res.json({ message: 'Token correto! Sucesso!' });
// });

// //fazendo o get protegido
// server.get('/usuarios/', authenticateToken, (req, res) => {
//   const index = usuarios.findIndex(user => user.id === ~~req.params.id);
//   const usuario = req.body;
//   usuarios.splice(index, 1, usuario);
//   const id = usuario["id"];
//   const email = usuario["login"];
//   console.log(id);
//   console.log(email);
//   // Conecte-se ao banco de dados MySQL
//   const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '0220',
//     database: 'node_mysql_crud_db'
//   });

//   // enviando para o BD
//   connection.query("SELECT id, login, data_criacao, data_modificacao FROM login WHERE id=" + id, (err, results) => {
//     const jsonString = JSON.stringify(results);
//     const jsonArray = JSON.parse(jsonString);

//     if (err) {
//       res.send("Erro: ", err['sqlMessage']);
//       console.log("Erro: ", err);
//       return;
//     } else if (jsonArray[0].login == email) {
//       res.json(results);
//       return;
//     } else {
//       res.send("Usuário não encontrado");
//     }
//     connection.end(); // Encerre a conexão com o banco de dados

//   });
// });

// // criando o post protegido
// server.post('/usuarios', authenticateToken, (req, res) => {
//   const usuario = req.body;
//   const senha = usuario.pass;

//   // Gerar um salt para a criptografia
//   const saltRounds = 10;
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     // Criptografar a senha com o salt gerado
//     bcrypt.hash(senha, salt, (err, hash) => {
//       if (err) {
//         console.error('Erro ao criptografar a senha:', err);
//         res.status(500).json({ error: 'Erro interno' });
//         return;
//       }

//       // Substituir a senha em texto claro pelo hash criptografado
//       usuario.pass = hash;

//       usuarios.push(usuario);

//       const jsonData = JSON.stringify(usuario);
//       const nomeArquivo = 'login.json';
//       // escreve no json
//       fs.writeFile(nomeArquivo, jsonData, (err) => {
//         if (err) {
//           console.error('Erro ao escrever no arquivo:', err);
//           res.status(500).json({ error: 'Erro interno' });
//           return;
//         }
//         console.log('Arquivo JSON gravado com sucesso!');
//       });

//       // enviando para o BD
//       fs.readFile(nomeArquivo, 'utf8', (err, jsonString) => {
//         if (err) {
//           console.error('Erro ao ler o arquivo:', err);
//           res.status(500).json({ error: 'Erro interno' });
//           return;
//         }

//         // Converta a string JSON em um objeto JavaScript
//         const jsonData = JSON.parse(jsonString);

//         // Conecte-se ao banco de dados MySQL
//         const connection = mysql.createConnection({
//           host: 'localhost',
//           user: 'root',
//           password: '0220',
//           database: 'node_mysql_crud_db'
//         });

//         // enviando para o BD
//         connection.query('INSERT INTO login SET ?', jsonData, (err, results) => {
//           if (err) {
//             res.send("Erro: ", err['sqlMessage']);
//             console.log("Erro: ", err);
//           } else {
//             res.send("OK");
//             console.log("OK");
//           }

//           connection.end(); // Encerre a conexão com o banco de dados
//         });
//       });
//     });
//   });
// });

// //fazendo o put
// server.put('/usuarios/:email', (req, res) => {
//   const index = usuarios.findIndex(user => user.email === req.params.email);
//   const usuario = req.body;
//   usuarios.splice(index, 1, usuario);

//   const jsonData = JSON.stringify(usuario);
//   const nomeArquivo = 'login.json';
//   // escreve no json
//   fs.writeFile(nomeArquivo, jsonData, (err) => {
//     if (err) {
//       console.error('Erro ao escrever no arquivo:', err);
//       res.status(500).json({ error: 'Erro interno' });
//       return;
//     }
//     console.log('Arquivo JSON gravado com sucesso!');
//   });

//   // enviando para o BD
//   fs.readFile(nomeArquivo, 'utf8', (err, jsonString) => {
//     if (err) {
//       console.error('Erro ao ler o arquivo:', err);
//       res.status(500).json({ error: 'Erro interno' });
//       return;
//     }

//     // Converta a string JSON em um objeto JavaScript
//     const jsonData = JSON.parse(jsonString);

//     // Conecte-se ao banco de dados MySQL
//     const connection = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: '0220',
//       database: 'node_mysql_crud_db'
//     });
//     // enviando para o BD
//     connection.query("UPDATE login SET login = '" + jsonData["login"] + "', pass = '" + jsonData["pass"] + "' WHERE id = '" + jsonData['id'] + "'", (err, results) => {
//       if (err) {
//         res.send("Erro: ", err['sqlMessage']);
//         console.log("Erro: ", err);
//       } else {
//         res.send("OK");
//         console.log("OK");
//       }

//       connection.end(); // Encerre a conexão com o banco de dados
//     });
//   });
// });


// //fazendo o delete
// server.delete('/usuarios/:id', (req, res) => {
//   const index = usuarios.findIndex(user => user.id === ~~req.params.id);
//   const usuario = req.body;
//   usuarios.splice(index, 1);

//   const jsonData = JSON.stringify(usuario);
//   const nomeArquivo = 'login.json';
//   // escreve no json
//   fs.writeFile(nomeArquivo, jsonData, (err) => {
//     if (err) {
//       console.error('Erro ao escrever no arquivo:', err);
//       res.status(500).json({ error: 'Erro interno' });
//       return;
//     }
//     console.log('Arquivo JSON gravado com sucesso!');
//   });

//   // enviando para o BD
//   fs.readFile(nomeArquivo, 'utf8', (err, jsonString) => {
//     if (err) {
//       console.error('Erro ao ler o arquivo:', err);
//       res.status(500).json({ error: 'Erro interno' });
//       return;
//     }

//     // Converta a string JSON em um objeto JavaScript
//     const jsonData = JSON.parse(jsonString);

//     // Conecte-se ao banco de dados MySQL
//     const connection = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: '0220',
//       database: 'node_mysql_crud_db'
//     });
//     // enviando para o BD
//     connection.query("DELETE FROM login WHERE id = '" + jsonData['id'] + "'", (err, results) => {
//       if (err) {
//         res.send("Erro: ", err['sqlMessage']);
//         console.log("Erro: ", err);
//       } else {
//         res.send("OK");
//         console.log("OK");
//       }
//       connection.end(); // Encerre a conexão com o banco de dados
//     });
//   });
// });


// server.listen(3000, () => {
//   console.log('Example app listening on port', 3000)
// });







const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usuarios = [];
const chaveSecreta = '123456789';

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, chaveSecreta, (err, decodedToken) => {
      if (err) {
        res.status(403).json({ error: 'Token inválido' }, err);
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Token não fornecido' }, err);
  }
}

server.get('/login/:login/:pass', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_mysql_crud_db'
  });

  const query = 'SELECT * FROM login';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      connection.end();
      return;
    }

    const jsonString = JSON.stringify(results);
    const nomeArquivo = 'login.json';

    fs.writeFile(nomeArquivo, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Erro ao gravar o arquivo:', err);
      }

      const jsonStringLido = fs.readFileSync(nomeArquivo, 'utf8');
      const jsonData = JSON.parse(jsonStringLido);

      if (Array.isArray(jsonData)) {
        const usuario = jsonData.find(user => req.params.login === user.login && req.params.pass === user.pass);

        if (usuario) {
          const payload = { usuario: usuario };
          const token = jwt.sign(payload, chaveSecreta);
          res.json({ token: token });
          console.log('Token enviado');
        } else {
          res.status(401).json({ error: 'Credenciais inválidas' });
          console.log('Request inválido');
        }
      } else {
        console.error('jsonData não é um array.');
      }
    });
  });
});

// Restante do seu código...

server.listen(3000, () => {
  console.log('Example app listening on port', 3000);
});
