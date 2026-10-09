const User = require("../models/User");

const wingFlats = {
    A: { start: 101, end: 129 },
    B: { start: 130, end: 159 },
    C: { start: 160, end: 189 },
    D: { start: 190, end: 219 },
    E: { start: 220, end: 249 },
    F: { start: 250, end: 279 },
    G: { start: 280, end: 304 }
};

const getAvailableFlats = async (req, res) => {

    try {

        const wing = req.params.wing;

        if (!wingFlats[wing]) {
            return res.status(400).json({
                success: false,
                message: "Invalid Wing"
            });
        }

        const users = await User.find(
            {
                wing
            },
            {
                flatNo: 1,
                _id: 0
            }
        );

        const occupiedFlats = users.map(user => user.flatNo);

        const availableFlats = [];

        for (
            let i = wingFlats[wing].start;
            i <= wingFlats[wing].end;
            i++
        ) {

            const flat = `${wing}-${i}`;

            if (!occupiedFlats.includes(flat)) {

                availableFlats.push(flat);

            }

        }

        res.json({
            success: true,
            flats: availableFlats
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getAvailableFlats
};