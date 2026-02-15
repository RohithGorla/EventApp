const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");

dotenv.config();

const events = [
  {
    name: "Tech Conference 2026",
    organizer: "Bellcorp Studio",
    location: "Hyderabad",
    date: new Date("2026-04-10"),
    description: "Annual technology innovation conference.",
    capacity: 100,
    category: "Technology"
  },
  {
    name: "Startup Pitch Night",
    organizer: "Startup Hub",
    location: "Bangalore",
    date: new Date("2026-05-15"),
    description: "Pitch your startup idea to investors.",
    capacity: 50,
    category: "Business"
  },
  {
    name: "Music Fest Live",
    organizer: "Live Nation",
    location: "Mumbai",
    date: new Date("2026-03-20"),
    description: "Live music festival with top artists.",
    capacity: 200,
    category: "Entertainment"
  },
  {
    name: "AI & ML Workshop",
    organizer: "Tech Academy",
    location: "Chennai",
    date: new Date("2026-06-05"),
    description: "Hands-on AI and Machine Learning workshop.",
    capacity: 60,
    category: "Education"
  },
  {
    name: "Fitness Marathon",
    organizer: "Health Club",
    location: "Delhi",
    date: new Date("2026-02-25"),
    description: "Annual city marathon event.",
    capacity: 300,
    category: "Sports"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await Event.deleteMany(); // optional: clears old events
    await Event.insertMany(events);

    console.log("Events Seeded Successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();