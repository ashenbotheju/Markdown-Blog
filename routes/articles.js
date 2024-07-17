//create article route

const express = require('express')
const Article = require('./../models/article')
const article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findOne(res.params.id)
    res.render('articles/edit', {article: article})
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) res.render('/')
    res.render('articles/show', { article: article })
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    }catch(e) {
        console.log(e)
        res.redirect('articles/new', {article: article})
    }
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}), saveArticleAndRederect('new')    

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}), saveArticleAndRederect('edit') 

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(res.params.id)
    res.redirect('/')
})

function saveArticleAndRederect(path) {
    return async (req, res) => {
        let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }catch(e) {
            console.log(e)
            res.redirect(`articles/${path}`, {article: article})
        }
    }
}

module.exports = router;