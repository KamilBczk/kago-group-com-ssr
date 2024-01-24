import { defineEventHandler, useBody } from "h3";
import { Connection, Request } from "tedious";

const config = {
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    // ...
  },
  server: process.env.DB_HOST,
  options: {
    database: process.env.DB_DATABASE,
    encrypt: true,
    // ...
  },
};

export default defineEventHandler((event) => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);
    const articles = [];

    connection.on("connect", (err) => {
      if (err) {
        console.error("Connection Failed:", err);
        reject(err);
      } else {
        const request = new Request("SELECT * FROM ArticlesTest", (err) => {
          if (err) {
            console.error("Request Error:", err);
            reject(err);
          }
          connection.close();
        });

        request.on("row", (columns) => {
          const article = {};
          columns.forEach((column) => {
            article[column.metadata.colName] = column.value;
          });
          articles.push(article);
        });

        request.on("doneProc", (rowCount, more, rows) => {
          resolve(articles);
        });

        connection.execSql(request);
      }
    });
    connection.connect();
  });
});
