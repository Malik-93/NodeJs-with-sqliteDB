const db = require('../database/database')
const md5 = require('md5')
//ADD USER
exports.ADD_USER = (req, res, next) => {
    let { name, email, password } = req.body
    var errors = {};
    if (!name) {
        errors.name = 'Name field is required'
        res.status(500).json({ Error: errors.name })
        return;
    }
    if (!email) {
        errors.email = 'Email field is required'
        res.status(500).json({ Error: errors.email })
        return;
    }
    if (!password) {
        errors.password = 'Password field is required'
        res.status(500).json({ Error: errors.password })
        return;

    }
    const sql = `INSERT INTO user(name, email, password) VALUES (? ,?, ?)`
    const params = [name, email, md5(password)]
    db.run(sql, params, (err, row) => {
        if (err) {
           return res.status(500).json({ success: false, Error: 'DB Error during adding product :', err })
        }
        res.status(200).json({
            success: true,
            message: 'User Created Successfully',
            body: {
                method: 'POST',
                URL: 'http://localhost:8000/api/users/addUser',
                data: { name, email, password },
                id: this.lastID
            }
        })
    })
}

// GET_ALL_USERS

exports.GET_ALL_USERS = (req, res, next) => {
    db.serialize(() => {
        // SELECT
        const sql = `SELECT * from user`;
        const params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
               return res.status(404).json({ success: false, Error: 'DB Error during get all users: ', err })
            }
            res.status(200).json({ success: true, message: 'success', data: rows })
        })
    })
}

//  /GET_SINGLE_USER

exports.GET_SINGLE_USER = (req, res, nex) => {
    db.serialize(() => {
        const sql = `SELECT * from user where id = ?`
        const params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
               return res.status(500).json({ success: false, Error: 'DB Error during getting single user : ', err })
            } 
            if(!row) {
                return res.status(404).json({ success: false, Error: 'Product not found : ' })
                
            }
            res.status(200).json({ success: true, message: 'Success', data: row })
        })
    })
}

// UPDATA_USER

exports.UPDATE_USER = (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }
    const sql = `UPDATE user SET ( name, email, password ) = ( ?, ?, ? ) WHERE id = ?`
    const params = [data.name, data.email, data.password, req.params.id]
    db.run(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, Error: 'DB Error during updating user :', err })
        } 
       
        res.status(200).json({
            success: true,
            message: 'User Updated successfully',
            body: {
                method: 'PATCH',
                changes: this.changes
            }
        })
    })
}
exports.DELETE_USER = (req, res, next) => {
    const sql = `DELETE from user where id = ?`
    const params = [req.params.id]
    db.run(sql, params, (err, result) => {
        console.log('result :', result)
        if(err) {
          return res.status(404).json({success: false, Error: 'DB Error during deleting user : ', err })
        } 
        res.status(200).json({success: true, message: 'User Deleted successfully', })
    })
}