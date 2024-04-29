const express = require("express");
const router = express.Router();
const db = require("../database");

router.get('/', async (req, res) => {
  try {
    const allTimeOffs = await db.select('*').from('timeoff');
    res.json(allTimeOffs); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

router.post("/:id", async (request, response) => {
  const { start_date, end_date, description, member_id } = request.body; 
  if (!start_date || !end_date || !description || !member_id) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  const addTimeOff = {
    start_date,
    end_date,
    description,
    created_date: new Date(),
    member_id,
  };

  try {
    await db("timeoff").insert(addTimeOff);
    response.status(201).json("New timeoff has been added");
  } catch (error) {
    console.error(error); 
    response.status(500).json({ error: "Failed to add a new timeoff" });
  }
});

router.delete("/:id", async (request, response) => {
  const memberId = request.params.id;
  try {
    const deletedTimeoff = await db("timeoff").where({ member_id: memberId }).del();
    if (!deletedTimeoff) {
      return response.status(404).json({ error: "Timeoff not found" });
    }
    response.json({ message: "Timeoff deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to delete the timeoff" });
  }
});


module.exports = router;
