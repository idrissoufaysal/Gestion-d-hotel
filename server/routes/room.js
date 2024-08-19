const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//Afficher tous les room
router.get("/", async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        roomNumbers: {
          include: {
            unavailableDates: {},
          },
        },
      },
    });
    rooms.length == 0
      ? res.json("c'est carement vide")
      : res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
});

//afficher les chambre d'une propriete
router.get("/hotel/:hotelId", async (req, res, next) => {
  const hotelId = parseInt(req.params.hotelId);
  try {
    const existingHotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: {
        rooms: {
          include: {
            roomNumbers: {
              include: {
                unavailableDates: {},
              },
            },
          },
        },
      },
    });
    if (!existingHotel) {
      return res.status(404).json("Hotel introuvable !!!");
    }

    res.status(200).json(existingHotel.rooms);
    console.log(existingHotel.rooms.length);
  } catch (error) {
    next(error);
  }
});

//Afficher une room
router.get("/:id", async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const existingRoom = await prisma.room.findUnique({
      where: { id: parseInt(roomId) },
      include: {
        roomNumbers: {
          include: {
            unavailableDates,
          },
        },
      },
    });
    if (!existingRoom) {
      return res.status(404).json("Room introuvable !!!");
    }

    res.status(200).json(existingRoom);
  } catch (error) {
    next(error);
  }
});

//reservation d'un room
router.put("/reservation/:roomId", async (req, res, next) => {
  const roomId = parseInt(req.params.roomId);
  const { dates } = req.body;
  try {
    const existingRoom = await prisma.unavailableDate.update({
        where: { id: roomId },
        data:{dates}
  }); 

    if (!existingRoom) {
      return res.status(404).json({ message: "Chambre non trouvée" });
    }
    res.status(200).json("chambre reserver avec succes");
  } catch (error) {
    next(error);
  }
});

//Ajouter une chambre dans une hotels
router.post("/:id", async (req, res, next) => {
  const hotelId = parseInt(req.params.id);
  const { title, price, maxPeople, desc, roomNumbers } = req.body;

  const existingHotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });
  if (!existingHotel) {
    return res.status(404).json({ message: "Hotel non trouvé" });
  }

  try {
    if (!Array.isArray(roomNumbers)) {
      return res
        .status(400)
        .json({ message: "roomNumbers doit être un tableau" });
    }

    // Validation et formatage des dates
    roomNumbers.forEach((roomNumber) => {
      if (!Array.isArray(roomNumber.unavailableDates)) {
        roomNumber.unavailableDates = [];
      }

      roomNumber.unavailableDates = roomNumber.unavailableDates.map((date) => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          throw new Error(`Date invalide: ${JSON.stringify(date)}`);
        }
        return parsedDate;
      });
    });

    //Creation d'une room avec les numeros de chambre
    const newRoom = await prisma.room.create({
      data: {
        title,
        price,
        maxPeople,
        desc,
        hotelId,
        roomNumbers: {
          create: roomNumbers?.map((roomNumber) => ({
            number: roomNumber.number,
            unavailableDates: roomNumber.unavailableDates?.length
              ? {
                  create: roomNumber.unavailableDates.map((date) => ({
                    date: new Date(date),
                  })),
                }
              : undefined,
          })),
        },
      },
    });

    res.status(200).json("Room ajouter avec succes");
  } catch (error) {
    next(error);
  }
});

//mise a jour d'une room
router.put("/:id", async (req, res, next) => {
  const roomId = req.params.id;
  const {
    title,
    price,
    maxPeople,
    desc,
    roomNumbers,
    unavailableDates,
    number,
    date,
  } = req.body;

  try {
    //verifier que le room existe
    const existingRoom = await prisma.room.findFirst({
      where: { id: parseInt(roomId) },
    });
    if (!existingRoom) {
      return res.status(404).json("Room introuvable !!!");
    }
    await prisma.$transaction(async (prisma) => {
      // Supprimer les anciens numéros de salle
      await prisma.roomNumber.deleteMany({
        where: { roomId: parseInt(roomId) },
      });

      //Mise a jour de la room
      const updateRoom = await prisma.room.update({
        where: { id: existingRoom.id },
        data: {
          title,
          price,
          maxPeople,
          desc,
          roomNumbers: {
            create: roomNumbers?.map((roomNumber) => ({
              number: roomNumber.number,
              unavailableDates: {
                create: unavailableDates?.map((date) => ({
                  date: new Date(date),
                })),
              },
            })),
          },
        },
      });
      res
        .status(200)
        .json(`la room ${updateRoom.title} a ete mise a jour avec succes`);
    });
    // //Mise a jour des room number
    // const updateRoomNumber = await prisma.roomNumber.update({
    //     where: { roomId: updateRoom.id },
    //     data: { number }
    // })

    //Mise a jour des dates
    // await prisma.unavailableDate.update({ where: { roomNumberId: updateRoomNumber.id }, data: { date } })
  } catch (error) {
    next(error);
  }
});

//Supprimer une room
router.delete("/:id", async (req, res, next) => {
  const roomId = parseInt(req.params.id);
  try {
    const existingRoom = await prisma.room.findUnique({
      where: { id: roomId },
    });
    if (!existingRoom) {
      return res.status(404).json("room introuvable !!!");
    }

    await prisma.$transaction(async (prisma) => {
      // Suppression des dates non disponibles des numéros de salle
      await prisma.unavailableDate.deleteMany({
        where: {
          roomNumber: {
            roomId: roomId,
          },
        },
      });

      //Supprimer les numero des salles
      await prisma.roomNumber.deleteMany({
        where: { roomId: existingRoom.id },
      });

      //Supprimer la salle
      await prisma.room.delete({
        where: {
          id: existingRoom.id,
        },
      });
    });
    res
      .status(200)
      .json(`la salle ${existingRoom.title} a ete supprimer avec succes`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
