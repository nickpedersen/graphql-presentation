import { Router } from "express";
import data from "./data.json";

const router = Router();

router.get("/team", (req, res) => {
  res.json(data.teams);
});

router.get("/team/:id", (req, res) => {
  const { id } = req.params;
  res.json(data.teams.find(t => t.id === Number(id)));
});

router.get("/team/:id/players", (req, res) => {
  const { id } = req.params;
  res.json(data.players.filter(p => p.teamId === Number(id)));
});

router.get("/player", (req, res) => {
  res.json(data.players);
});

router.get("/player/:id", (req, res) => {
  const { id } = req.params;
  res.json(data.players.find(p => p.id === Number(id)));
});

export default router;
