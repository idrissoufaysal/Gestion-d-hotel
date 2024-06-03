const express = require('express')
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();


//Afficher tous les room
router.get('/', async (req, res, next) => {

    try {
        const rooms = await prisma.room.findMany({
            include: {
                roomNumbers: {
                    include: {
                        unavailableDates
                    }
                }
            }
        })
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
        const existingRoom = await prisma.room.findUnique({
            where: { id: parseInt(roomId) },
            include: {
                roomNumbers: {
                    include: {
                        unavailableDates
                    }
                }
            }
        })
        if (!existingRoom) {
            res.status(404).json("Room introuvable !!!")
        }

        res.status(200).json(existingRoom)

    } catch (error) {
        next(error)
    }
}
)

//Ajouter une chambre dans une hotels
router.post('/:id', async (req, res, next) => {
    const hotelId = req.params.id
    const { title, price, maxPeople } = req.body

    try {
        const newRoom = await prisma.room.create({
            data: {
                title, price, maxPeople, hotelId
            },
        })

        res.status(200).json(newRoom)

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
        await prisma.room.update({ where: { id: existingRoom.id }, data: { title, price, maxPeople, desc } })
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

// export const createRoom = async (req, res, next) => {
//     const hotelId = req.params.hotelid;
//     const newRoom = new Room(req.body);
//     try {
//         const savedRoom = await newRoom.save();
//         try {
//             await Hotel.findByIdAndUpdate(hotelId, {
//                 Spush: {rooms: savedRoom._id} }),

//     } catch (err ) {
//         next(err);
//     }
// } catch (err) {
//     next(err);
// }
//     };

module.exports = router