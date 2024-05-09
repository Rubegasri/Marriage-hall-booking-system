let express = require("express")
let pageModel = require('../../model/pageModel')
let router = express()
router.get('/', (req, res)=>{
    res.render('../views/backend/page-file')
})

router.get('/add-page/', (req, res)=>{
    
    res.render('../views/backend/add-page-file')
})
router.post('/add-page/', (req, res)=>{
    // res.render('../views/backend/page-file')
    pageModel.create({
        pageUrl: req.body.page_Url,
        pageNavText: req.body.page_Nav_Text,
        pageTitle: req.body.page_Title,
        pageMetaDescription: req.body.page_Meta_Description,
        pageMetaKeyword: req.body.page_Meta_Keyword,
        pageHeading: req.body.Page_Heading,
        //  pagePhoto:req.file.filename,
        // pagePhoto: req.body.Page_Photo,
        pageDetails :req.body.Page_Details,
        // pageContact:req.body.Page_Contact0
    })
    .then((x)=>{
        res.redirect('/admin/pages/')
        // console.log(x)
    })
    
})
router.get('/edit-page', (req, res)=>{
    res.render('../views/backend/edit-page-file')
})
module.exports=router