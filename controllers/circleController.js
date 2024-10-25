const Circle = require('../models/Circle');
const Parent = require('../models/Parent');

const createOrJoinCircle = async (req, res) => {
  try {
    const { parentId, school, grade, section, society } = req.body;
    const circlesData = [
      { name: `${school}`, school },
      { name: `Class ${grade}, ${school}`, school, grade },
      { name: `Section ${section}, Class ${grade}, ${school}`, school, grade, section },
      society ? { name: `${society}`, society } : null,
      society ? { name: `${society}, ${school}`, society, school } : null,
    ].filter(Boolean);

    const circles = await Promise.all(
      circlesData.map(async (data) => {
        let circle = await Circle.findOne(data);
        if (!circle) circle = await Circle.create(data);
        await circle.updateOne({ $addToSet: { members: parentId } });
        return circle._id;
      })
    );

    await Parent.findByIdAndUpdate(parentId, { $addToSet: { circles } });
    res.status(200).json({ message: "Parent added to circles", circles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrJoinCircle };