import { fastify } from 'fastify';
import { join } from 'path';
import 'fastify-static';
const clientLocalPath = '../client'

const server = fastify({ logger: true });

server.register(require('fastify-static'), {
    root: join(__dirname, clientLocalPath, '/public'),
    prefix: '/public/'
});

server.get('/', function (req, reply) {
    console.log('HEREEE');
    return reply.sendFile('index.html', join(__dirname, clientLocalPath));
} as any);

server.listen(3000, (error, address) => {
    if (error) {
        server.log.error(error);
        process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
});