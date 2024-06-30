const express = require('express')
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();



//Afficher tous les hotel
router.get('/', async (req, res, next) => {
    try {
        // Extraire les paramètres de requête
        const { min, max, limit, featured, ...others } = req.query;

        // Requête Prisma avec les filtres et la limite
        const hotels = await prisma.hotel.findMany({
            where: {
                // Appliquer les autres filtres
                ...others,
                ...(featured && { featured: featured === "true" }),                // Appliquer les filtres de prix
                cheapesPrice: {
                    gte: parseInt(min) || 1,
                    lte: parseInt(max) || 999,
                },

            },
            include: {
                rooms: {
                    include: {
                        roomNumbers: {}
                    }
                }
            },
            // Limiter le nombre de résultats
            take: limit ? parseInt(limit) : undefined,
        });

        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
});



//afficher les hotel compter par ville
router.get('/countByCity', async (req, res, next) => {
    const cities = req.query.cities.split(',')
    console.log(cities);

    try {
        const liste = await Promise.all(cities.map(async (city) => {
            const count = await prisma.hotel.count({ where: { city } })
            return count
        }))
        res.status(200).json(liste)
    } catch (error) {
        next(error)
    }

})

//Afficher les hotel par type
router.get('/countByType', async (req, res, next) => {

    try {
        const hotelCount = await prisma.hotel.count({ where: { type: "hotel" } })
        const villaCount = await prisma.hotel.count({ where: { type: "villa" } })
        const appartementCount = await prisma.hotel.count({ where: { type: "appartement" } })
        const studioCount = await prisma.hotel.count({ where: { type: "studio" } })
        const chateauxCount = await prisma.hotel.count({ where: { type: "chateaux" } })

        res.status(200).json([
            { type: "chateaux", count: chateauxCount },
            { type: "hotel", count: hotelCount },
            { type: "villa", count: villaCount },
            { type: "appartement", count: appartementCount },
            { type: "studio", count: studioCount },
        ])

    } catch (error) {
        next(error)
    }

})

//Afficher une hotel
router.get('/:id', async (req, res, next) => {
    const hotelId = req.params.id
    try {
        const existingHotel = await prisma.hotel.findFirst({
            where: { id: parseInt(hotelId) }, include: {
                rooms: {
                    include: {
                        roomNumbers: {

                        }
                    }
                }
            }
        })
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