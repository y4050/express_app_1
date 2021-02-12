const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const db = require("./models");

const app = express();
app.set("view engine", "ejs");

app.use(ejsLayouts);
app.use(express.urlencoded({extended: false}));



app.get("/", async(req, res) => {
    try {
        const getAlbum = await db.album.findAll()
        res.render("index.ejs", { albums: getAlbum})
    }catch(e) {
        console.log("*********ERROR*********")
        console.log(e.message);
    }
});


// controllers
app.use("/artists", require("./controllers/artists"));
app.use("/albums", require("./controllers/albums"));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = PORT;