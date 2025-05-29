const Ngo = require("../models/Ngo");

exports.registerNgo = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    const newNgo = new Ngo({
      ...data,
      addressProof: files.addressProof[0]?.filename || "",
      idProof: files.idProof[0]?.filename || "",
      selfiePhoto: files.selfiePhoto[0]?.filename || "",
      ngoProfile: files.ngoProfile[0]?.filename || "",
    });

    await newNgo.save();
    res.status(201).json({ message: "NGO Registered", data: newNgo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find();
    res.status(200).json(ngos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ngo = await Ngo.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: "Status updated", data: ngo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};