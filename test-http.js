const http = require('http');

// Teste 1: POST /users (Cadastro)
console.log('Testando POST /users...\n');

const postData = JSON.stringify({
  nome: 'Gustavo',
  email: 'gustavo@example.com',
  senha: 'senha123'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}\n`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
    console.log('\n Teste concluído!');
  });
});

req.on('error', (error) => {
  console.error(`Erro: ${error.message}`);
});

req.write(postData);
req.end();
