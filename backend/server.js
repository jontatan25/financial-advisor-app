const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const data = require('./data.json');

// Configurar CORS
fastify.register(cors, { 
  origin: '*'
});

// Ruta para obtener todos los datos
fastify.get('/api/data', async (request, reply) => {
  reply.send(data);
});

// Iniciar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Servidor escuchando en http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
