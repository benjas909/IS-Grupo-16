import UserController from './UserController.js';
// import DatosPersonalesController from './DPController.js';



export default (app) => {
	const userController = new UserController();
	// const datosPersonalesController = new DatosPersonalesController();



	app.get('/users', userController.getAll);
	app.post('/users', userController.create);
	app.get('/users/:userId', userController.get);
	app.put('/users/:userId', userController.update);
	app.delete('/users/:userId', userController.delete);



	// app.post('/datos-personales', datosPersonalesController.create);
};