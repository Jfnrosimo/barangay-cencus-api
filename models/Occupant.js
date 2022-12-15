const mongoose = require("mongoose");

const OccupantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  sex: { type: String, required: true },
  birthDate: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  civilStatus: { type: String, required: true },
  education: { type: String, required: true },
  citizenship: { type: String, required: true },
  occupation: { type: String, required: true },
  monthlyIncome: { type: String, required: true },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Occupant", OccupantSchema);
