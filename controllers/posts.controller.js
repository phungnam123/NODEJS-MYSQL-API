const connection = require('../db/index')

const postsController = {
  getAll: async (req, res) => {
    try {
      const [result, fields] = await connection.query('select * from posts')
      //   console.log('>>> check result:', result)
      //   console.log('>>> check fields', fields)
      res.status(200).json({
        data: result,
      })
    } catch (error) {
      console.log(error)
      res.json({
        message: error,
      })
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params
      const [result, fields] = await connection.query(
        'select * from posts where id = ?',
        [id]
      )
      res.status(200).json({
        data: result,
      })
    } catch (error) {
      console.log(error)
      res.status(200).json({
        message: error,
      })
    }
  },

  create: async (req, res) => {
    try {
      const { title, content } = req.body
      if (!title || !content) {
        res.status(200).json({
          message: 'messing required params',
        })
      }
      // console.log(title, content)
      const sql = 'insert into posts (title, content) values (?, ?)'
      const [result, fields] = await connection.query(sql, [title, content])
      res.json({
        message: 'A new posts is created',
      })
    } catch (error) {
      res.json({
        message: error,
      })
    }
  },

  update: async (req, res) => {
    try {
      const { title, content } = req.body
      if (!title || !content) {
        res.status(200).json({
          message: 'messing required params',
        })
      }

      const { id } = req.params
      const sql = 'update posts set title = ?, content = ? where id = ?'
      const [results, fields] = await connection.query(sql, [
        title,
        content,
        id,
      ])
      res.json({
        message: 'Update successfull',
      })
    } catch (error) {
      res.json({
        message: error,
      })
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params
      const sql = 'delete from posts where id = ?'
      const [result, fields] = await connection.query(sql, [id])
      res.json({
        message: 'Delete a post successfull',
      })
    } catch (error) {
      res.json({
        message: error,
      })
    }
  },
}

module.exports = postsController
