const bcrypt = require('bcrypt');
const saltRounds = 16;

async function hashPassword(plainTextPassword) {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
}




// // Usage
// const userPassword = "MySecurePassword123";
// hashPassword(userPassword).then(hash => {
//     console.log("Hashed Password:", hash);
//     // Save `hash` into the MySQL table's `password_` column
// });

// Verify password on Login
async function checkPassword(inputPassword, storedHash) {
    const match = await bcrypt.compare(inputPassword, storedHash);
    return match; // true or false
}



      // req.body.password_ = "forever";
        req.body.password_ = await bcrypt.hash(req.body.password_, 16);