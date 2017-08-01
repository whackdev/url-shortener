const shortid = require('shortid');
const mongo = require('mongodb').MongoClient;
const uri =  process.env.URI || "mongodb://localhost:27017/url-shortener";
const validUrl = require('valid-url');

// Set characters for shortids
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

export function newUrl(req, res) {
	// Declare request variables
	let url = req.params[0];
	let host = req.get('host') + '/';

	// Connect to DB
	mongo.connect(uri, (err, db) => {
		if (err) {
			console.log(`Unable to connect to ${uri}`)
		} else {
			console.log(`Successfully connected to ${uri}`);
		}

		let collection = db.collection('links');
		
		let newLink = function (db, callback) {
			// Check for duplicates
			collection.findOne({"original_url": url}, (err, doc) => {
				if (doc != null) {
					res.json({ original_url: url, short_url: `${host}${doc.short_url}`});
				} else {
					// use valid-url to check link
					if (validUrl.isUri(url)) {
						// use shortid to create random short link
						let shortCode = shortid.generate();
						let newUrl = { original_url: url, short_url: shortCode };
						//save in DB for later use
						collection.insertOne(newUrl);
						res.json({ original_url: url, short_url: `${host}${shortCode}`});
					} else {
						res.json({ error: 'Incorrect URL format, please check protocol and URL for accuracy'});
					}
				}
			});	
		}
		
		newLink(db, () => {
			db.close();
		});
	});
}
 export function findUrl(req, res) {
	 let short = req.params.short;
	
	mongo.connect(uri, (err, db) => {
		if (err) {
			console.log(`Unable to connect to ${uri}`)
		} else {
			console.log(`Successfully connected to ${uri}`);
		}

		let collection = db.collection('links');
		
		let findLink = function (db, callback) {
			collection.findOne({"short_url": short}, (err, doc) => {
				if (doc != null) {
					res.redirect(doc.original_url);
				} else {
					res.json({ error: 'Shortlink not found'});
				}
			});
		}
		
		findLink(db, () => {
			db.close();
		});
	});
 }