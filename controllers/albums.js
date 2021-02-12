const express = require('express');
const router = express.Router();

const db = require("../models");

router.get("/" ,async(req, res) => {
    try {
        const myAlbums = await db.album.findAll()
        res.render("./albums/show", { myAlbums });
        console.log(myAlbums);
    }catch(e) {
        console.log("*****ERROR*****");
        console.log(e.message)
    }
})

router.get("/new", (req, res) => {
    res.render("./albums/new.ejs")
})


router.post("/", async(req, res) => {
    try {
        db.album.create({
            name: req.body.name,
            artist: req.body.artist,
            songCount: req.body.songCount,
            year: req.body.year
        })
        res.redirect("/albums")

    }catch(e) {
        console.log("******ERROR******");
        console.log(e.message);
    }
})

// each album
router.get('/:id', async(req, res) => {
    try {
      const myAlbums = await db.album.findByPk(req.params.id)
        res.render('./albums/test', {
          album: myAlbums,
      });
    } catch(e) {
      console.log(e.message)
      console.log("*******************")
    }
  });


// Delete
router.delete('/:id', async(req, res) => {
    try {
      await db.album.destroy({
        where: {
          id: req.params.id
        }
      })
        res.redirect('/albums');
    }catch(e) {
      console.log(e.message)
      console.log("*******************")
    }
  });

module.exports = router;