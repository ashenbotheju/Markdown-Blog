const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [{
        title : 'test article',
        createdAt: Date.now(),
        description: 'test description'
    },
    {
        title : 'test article',
        createdAt: Date.now(),
        description: 'test description'
    }];
    res.render("index", {articles : articles});
})

app.listen(3000)