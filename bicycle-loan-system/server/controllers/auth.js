const query = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const {
            username,
            password,
            accountType
        } = req.body;

        // check if username already exists
        const result = await query(`SELECT * FROM users WHERE username = '${username}'`);
        if (result.length > 0) return res.status(400).json({ error: "Username already taken." });
        
        // hash password
        const hashedPass = await bcrypt.hash(password, 12);

        // generate token   
        const token = jwt.sign({ username, role: accountType }, process.env.JWT_SECRET);

        // store username and password
        await query(`INSERT INTO users (username, password, accountType, token) VALUES ('${username}', '${hashedPass}', '${accountType}', '${token}')`);
        return res.status(201).json({ 
            user: username,
            role: accountType,
            token,
            message: "User registered successfully." 
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error during registration." });
    }
};

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        // check if username exists
        const user = await query(`SELECT * FROM users WHERE username = '${username}'`);
        if (!user.length) return res.status(404).json({ error: "Username or password is wrong." });
       
        // compare passwords
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
            const token = jwt.sign({ username, role: user[0].accountType }, process.env.JWT_SECRET);
            await query(`UPDATE users SET token = '${token}' WHERE username = '${username}'`);
            return res.status(200).json({ 
                user: user[0].username,
                role: user[0].accountType, 
                token,
                message: "Login successful." 
            });
        } else {
            return res.status(404).json({ error: "Username or password is wrong." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error during login." });
    }
};

const authorize = (role = null) => (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Token is required." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (role && role !== decoded.role) res.status(401).json({ error: "Not authorized to access resource." });

        req.body.data = { username: decoded.username };

        return next();
    } 
    catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        } else {
            return res.status(400).end();
        }
    }
};

module.exports = {
    register,
    login,
    authorize
}