const express = require('express')
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();



//Afficher tous les hotel
router.get('/', async (req, res, next) => {

    res.send('all hotel')
    try {
        const hotels = prisma.hotel.findMany()
        res.status(200).json(hotels)

    } catch (error) {
        next(error)
    }
}
)

//Afficher une hotel
router.get('/:id', async (req, res) => {
    const hotelId = req.params.id
    try {
        const existingHotel = await prisma.hotel.findUnique({ where: { id: hotelId } })
        if (!existingHotel) {
            res.status(404).json("hotel introuvable !!!")
        }
        res.status(200).json(existingHotel)
    } catch (error) {
        next(error)
    }
}
)

//mise a jour d'une hotel
router.put('/:id', async (req, res) => {
    const hotelId = req.params.id

    try {

    } catch (error) {
        next(error)
    }
}
)

//Supprimer une hotel
router.delete('/:id', async (req, res) => {
    const hotelId = req.params.id
    try {
        const existingHotel=await prisma.hotel.delete({where:{id:hotelId}})
        if(!existingHotel){
            res.status(404).json("hotel introuvable !!!")
        }
        res.status(200).json("hotel supprimer avec succes")
    } catch (error) {
        next(error)
    }
}
)

module.exports = router