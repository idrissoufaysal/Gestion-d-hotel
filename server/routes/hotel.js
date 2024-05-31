const express = require('express')
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();



//Afficher tous les hotel
router.get('/', async (req, res, next) => {

    try {
        const hotels = await prisma.hotel.findMany()
        res.status(200).json(hotels)

    } catch (error) {
        next(error)
    }
}
)

//Afficher une hotel
router.get('/:id', async (req, res, next) => {
    const hotelId = req.params.id
    try {
        const existingHotel = await prisma.hotel.findFirst({ where: { id: parseInt(hotelId) } })
        if (!existingHotel) {
            res.status(404).json("hotel introuvable !!!")
        }
        res.status(200).json(existingHotel)
    } catch (error) {
        next(error)
    }
}
)

router.post('/', async (req, res, next) => {
    const { name, desc, title, distance, address, city, type, rating, featured, cheapesPrice } = req.body
    try {
        const newHotel = await prisma.hotel.create({ data: { name, desc, title, cheapesPrice, address, type, city, featured, rating, distance } })
        res.status(200).json(newHotel)
    } catch (error) {
        next(error)
    }
}
)


//mise a jour d'une hotel
router.put('/:id', async (req, res, next) => {
    const { name, desc, title, distance, address, city, type, rating, featured, cheapesPrice } = req.body
    const hotelId = req.params.id

    try {
        const existingHotel = await prisma.hotel.findFirst({ where: { id: parseInt(hotelId) } })
        if (!existingHotel) {
            res.status(400).json("hotel introuvable !!!")
        }

        await prisma.hotel.update({ where: { id: parseInt(hotelId) }, data: { name, desc, title, cheapesPrice, address, type, city, featured, rating, distance } })
            .then(response => { res.status(200).json('hotel mise a jour avec succes') })
    } catch (error) {
        next(error)
    }
}
)

//Supprimer une hotel
router.delete('/:id', async (req, res, next) => {
    const hotelId = req.params.id
    try {
        const existingHotel = await prisma.hotel.delete({ where: { id: parseInt(hotelId) } })
        if (!existingHotel) {
            res.status(404).json("hotel introuvable !!!")
        }

        res.status(200).json("hotel supprimer avec succes")
    } catch (error) {
        next(error)
    }
}
)

module.exports = router