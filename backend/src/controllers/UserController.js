import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export default class UserController {
	 async getAll(req, res) {
		const users = await User.findAll();
		res.send(users);
	}

	async getBynombre(req, res) {
		const users = await User.findAll({
			where: {
				nombre: req.params.nombre
			}
		});
		res.send(users);
	}

	async get(req, res) {
		const user = await User.findByPk(req.params.userId);
		res.send(user);
	}

	async create(req, res) {
		console.log(req.body);
		const salt = await bcrypt.genSalt(10);
		const hashpass = await bcrypt.hash(req.body.password, salt)
		const user = await User.create({
			nombre: req.body.nombre,
			email: req.body.email,
			password: hashpass,
			permissions: 'user',
		});
		res.send(user);
	}

	async update(req, res) {
		const user = await User.findByPk(req.params.userId);
		user.update({nombre: req.body.nombre, email: req.body.email});
		res.send(user);
	}

	async delete(req, res) {
		await User.destroy({where: {id: req.params.userId}});
		res.send({status: "ok"});
	}

	async login(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({
		  where: {
			email: email,
		  },
		});

		if (!user) {
		  return res.status(401).send({ error: 'Usuario o contraseña incorrecta' });
		}
	
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
		  return res.status(401).send({ error: 'Usuario o contraseña incorrecta' });
		}
	
		const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);

		return res.status(200).send({ token: token }); // cambiar esto.

	}
	


};


