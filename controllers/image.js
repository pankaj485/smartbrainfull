const Clarify = require('clarifai');

const app = new Clarifai.App({
	apiKey: '5086750f83aa458e831e1a70693cfa45',
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then((data) => {
		res.json(data);
	});
};

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('unable to get entries' + err));
};

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall,
};
