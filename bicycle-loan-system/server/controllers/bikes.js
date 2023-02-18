const query = require("../database");

const getAllBikes = async (req, res) => {
    try {
        const bikes = await query(`SELECT * FROM bikes`);
        return res.status(200).json({ bikes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error while fetching bikes." });
    }
};

const updateBike = async (req, res) => {
    try {
        const {
            bikeID,
            status = null,
            location = null
        } = req.body;

        if (status === 'Parked' && location) {
            await query(`UPDATE locations SET bikesAvailable = bikesAvailable + 1, openSpots = openSpots - 1 WHERE address = '${location}'`);
            await query(`UPDATE bikes SET status = '${status}', location = '${location}' WHERE bikeID = '${bikeID}'`);
        } else {
            const prevLocation = (await query(`SELECT * FROM bikes WHERE bikeID = '${bikeID}'`))[0].location;
            if (prevLocation) await query(`UPDATE locations SET bikesAvailable = bikesAvailable - 1, openSpots = openSpots + 1 WHERE address = '${prevLocation}'`);
            await query(`UPDATE bikes SET status = '${status}', location = NULL WHERE bikeID = '${bikeID}'`);
        }
        return res.status(200).json({
            bikeID,
            status,
            location,
            message: "Bike status update successful."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error while updating bike status." });
    }
};

const addBike = async (req, res) => {
    try {
        const {
            status,
            location = null
        } = req.body;

        if (location) {
            await query(`INSERT INTO bikes (status, location) VALUES ('Parked', '${location}')`)
            await query(`UPDATE locations SET bikesAvailable = bikesAvailable + 1, openSpots = openSpots - 1 WHERE address = '${location}'`);
        } else {
            await query(`INSERT INTO bikes (status) VALUES ('${status}')`)
        }

        const bikeID = (await query(`SELECT LAST_INSERT_ID() FROM bikes`))[0]['LAST_INSERT_ID()'];

        return res.status(201).json({ 
            bikeID,
            status,
            customer: null,
            location,
            message: "Bike added successfully." 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error while adding bike." });
    }
};

const getUserBike = async (req, res) => {
    try {
        const username = req.body.data.username;
        const bike = await query(`SELECT * FROM bikes WHERE customer = '${username}'`);

        // it is common for no bike to be found, we don't consider this to be an error
        if (!bike.length) return res.status(200).json(null);
        else return res.status(200).json({ 
            bikeID: bike[0].bikeID,
            status: bike[0].status,
            location: bike[0].location,
            code: bike[0].code
        });
    } catch (error) {
        console.log(error);
        if (!res.headersSent) { 
            return res.status(500).json({ error: "Server error while fetching bikes." });
        }
    }
};

const setUserBike = async (req, res) => {
    try {
        const username = req.body.data.username;
        const {
            status,
            location,
            code: submittedCode = null
        } = req.body;

        const bike = await query(`SELECT * FROM bikes WHERE customer = '${username}'`);

        if (!bike.length) {
            // assign customer to a new bike at this location
            const availBike = await query(`SELECT * FROM bikes WHERE status = 'Parked' AND location = '${location}'`);
            if (!availBike.length) return res.status(404).json({ error: "No available bikes at this location." });

            const code = Math.floor(Math.random() * 100000); // unique code

            await query(`UPDATE bikes SET status = '${status}', customer = '${username}', code = '${code}' WHERE bikeID = '${availBike[0].bikeID}'`);
            await query(`UPDATE locations SET bikesAvailable = bikesAvailable - 1 WHERE address = '${location}'`);
            
            return res.status(200).json({
                bikeID: availBike[0].bikeID,
                status,
                location,
                code
            });
        } else {
            // compare submitted code to stored code
            if (submittedCode && parseInt(submittedCode) !== bike[0].code) {
                return res.status(401).json({ error: "Code is wrong. Try again." });
            }

            // update status of existing bike
            await query(`UPDATE bikes SET status = '${status}' WHERE customer = '${username}'`);

            if (status === 'Checked Out') {
                await query(`UPDATE locations SET openSpots = openSpots + 1 WHERE address = '${location}'`);
            }

            return res.status(200).json({
                bikeID: bike[0].bikeID,
                status,
                location,
                code: bike[0].code
            });
        }
    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Server error while setting user bike." });
        }
    }
};

const removeUserBike = async (req, res) => {
    try {
        // location parameter indicates where to leave the bike when the customer is done with it
        const { username } = req.body.data;
        const { 
            location, 
            code: submittedCode = null
        } = req.body;

        const bike = await query(`SELECT * FROM bikes WHERE customer = '${username}'`);

        // compare submitted code to stored code
        if (submittedCode) {
            if (parseInt(submittedCode) !== bike[0].code) {
                return res.status(401).json({ error: "Code is wrong. Try again." });
            }
        }

        await query(`UPDATE bikes SET status = 'Parked', location = '${location}', customer = NULL, code = NULL WHERE customer = '${username}'`);
        if (bike[0].status === 'Reserved') {
            await query(`UPDATE locations SET bikesAvailable = bikesAvailable + 1 WHERE address = '${location}'`);
        } else {
            await query(`UPDATE locations SET bikesAvailable = bikesAvailable + 1, openSpots = openSpots - 1 WHERE address = '${location}'`);
        }
    
        return res.status(200).json({ message: "User bike removed successfully." });
    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Server error while removing user bike." });
        }
    }
}

module.exports = {
    getAllBikes,
    updateBike,
    addBike,
    getUserBike,
    setUserBike,
    removeUserBike
};