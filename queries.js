const { Pool } = require('pg');
const connectionSettings = process.env.NODE_ENV === 'production' ?
  {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
  :
  {
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
  }
const pool = new Pool(connectionSettings);
const getTest = async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
};
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
    if (error) {
      return res.status(401).send(error.message)
    }
    res.status(200).json(results.rows)
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      return res.status(401).send(error.message)
    }
    res.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  const { username, password, email } = req.body

  pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, password, email], (error, results) => {
    if (error) {
      return res.status(401).send(error.message)
    }
    res.status(201).send(`User added`)
  })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { username, password, email } = req.body

  pool.query(
    'UPDATE users SET username = $1, password = $2 email = $3 WHERE id = $3',
    [username, password, email, id],
    (error, results) => {
      if (error) {
        return res.status(401).send(error.message)
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      return res.status(401).send(error.message)
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getTest
}