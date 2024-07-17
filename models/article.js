const mongoose = require('mongoose')    //import mongoose
const marked = required('marked')
const slugify = required('slugify')

const articleSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }, 
    slug: {
        type: String,
        required: true,
        unique:true 
    }
})

articleSchema.pre('validate', function(next) {
    if(this.title){
        this.slug = slugify(this.title, {
            lover: true, strict: true
        })
    }
    next() 
})

module.exports = mongoose.model('Article', articleSchema)

