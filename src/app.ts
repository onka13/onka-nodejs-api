import compression from 'compression';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './api/routes/index';
import config from './config';
import { AddressInfo } from 'net';
import ServiceResult from './domain/business/serviceResult';
import ServiceResultCodes from './domain/business/serviceResultCodes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());

if (!config.isProduction) {
	// log all coming requests
	app.use(function(req: Request, res: Response, next: NextFunction) {
		console.log('request', req.url, req.method, req.body);
		next();
	});
}

// root page
app.get('/', function(req: Request, res: Response) {
	res.send('nodejs-ts-api-boilerplate');
});

/**
 * Register all routes in 'api/routes/*'
 * All routes is defined in 'api/routes/index.ts'. This file is a auto generated file. 
 * You do not need to update manually. Just run this command > yarn run fixRoutes.
 * 
 * Examples;
 * /mobile/device/register
 * /user/account/login
 * /wall/post/list
 */ 
for (const route in routes) {
	for (const subRoute in routes[route]) {
		app.use('/' + route + '/' + subRoute, routes[route][subRoute]);
	}
}

// Final error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
	console.log('Catch error', err);
	if (err instanceof ServiceResult) {
		return res.status(400).json(err);
	}
	res.status(500).json(ServiceResult.instance().errorResult(ServiceResultCodes.ServerError));
	//next();
});

// start server on defined port in config
const server = app.listen(config.port, function() {
	let address: AddressInfo = server.address() as AddressInfo;
	let host = address.address;
	let port = address.port;

	console.log('Running on http://%s:%s', host, port);
});
