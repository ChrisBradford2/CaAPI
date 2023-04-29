const http = require('http');
const importApp = require('./app');

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || `${process.env.SERVER_PORT}`);
importApp.set('port', port);

const errorHandler = (error: { syscall: string; code: any; }) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export const date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

const server = http.createServer(importApp);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  const boxWidth = bind.length + 25;
  // Dessiner la boîte supérieure
  console.log('+' + '-'.repeat(boxWidth - 2) + '+');
  console.log('|' + ' '.repeat(boxWidth - 2) + '|');
  // Dessiner le message avec le cadre gauche et droit
  console.log(`|    Listening on \x1b[1m${bind}\x1b[0m \u{1F680}   |`);
  console.log('|' + ' '.repeat(boxWidth - 2) + '|');
  // Dessiner la boîte inférieure
  console.log('+' + '-'.repeat(boxWidth - 2) + '+');
  console.log('\x1b[0m');
});

server.listen(port);
