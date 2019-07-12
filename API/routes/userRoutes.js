const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users')

router.post('/addUser', userControllers.ADD_USER)
router.get('/getAll', userControllers.GET_ALL_USERS )
router.get('/:id', userControllers.GET_SINGLE_USER)
router.patch('/:id', userControllers.UPDATE_USER)
router.delete('/:id', userControllers.DELETE_USER)
// db.serialize(() => {
//     let query = `SELECT DISTINCT VALUES name FROM user_info ORDER BY name`;
//     db.all(query, [], (err, rows) => {
//         if (err) {
//             return console.log('Error during SELECT all() metod: ', err )
//         }
//         rows.forEach(row => {
//             console.log('name: ', row.info)
//         })
//     })
// })

// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });



module.exports = router