const GroupUserVerifyTable = {
  db: null,
  async init(db) {
    this.db = db;
    this.db.run(`
    CREATE TABLE IF NOT EXISTS group_user_verify_table (
      id text PRIMARY KEY,
      chat_id text,
      user_id text,
      create_timestamp INTEGER,
      expire_timestamp INTEGER,
      verification_expiration_seconds INTEGER,
      chat_title text,
      verification_message_id text
    )
      `);
  },
  async add(data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const query = `INSERT INTO group_user_verify_table (${columns}) VALUES (${placeholders})`;

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
  async update(data, whereClause) {
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No data provided to update.');
    }
    if (!whereClause || Object.keys(whereClause).length === 0) {
      throw new Error('No where clause provided.');
    }

    const setClause = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    const setValues = Object.values(data);

    const whereKeys = Object.keys(whereClause);
    const whereClauseString = whereKeys
      .map(key => `${key} = ?`)
      .join(' AND ');
    const whereValues = Object.values(whereClause);

    const values = [...setValues, ...whereValues];

    const query = `UPDATE group_user_verify_table SET ${setClause} WHERE ${whereClauseString}`;

    try {
      const result = await new Promise((resolve, reject) => {
        this.db.run(query, values, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        });
      });
      return result;
    } catch (err) {
      console.error('Error updating data:', err);
      throw err;
    }
  },
  async getById(id) {
    const sql = `SELECT * FROM group_user_verify_table WHERE id = ?`;

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
  async listExpired(now) {
    const sql = `SELECT * FROM group_user_verify_table where expire_timestamp < ?`;
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
  async deleteById(id) {
    const sql = `DELETE FROM group_user_verify_table WHERE id = ?`;

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
  }
}
module.exports = GroupUserVerifyTable;