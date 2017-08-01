// import utilities
import { newUrl, findUrl } from './mongo-utils';

module.exports = (app) => {

	app.get('/', (req, res) => {
		res.render('index');
	});

	app.get('/new/*', (req, res) => {
		newUrl(req, res);
	});

	app.get('/:short', (req, res, next) => {
		findUrl(req, res);
	});
}
