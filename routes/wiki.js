const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');
const wikiPage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', async (req, res) => {
  const pages = await Page.findAll();
  res.send(main(pages));
})

router.post('/', async (req, res, next) => {
  // add definitions for `title` and `content`
  console.log(req.body);
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.Content
    });
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    const pSlug = page.slug;
    res.redirect(`/wiki/${pSlug}`);
  } catch (error) { next(error) }
})

router.get('/add', (req, res) => {
  res.send(addPage());
})

router.get('/:slug', async(req, res, next) => {
  const slugPage = await Page.findOne({
    where: {
      slug: req.params.slug
    }
  })
  console.log('slugpage = ', slugPage);
  res.send(wikiPage(slugPage))
});

module.exports = router;
