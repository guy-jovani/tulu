const NotFound = require('../../errors/NotFound.error');
const pgClient = require('../../pgCLient');

const queryDB = async (text, values) => {
  try {
    return await pgClient.query(text, values);
  } catch (e) {
    throw e;
  }
};

const setNote = async (title, content) => {
  try {
    const query =
      'insert into notes(title, content) values($1, $2) returning *';
    const values = [title, content];
    const res = await queryDB(query, values);
    return res.rows[0];
  } catch (e) {
    console.log(e);
    throw new Error("Couldn't save note");
  }
};

const updateNote = async (id, title, content) => {
  try {
    const query = `update notes 
        set title=$1, content=$2 
        where id=$3
        returning *
        `;
    const values = [title, content, id];
    const res = await queryDB(query, values);
    if (!res.rowCount) throw new NotFound('Note not found');
    return res.rows[0];
  } catch (e) {
    if (e.name === 'NotFound') throw e;
    throw new Error("couldn't update note");
  }
};

/**
 * get notes with pagination
 * if 'limit' is not provided all notes will be returned
 * @param {Integer} page
 * @param {Integer} limit
 * @returns
 */
const getNotes = async (page = 1, limit = 0) => {
  try {
    const firstNote = (page - 1) * limit;
    let query = `select * from notes
      offset $1
    `;
    const values = [firstNote];
    if (limit) {
      query += 'limit $2';
      values.push(limit);
    }
    const res = await queryDB(query, values);
    return res.rows;
  } catch (error) {
    throw new Error("couldn't retrieve notes");
  }
};

/**
 *
 * @param {String} field - name of field to filter by
 * @param {String} value - value of the field
 * @returns the notes that match the filter
 */
const getByField = async (field, value) => {
  try {
    const query = `select * from notes
      where ${field}=$1
    `;
    const values = [value];
    const res = await queryDB(query, values);
    if (!res.rowCount) throw new NotFound('Note not found');
    return res.rows;
  } catch (error) {
    if (error.name === 'NotFound') throw error;
    throw new Error("couldn't retrieve notes");
  }
};

/**
 * delete the notes the match the filter
 * @param {String} field - name of field to filter by
 * @param {String} value - value of the field
 */
const deleteByField = async (field, value) => {
  try {
    const query = `delete from notes
      where ${field}=$1
    `;
    const values = [value];
    const res = await queryDB(query, values);
    if (!res.rowCount) throw new NotFound('Note not found');
  } catch (error) {
    if (error.name === 'NotFound') throw error;
    throw new Error("couldn't delete note");
  }
};

module.exports = {
  setNote,
  getNotes,
  updateNote,
  getByField,
  deleteByField,
};
