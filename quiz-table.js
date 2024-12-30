const QuizTable = {
  db: null,
  async init(db) {
    this.db = db;
    this.db.run(`
    CREATE TABLE IF NOT EXISTS quiz_table (
      id text PRIMARY KEY,
      group_user_verify_id text,
      question text,
      answer text,
      options text,
      create_timestamp INTEGER,
      expire_timestamp INTEGER
    )
      `);
  },
  async add(data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const query = `INSERT INTO quiz_table (${columns}) VALUES (${placeholders})`;

    try {
      const result = await new Promise((resolve, reject) => {
        this.db.run(query, values, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, changes: this.changes });
          }
        });
      });
      return result;
    } catch (err) {
      console.error('Error inserting data:', err);
      throw err;
    }
  },
  async getById(id) {
    const sql = `SELECT * FROM quiz_table WHERE id = ?`;

    try {
      const result = await new Promise((resolve, reject) => {
        this.db.get(sql, [id], (err, result) => {
          if (err) {
            console.error('Error running sql:', sql);
            console.error(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      return result;
    } catch (err) {
      console.error('Failed to get data by username:', err);
      throw err;
    }
  },
  async deleteById(id) {
    const sql = `DELETE FROM quiz_table WHERE id = ?`;

    try {
      const result = await new Promise((resolve, reject) => {
        this.db.run(sql, [id], function (err) {
          if (err) {
            console.error('Error running delete query:', sql);
            console.error(err);
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        });
      });
      return result;
    } catch (err) {
      console.error('Failed to delete record:', err);
      throw err;
    }
  },
  async listExpired(now) {
    const sql = `SELECT * FROM quiz_table where expire_timestamp < ?`;
    try {
      const result = await new Promise((resolve, reject) => {
        this.db.all(sql, [now], (err, rows) => {
          if (err) {
            console.log('Error running sql: ' + sql);
            console.log(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
}
module.exports = QuizTable;