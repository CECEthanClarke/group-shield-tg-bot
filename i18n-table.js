const I18nTable = {
  db: null,
  async init(db) {
    this.db = db;
    this.db.run(`
    CREATE TABLE IF NOT EXISTS i18n_table (
      chat_id text PRIMARY KEY,
      lang text
    )
      `);
  },
  async save(data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const updateClause = Object.keys(data)
      .map(key => `${key} = excluded.${key}`)
      .join(', ');

    const query = `
      INSERT INTO i18n_table (${columns}) 
      VALUES (${placeholders}) 
      ON CONFLICT(chat_id) 
      DO UPDATE SET ${updateClause}`;

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
      console.error('Error inserting/updating data:', err);
      throw err;
    }
  },
  async get(chat_id) {
    const sql = `SELECT * FROM i18n_table WHERE chat_id = ?`;

    try {
      const result = await new Promise((resolve, reject) => {
        this.db.get(sql, [String(chat_id)], (err, result) => {
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
  async list() {
    const sql = `SELECT * FROM i18n_table`;
    try {
      const result = await new Promise((resolve, reject) => {
        this.db.all(sql, [], (err, rows) => {
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
module.exports = I18nTable;