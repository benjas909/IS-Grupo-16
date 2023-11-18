import Client from "../models/Client.js";

export default class ClientController {
  async getAll(req, res) {
    const clients = await Client.findAll();
    res.send(clients);
  }

  async getByname(req, res) {
    const clients = await Client.findAll({
      where: {
        name: req.params.name,
      },
    });
    res.send(clients);
  }

  async get(req, res) {
    const client = await Client.findByPk(req.params.clientId);
    res.send(client);
  }

  async create(req, res) {
    const client = await Client.create({
      name: req.body.name,
      age: req.body.age,
    });
    res.send(client);
  }

  async update(req, res) {
    const client = await Client.findByPk(req.params.clientId);
    client.update({ name: req.body.name, age: req.body.age });
    res.send(user);
  }

  async delete(req, res) {
    await Client.destroy({ where: { id: req.params.clientId } });
    res.send({ status: "ok" });
  }
}
