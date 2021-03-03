const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const db = require("./models");
const methodOverride = require('method-override')
// const axios = require("axios")
// // axios.get("https://api.spacexdata.com/v3/missions")
// // .then(response => {
// //     console.log(response.data)
// // })

// const githubData = async() => {
//     try {
//         const github = await axios.get("https://api.spacexdata.com/v3/missions");
//         const data = await github.data;
//         console.log(data)
//     }catch(e) {
//         console.log(e.message)
//     }
// }

// githubData();


const app = express();
app.set("view engine", "ejs");
app.use(methodOverride('_method'))

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