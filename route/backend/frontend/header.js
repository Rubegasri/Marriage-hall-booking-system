let express=require('express')
let router=express()
let pageModel=require('../../model/pageModel')

router.get('/',(req,res)=>{
    res.render('../views/frontend/tourly/index')
})

router.get('/:id',(req,res)=>{
    pageModel.findOne({pageUrl:req.params.id})
    .then((x)=>{
        res.render('../views/frontend/tourly/dynamic-page',{x})
        console.log
    })
    .catch((y)=>{
        console.log(y)
    })
})
module.exports=router