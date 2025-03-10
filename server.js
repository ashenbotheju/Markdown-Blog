const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('methodOverride')
const app = express()

//connect database
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexe: true
})

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createAt: 'desc'})
    res.render("articles/index", {articles : articles});
})

app.use('/articles', articleRouter)
app.listen(3000)