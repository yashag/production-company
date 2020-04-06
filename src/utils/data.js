const fs = require('fs');
const path = require('path');

function confirmDataStorage(dataPath) {
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    }
}

module.exports = {
    confirmDataStorage
}