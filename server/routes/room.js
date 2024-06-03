const express = require('express')
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();


//Afficher tous les room
router.get('/', async (req, res, next) => {

    try {
        const rooms = await prisma.room.findMany()
        rooms.length == 0 ? res.json("c'est carement vide") : res.status(200).json(rooms)

    } catch (error) { 
        next(error)
    }
}
)

//Afficher une room
router.get('/:id', async (req, res, next) => {
    const roomId = req.params.id
    try {
        const existingRoom = await prisma.room.findUnique({ where: { id: parseInt(roomId) } })
        if (!existingRoom) {
            res.status(404).json("room introuvable !!!")
        }

        res.status(200).json(existingRoom)

    } catch (error) {
        next(error)
    }
}
)

//mise a jour d'une room
router.put('/:id', async (req, res, next) => {
    const roomId = req.params.id
    const { title, price, maxPeople, desc } = req.body
    try {
        const existingRoom = await prisma.room.findFirst({ where: { id: parseInt(roomId) } })
        if (!existingRoom) {
            res.status(404).json("Room introuvable !!!")
        }
        await prisma.room.update({ where: existingRoom.id, data: { title, price, maxPeople, desc } })
    } catch (error) {
        next(error)
    }
}
)

//Supprimer une room
router.delete('/:id', async (req, res, next) => {
    const roomId = req.params.id
    try {
        const existingRoom = await prisma.room.findUnique({ where: { id: parseInt(roomId) } })
        if (!existingRoom) {
            res.status(404).json("room introuvable !!!")
        }
        await prisma.room.delete({ where: { id: existingRoom.id } })
            .then(response => {
                res.status(200).json("room deleted successfully")
            })
    } catch (error) {
        next(error)
    }
}
)

module.exports = router