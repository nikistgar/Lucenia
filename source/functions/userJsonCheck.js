require('dotenv').config();
const fs = require('fs');

module.exports = (client) => {
    client.userJsonCheck = async (userID) => {
        const readergeneral = fs.readFileSync("users/general.json", `utf-8`);
        let objgeneral = JSON.parse(readergeneral);
        const readerduel = fs.readFileSync("users/duel_data.json", `utf-8`);
        let objduel = JSON.parse(readerduel);
        if(typeof objgeneral.users[userID] == `undefined`)
            {
                objgeneral.users[userID] = {};
                
                fs.writeFileSync('users/general.json', JSON.stringify(objgeneral));
            };
        if(typeof objduel.users[userID] == `undefined`)
            {
                objduel.users[userID] = {}
                objduel.users[userID].wins = 0;
                objduel.users[userID].loses = 0;

                fs.writeFileSync('users/duel_data.json', JSON.stringify(objduel));
            };
    }
}