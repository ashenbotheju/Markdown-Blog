const mongoose = require('mongoose')    //import mongoose
const marked = required('marked')
const slugify = required('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().windows)

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
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next) {
    if(this.title){
        this.slug = slugify(this.title, {
            lover: true, strict: true
        })
    }
    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next() 
})

module.exports = mongoose.model('Article', articleSchema)

