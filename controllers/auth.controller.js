const connection = require('../db/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
  register: async (req, res) => {
    try {
      // check email
      const { email, password, name } = req.body
      const [user] = await connection.query(
        'Select * from users where email = ?',
        [email]
      )
      if (user[0]) {
        return res.json({
          error: 'Email already exists!',
        })
      }

      const hashPass = await bcrypt.hash(password, 10)
      const sql = 'insert into users (email,password,name) values (?,?,?)'
      const [result, fileds] = await connection.query(sql, [
        email,
        hashPass,
        name,
      ])

      if (result.affectedRows) {
        return res.json({
          message: 'Ok',
        })
      } else {
        return res.json({
          error: 'Error',
        })
      }
    } catch (error) {
      console.log(error)
      res.json({
        error: error,
      })
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body
    const [user] = await connection.query(
      'Select * from users where email = ?',
      [email]
    )
    if (!user[0]) return res.json({ error: 'Invalid email' })

    const { password: hash, id, name } = user[0]

    const check = await bcrypt.compare(password, hash)

    if (check) {
      const accessToken = jwt.sign({ userId: id }, 'bgegeger123321132312', {
        expiresIn: '1h',
      })
      return res.json({
        accessToken,
        data: {
          userId: id,
          name,
          email,
        },
      })
    }
  },
}

module.exports = authController
