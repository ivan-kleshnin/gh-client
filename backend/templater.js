import Path from "path";
import Nunjucks from "nunjucks";

// TEMPLATER =======================================================================================
export default function (app) {
  app.set("views", Path.join(__dirname, "/templates"));
  app.set("view engine", "html");

  return Nunjucks.configure("backend/templates", { // TODO why duplication ?!
    autoescape: true,
    express: app
  });
}
