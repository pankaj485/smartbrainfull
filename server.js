const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: 'postgresql-perpendicular-56429',
		ssl: true,
	},
});

/* console.log(
	db
		.select('*')
		.from('users')
		.then((data) => {
			console.log(data);
		})
);
 */

/* app.get('/', (req, res) => {
	// res.send(database.users);
	db.select('*')
		.from('users')
		.then((data) => {
			res.json(data);
		});
});
 */

app.get('/', (req, res) => {
	res.send('working');
});

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

// const DATABASE_URL = process.env.DATABASE_URL;
// const PORT = process.env.PORT;
// const PORT = 'hello';

app.listen(process.env.PORT || 3001, () => {
	console.log(`server listening on port ${process.env.PORT}`);
});
