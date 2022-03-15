const pool = require('../utils/pool');

module.exports = class Phone {
  id;
  name;
  color;
  yearReleased;
  inventor;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.yearReleased = row.year_realeased;
    this.inventor = row.inventor;
  }

  static async insert({ name, color, yearReleased, inventor }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        phones (name, color, year_realeased, inventor)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [name, color, yearReleased, inventor]
    );
    return new Phone(rows[0]);
  }


  static async getAllPhones() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      phones
      `
    );
    return rows.map((row) => new Phone(row));
  }

};
