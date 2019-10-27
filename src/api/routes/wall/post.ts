import express, { Request, Response, NextFunction } from 'express';
import casual from 'casual';
import middlewares from '../../middlewares';
import { requestHandlerWrapper } from '../../../business/helpers/apiHelper';
import ServiceResult from '../../../domain/business/serviceResult';
const router = express.Router();

// mock data for wall posts
casual.define('item', () => {
	var id = casual.integer(0, 1000);
	var id2 = casual.integer(0, 1000);
	return {
		id: casual.uuid,
		title: casual.title,
		body: casual.description,
		image: `https://picsum.photos/id/${id}/500/285.jpg`,
		user: {
			id: id2,
			name: casual.full_name,
			username: casual.username,
			avatar: `https://picsum.photos/id/${id2}/60/60.jpg`,
		},
	};
});
const items = [];

for (let i = 0; i < 100; i++) {
	// @ts-ignore
	items.push(casual.item);
}

router.use(middlewares.mobileToken, middlewares.authUser);

router.get(
	'/list',
	requestHandlerWrapper(async (req: Request, res: Response, next: NextFunction) => {
		const page = parseInt(req.query.page || '1');
		const limit = 20;
		const subItems = items.slice((page-1) * limit, page * limit - 1);
		console.log('wall list', (page-1) * limit, page * limit - 1);
		
		res.json(
			ServiceResult.instance().successResult({
				results: subItems,
				hasNextPage: page * limit < items.length,
			}),
		);
	}),
);

export default router;
