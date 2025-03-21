import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


import path from "path";
const prisma = new PrismaClient()

import filmRouter from "./FilmApp/filmRouter"
import genreRouter from "./GenreApp/genreRouter"

const HOST = 'localhost'
const PORT = 5000


const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.set("view engine", "ejs")

app.set("views", path.resolve(__dirname, "./templates"))
app.use("/static/", express.static(path.resolve(__dirname, "./static")))

// app.use("/film", filmRouter)
// app.use("/genre/", genreRouter)

app.get("/", (req: Request ,res: Response) => {
    res.render("main")
})




app.get('/genres', async (req, res) => {
    try {
      const genres = await prisma.genre.findMany();
      res.json(genres);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  })

  app.get('/genre/:id', async (req, res) => {
    try {
      const genre = await prisma.genre.findUnique({
        where: {
          id: Number(req.params.id)
        }
      })
      res.json(genre)
    } catch (err) {
      res.status(500).json({ error: 'Failed to find genre' });
    }
  })

  app.get('/films', async (req, res) => {
    try {
      const movies = await prisma.film.findMany();
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  })

  app.get('/film/:id', async (req, res) => {
    try {
      const film = await prisma.film.findUnique({
        where: {
          id: Number(req.params.id)
        }
      })
      res.json(film)
    } catch (err) {
      res.status(500).json({ error: 'Failed to find film' });
    }
  })


app.listen(PORT, HOST, () => {
  console.log(`🚀 Сервер запущен: http://${HOST}:${PORT}`);
});
