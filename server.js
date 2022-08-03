/*
	This file is used for ToolForge hosting.
*/

/* eslint-disable no-undef */
import { createReadStream } from 'fs';
import { createServer } from 'http';
import url from 'url';

const port = parseInt(process.env.PORT, 10) || 3000;

const server = createServer((req, res) => {
	let path = url.parse(req.url, true).pathname;
	// // '/folder/to/file/' becomes 'folder/to/file'
	path = path.replace(/^\/+|\/+$/g, '');

	if (path === 'src/my-element.ts') {
		res.writeHead(200, { 'content-type': 'application/javascript' });
		createReadStream('dist/zender-wikipedia-embed_web_lit_2022.js').pipe(res);
		return;
	}

	res.writeHead(200, { 'content-type': 'text/html' });
	createReadStream('index.html').pipe(res);
});

server.listen(port, () => console.log(`Wiki embed app listening at port ${port}`));