const query = require("../database");

const getAllReports = async (req, res) => {
    try {
        const reports = await query(`SELECT * FROM reports`);
        return res.status(200).json({ reports });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error while fetching reports." });
    }
};

const submitReport = async (req, res) => {
    try {
        const {
            bikeID,
            status,
            report
        } = req.body;

        const username = req.body.data.username;

        const prevLocation = (await query(`SELECT * FROM bikes WHERE bikeID = '${bikeID}'`))[0].location;
        if (prevLocation) await query(`UPDATE locations SET bikesAvailable = bikesAvailable - 1, openSpots = openSpots + 1 WHERE address = '${prevLocation}'`);

        await query(`INSERT INTO reports (bikeID, status, customer, report) VALUES ('${bikeID}', '${status}', '${username}', '${report}')`);
        await query(`UPDATE bikes SET status = '${status}', location = NULL, customer = NULL WHERE bikeID = '${bikeID}'`);

        return res.status(201).json({ 
            bikeID,
            status,
            report,
            message: "Report added successfully." 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error while adding bike." });
    }
};

module.exports = { getAllReports, submitReport };