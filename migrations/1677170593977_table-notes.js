/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    create table if not exists notes (
      id serial primary key,
      title varchar(${process.env.TITLE_LENGTH}) not null,
      content varchar(${process.env.CONTENT_LENGTH}) not null
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    drop table notes;
  `);
};
