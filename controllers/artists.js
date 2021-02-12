const express = require('express');
const router = express.Router();

const db = require("../models");

router.get("/" ,async(req, res) => {
    try {
        const myArtists = await db.artist.findAll()
        res.render("./artists/show", { myArtists });
        console.log(myArtists);
    }catch(e) {
        console.log("*****ERROR*****");
        console.log(e.message)
    }
})

router.get("/new", (req, res) => {
    res.render("./artists/new.ejs")
})

router.post("/", async(req, res) => {
    try {
        db.artist.create({
            name: req.body.name,
            bio: req.body.bio,
            city: req.body.city
        })
        res.redirect("/artists")
    }catch(e) {
        console.log("*****ERROR*****");
        console.log(e.message);
    }
})

// each artist
router.get('/:id', async(req, res) => {
    try {
      const chosenArtist = await db.artist.findByPk(req.params.id)
        res.render('./artists/single', {
          artist: chosenArtist,
      });
    } catch(e) {
      console.log(e.message)
      console.log("*******************")
    }
  });

// Delete
router.delete('/:id', async(req, res) => {
    try {
      await db.artist.destroy({
        where: {
          id: req.params.id
        }
      })
        res.redirect('/artists');
    }catch(e) {
      console.log(e.message)
      console.log("*******************")
    }
  });

module.exports = router;