import { fastify } from 'fastify';
import { join } from 'path';
import * as webpack from 'webpack';
import fastifyStatic from 'fastify-static';
import { configuration } from '../../webpack.config';
const clientLocalPath = '../client';
const distLocalPath = '../../dist';

const server = fastify({ logger: true });

server.register(fastifyStatic, {
    root: join(__dirname, distLocalPath, '/public'),
    prefix: '/public/'
});

server.get('/', async function (req, reply) {
    return reply.sendFile('index.html', join(__dirname, clientLocalPath));
});

webpack(configuration, (error, stats) => {
    if (error) {
        server.log.error(error);
    }
    server.listen(+process.env.PORT, '0.0.0.0', (error, address) => {
        if (error) {
            server.log.error(error);
            process.exit(1);
        }
        server.log.info(`server listening on ${address}`);
    });

});
