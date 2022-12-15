const express = require("express");
const router = express.Router();

//Model
const Occupant = require("../models/Occupant");

//Import middleware
const requireAuth = require("../middleware/requireAuth");

//require auth to all occupant route
router.use(requireAuth);

//READ all occupant
router.get("/", async (req, res) => {
  //set the request user id
  const user_id = req.user._id;
  const occupants = await Occupant.find({ user_id });
  res.status(200).json(occupants);
});

//READ a single occupant
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Occupant not found" });
  }

  const occupant = await Occupant.findById(id);

  if (!occupant) {
    return res.status(404).json({ error: "Occupant not found" });
  }
  res.status(200).json(occupant);
});

//CREATE a new occupant
router.post("/", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    sex,
    birthDate,
    placeOfBirth,
    address,
    contactNumber,
    civilStatus,
    education,
    citizenship,
    occupation,
    monthlyIncome,
  } = req.body;

  //add to database
  try {
    const user_id = req.user._id;
    const occupant = await Occupant.create({
      firstName,
      middleName,
      lastName,
      sex,
      birthDate,
      placeOfBirth,
      address,
      contactNumber,
      civilStatus,
      education,
      citizenship,
      occupation,
      monthlyIncome,
      user_id,
    });
    res.status(200).json(occupant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete occupant
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: "No such occupant" });
  // }

  const occupant = await Occupant.findOneAndDelete({ _id: id });

  if (!occupant) {
    return res.status(400).json({ error: "No such occupant" });
  }

  res.status(200).json(occupant);
});

// update a occupant
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such occupant" });
  }

  const occupant = await Occupant.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!occupant) {
    return res.status(400).json({ error: "No such occupant" });
  }

  res.status(200).json(occupant);
});

module.exports = router;
