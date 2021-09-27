const { Post } = require('../models');

const postdata = [
  {
    title: 'What is MVC',
    post_date_created: 'September 20, 2021 13:00:00',
    contents: 'The Model-View-Controller (MVC) framework is an architectural pattern that adheres to the separation of concerns principle. The Model stores data and data-related logic.    The View is in charge of UI/UX concerns, or what a user will see and interact with.The Controller is the interface between Models and Views. It processes requests from the View, uses the Model to manipulate data, and sends data to the View to render.',
    post_creator_id: 1,
  },
  {
    title: 'What is OOP',
    post_date_created: 'September 21, 2021 08:00:00',
    contents: 'Object-Oriented Programming (OOP) is when code is organized using objects instead of functions. Objects can inherit properties and methods from other objects. Multiple objects can be created from the same blueprint classes or constructor functions.',
    post_creator_id: 1,
  },
  {
    title: 'What is SQL',
    post_date_created: 'September 22, 2021 12:00:00',
    contents: 'SQL stands for Structured Query Language.  With SQL, we use a query, or a structured inquiry, to interact with data that is stored in a database. You can use a SQL query to create, read, update, and delete data in a database.',
    post_creator_id: 2,
  },
  {
    title: 'What is Express.js',
    post_date_created: 'September 23, 2021 18:00:00',
    contents: 'Express.js is a lightweight framework for Node.js that allows you to write APIs, handle HTTP requests, and implement middleware in your server-side application. Express.js exists on the back end of an application. Express.js is considered the de facto standard for creating routes in Node.js applications.',
    post_creator_id: 2,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;