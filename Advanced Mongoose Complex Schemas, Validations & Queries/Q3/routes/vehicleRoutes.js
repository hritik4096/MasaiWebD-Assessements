const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehicleController");

// Vehicle CRUD
router.post("/", controller.createVehicle);
router.get("/", controller.getAllVehicles);
router.put("/:id", controller.updateVehicle);
router.delete("/:id", controller.deleteVehicle);

// Trip operations
router.post("/:id/trip", controller.addTrip);
router.put("/:id/trip/:tripId", controller.updateTrip);
router.delete("/:id/trip/:tripId", controller.deleteTrip);

// Advanced queries
router.get("/query/long-trips", controller.tripLongerThan200);
router.get("/query/from-cities", controller.startingFromCities);
router.get("/query/after-date", controller.tripsAfterDate);
router.get("/query/cars-trucks", controller.findCarOrTruck);
router.get("/:id/total-distance", controller.getTotalDistance);

module.exports = router;
