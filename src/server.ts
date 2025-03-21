import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as z from "zod";

import path from "path";
const prisma = new PrismaClient()


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

const genreSchema = z.object({
  name: z.string().min(2, "Название должно быть не менее 2 символов"),
  description: z.string().min(5, "Описание должно быть не менее 5 символов"),
});

app.get("/", (req: Request ,res: Response) => {
    res.render("main")
})




app.get('/genres', async (req, res) => {
    try {
      const genres = await prisma.genre.findMany();
      res.json(genres);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch genre' });
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

  app.post("/genres", async (req, res) => {
    try {
      const parsedData = genreSchema.parse(req.body);
      const newGenre = await prisma.genre.create({ data: parsedData });
      res.status(201).json(newGenre);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors }); 
      }
      res.status(500).json({ error: "Ошибка при создании жанра" });
    }
  });

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
    console.log(`Listening on a port http://${HOST}:${PORT}`)
})

