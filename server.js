const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routers = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3001;
const app = express();

//setting up sequelize 
const sess = {
    secret: "placeholder",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
    db: sequelize
})
}
// setting up our handlebars
const hbs = exphbs.create()
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
//setting up our session
app.use(session(sess));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));
//setting up our router and making it ready for routes traffic 
app.use(routers)
// sequelize connection 
sequelize.sync({force: false}).then(() => {
    console.log("Database connected...");
 
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});