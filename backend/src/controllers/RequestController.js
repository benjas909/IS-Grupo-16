import { where } from "sequelize";
import Request from "../models/request.js";

export default class RequestController {
  async getAll(req, res) {
    const requests = await Request.findAll();
    res.send(requests);
  }

  async getByRut(req, res) {
    const requests = await Request.findAll({
      where: {
        rutSolicitante: req.params.rutSolicitante,
      },
    });
    res.send(requests);
  }

  async getByExecID(req, res) {
    const requests = await Request.findAll({
      where: {
        id_ejecutivo: req.params.id_ejecutivo,
      },
    });
    res.send(requests);
  }

  async get(req, res) {
    const request = await Request.findByPk(req.params.requestId);
    res.send(request);
  }

  async create(req, res) {
    const request = await Request.create({
      rutSolicitante: req.body.rutSolicitante,
      tasa: req.body.tasa,
      valorUF: req.body.valorUF,
      plazo: req.body.plazo,
      cuota: req.body.cuota,
      total: req.body.total,
    });
    res.send(request);
  }

  async update(req, res) {
    const request = await Request.findByPk(req.params.requestId);
    request.update({
      tasa: req.body.tasa,
      plazo: req.body.plazo,
      cuota: req.body.cuota,
    });
    res.send(request);
  }

  async delete(req, res) {
    await Request.destroy({ where: { id: req.params.requestId } });
    res.send({ status: "ok" });
  }
}
