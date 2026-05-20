import app, { port } from "./app";
import { createTable } from "./db";

const main = () => {
  createTable();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
main();
