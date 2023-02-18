const query = require("../database");

const getLocations = async (req, res) => {
    try {
        const locations = await query(`SELECT * FROM locations`);
        return res.status(200).json({ locations });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error while fetching locations." });
    }
};

const addLocation = async (req, res) => {
    try {
        const {
            address,
            totalSpots,
            availBikes,
            openSpots
        } = req.body;

        await query(`INSERT INTO locations (address, totalSpots, bikesAvailable, openSpots) VALUES ('${address}', '${totalSpots}', '${availBikes}', '${openSpots}')`);
        for (let i = 0; i < availBikes; i++) await query(`INSERT INTO bikes (status, location) VALUES ('Parked', '${address}')`);
        
        return res.status(201).json({ 
            address,
            totalSpots,
            bikesAvailable: availBikes,
            openSpots,
            message: "Location added successfully." 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error while adding location." });
    }
};

module.exports = {
    getLocations,
    addLocation
}