const prisma = require("../prisma/client");

const addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    const train = await prisma.train.create({
      data: {
        name,
        source,
        destination,
        totalSeats,
        availableSeats: totalSeats,
      },
    });
    res.status(201).send(train);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateTrain = async (req, res) => {
  const { trainId } = req.params;
  const { name, source, destination, totalSeats } = req.body;
  try {
    const train = await prisma.train.update({
      where: { id: parseInt(trainId) },
      data: {
        name,
        source,
        destination,
        totalSeats,
        availableSeats: totalSeats,
      },
    });
    res.status(200).send(train);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addTrain,
  updateTrain,
};
