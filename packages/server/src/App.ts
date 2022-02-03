import express from 'express';
import path from 'path';

export class App {
  public express;

  constructor() {
    this.express = express();
    this.loadRoutes();
  }

  private loadRoutes(): void {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.sendFile(path.resolve(path.resolve(), 'static', './../../web/dist/index.html'));
      res.status(200);
    });

    router.get('/server', (req, res) => {
      res.json({ message: process.env.HELLO });
    });

    this.express.use('/', router);
    this.express.use(express.static('./../web/dist'));
  }
}
