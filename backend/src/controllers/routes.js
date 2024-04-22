import UserController from "./UserController.js";
import ClientController from "./ClientController.js";
import RequestController from "./RequestController.js";
// import DatosPersonalesController from './DPController.js';

export default (app) => {
  const userController = new UserController();
  const clientController = new ClientController();
  const requestController = new RequestController();
  // const datosPersonalesController = new DatosPersonalesController();

  app.get("/users", userController.getAll);
  app.post("/users/create", userController.create);
  app.get("/users/:userId", userController.get);
  app.put("/users/:userId", userController.update);
  app.delete("/users/:userId", userController.delete);

  app.post("/users/login", userController.login);

  app.get("/requests", requestController.getAll);
  app.post("/requests", requestController.create);
  // app.get("/requests", requestController.getByExecID);
  app.get("/requests/:requestId", requestController.get);
  app.put("/requests/:requestId", requestController.update);
  app.delete("/requests/:requestId", requestController.delete);

  app.get("/clients", clientController.getAll);
  app.post("/clients", clientController.create);
  app.get("/clients/:clientId", clientController.get);
  app.put("/clients/:clientId", clientController.update);
  app.delete("/clients/:clientId", clientController.delete);
  // app.post('/datos-personales', datosPersonalesController.create);
};
