import https from 'https';
import { networkInterfaces } from 'os';
import { probeSite, localhostOnly, apiaddress } from '../config/config.json';

/**
 * Prioritizes the following IP addresses
 * LOCALHOST
 * PREDEFINED
 * FIRST OUTBOUND CONNECTION
 * 
 * Fails will default to localhost always
 * @returns IP address Promise
 */
export default async function getIPAddress(): Promise<string> {
	if (localhostOnly) {
		return "127.0.0.1";
	}

	if (apiaddress.length !== 0) { 
		let valid = false;
		const nets = networkInterfaces();//Checks if address exists in interfaces
		for (const netName in nets) {
			if (!valid) {
				const netInfo = nets[netName];
				if (netInfo)
					netInfo.forEach(n => {
						if (n.family === 'IPv4' && n.address === apiaddress.trim())
							valid = true;
					});
			}
		}
		return valid ? apiaddress : "127.0.0.1";
	}

	return await getSocketAddress();
}

/**
 * Promise wrapper for NodeJS https 
 * @returns localaddress of http call address - 127.0.0.1 on fail
 */
function getSocketAddress(): Promise<string> {
	return new Promise((resolve, reject) => {
		https.get(probeSite, (res) => {
			if (res.socket.localAddress)
				resolve(res.socket.localAddress);
		}).on('error', (e) => {
			console.log(e);
			resolve("127.0.0.1");
		});
	})
}