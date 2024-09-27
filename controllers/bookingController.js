const prisma = require("../prisma/client");
const bookSeat = async (req, res) => {
  const { trainId } = req.body;
  try {
    // Get the train with its current version (availableSeats)
    const train = await prisma.train.findUnique({
      where: { id: trainId },
      select: {
        availableSeats: true,
        totalSeats: true,
      },
    });

    if (!train || train.availableSeats <= 0) {
      return res.status(400).send("No available seats");
    }

    // Attempt to book only if availableSeats match the current value
    const updatedTrain = await prisma.train.updateMany({
      where: {
        id: trainId,
        availableSeats: train.availableSeats, // Ensure no other user has booked
      },
      data: {
        availableSeats: train.availableSeats - 1,
      },
    });

    // If no rows were updated, it means someone else booked the seat
    if (updatedTrain.count === 0) {
      return res.status(409).send("Seat was already booked by another user.");
    }

    // Proceed with booking
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        trainId,
        seatNumber: train.totalSeats - train.availableSeats + 1,
      },
    });

    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send("Seat booking failed due to a race condition.");
  }
};

const getBookingDetails = async (req, res) => {
  const booking = await prisma.booking.findMany({
    where: { id: parseInt(req.params.id) },
    include: { user: true, train: true },
  });
  if (!booking) return res.status(404).send("Booking not found");

  res.status(200).send(booking);
};

module.exports = {
  bookSeat,
  getBookingDetails,
};
