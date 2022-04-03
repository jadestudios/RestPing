import Hapi from '@hapi/hapi';
import Hoek from '@hapi/hoek';
import ping from 'ping';
import getIPAddress from './util/ip';
import { apiport } from './config/config.json';

const init = async () => {

	const server = Hapi.server({
		port: apiport,
		host: await getIPAddress()
	});

	server.route({
		method: 'GET',
		path: '/ping/{ip}',
		handler: async function (request, h) {
			const res = await ping.promise.probe(Hoek.escapeHtml(request.params.ip));			
			console.log(`Pinged: ${res.host} with ms: ${res.avg}`);
			return h.response(res);
		}
	});

	await server.start();
	console.log('REST-ping running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();