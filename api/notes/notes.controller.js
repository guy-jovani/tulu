const {
  setNote,
  updateNote,
  getNotes,
  getByField,
  deleteByField,
} = require('./notes.service');

const getAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const notes = await getNotes(page, limit);
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await getByField('id', id);
    res.status(200).send(note);
  } catch (error) {
    next(error);
  }
};

const deleteNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteByField('id', id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const set = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = await setNote(title, content);
    res.status(201).send({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const note = await updateNote(id, title, content);
    res.status(200).send({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  set,
  update,
  deleteNoteById,
};
