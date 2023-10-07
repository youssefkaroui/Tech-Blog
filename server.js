const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routers = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require('./utils/helpers');

const PORT = process.env.PORT || 3001;
const app = express();
const hbs = exphbs.create({ helpers })

//setting up sequelize 
const sess = {
    secret: "placeholder",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
    db: sequelize
})
}
app.use(session(sess));

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));
//setting up our router and making it ready for routes traffic 
app.use(routers)
// sequelize connection 
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening at PORT http://localhost:${PORT}/`));
});