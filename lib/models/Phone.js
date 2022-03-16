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

  static async getPhoneByASpecificID(id) {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
        phones
      WHERE
        id=$1
      `,
      [id]
    );
    return new Phone(rows[0]);
  }

  static async updatePhoneByID(id, phoneAttributes) {
    const idSearchPhoneFound = await Phone.getPhoneByASpecificID(id);
    const updatedPhoneAttributes = {
      ...idSearchPhoneFound,
      ...phoneAttributes,
    };
    console.log(
      '🚀 ~ file: Phone.js ~ line 63 ~ Phone ~ updatePhoneByID ~ updatedPhoneAttributes',
      updatedPhoneAttributes
    );
    const { name:newName, color:newColor, inventor:newInventor, yearReleased:newYearReleased } =
      updatedPhoneAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        phones
      SET
        name=$1,
        color=$2,
        inventor=$3,
        year_realeased=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [newName, newColor, newInventor, newYearReleased, id]
    );
    console.log(rows[0]);
    return new Phone(rows[0]);
  }

  static async deleteByID(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
      phones
      WHERE
      id=$1
      RETURNING
      *
      `,
      [id]
    );
    return new Phone(rows[0]);
  }
};
