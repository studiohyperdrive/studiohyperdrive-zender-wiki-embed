import { createReadStream } from 'fs';
import { createServer } from 'http';

const server = createServer((req, res) => {
	res.writeHead(200, { 'content-type': 'text/html' });
	createReadStream('../index.html').pipe(res);
});

server.listen(3000);
