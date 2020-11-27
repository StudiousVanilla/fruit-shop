const Fruit = require('../models/fruit')
const Category = require('../models/category')

const renderCategoryList = async (req, res) =>{
    try {
        const categories = await Category.find()
        const fruits = await Fruit.find()
        res.render('category', {categories: categories, fruits: fruits })
    } catch (error) {
       console.log(error); 
    }
}

const renderCategoryCreate = (req, res) =>{
    let password = req.query.password
    if(passwordCheck(password)){
        res.render('category-create')
    }
    else{
        let destinationURL = "/category/create/" 
        res.render('password', {destinationURL: destinationURL, invalidPassword: "Invlaid password"})
    }
    
}

const renderCategorySpec = async (req, res) =>{
    // removes '/' and decodes url (%, etc) for matching in the view file
    const urlTidy = decodeURIComponent(req.url.substring(1))
    try {
        const fruits = await Fruit.find()
        res.render('category-specific-inventory', {fruits: fruits, filteredCategory: urlTidy})
    } catch (error) {
        console.log(error);
    }
    
}

const categoryCreate = async (req, res) =>{

    let category = new Category({
        name: req.body.name
    })

    try {
        // waits for operation to complete before redirection
        category = await category.save()
        res.redirect('/category')
    } catch (error) {
        // logs error and redirects to create page
        console.log(error);
        res.redirect('/category/create')
    }

}

const deleteCategory = async (req, res) =>{
    let password = req.query.password
    if(passwordCheck(password)){
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.redirect('/category') 
        } catch (error) {
           console.log(error); 
        }
        
    }
    else{
        let urlID = "/category/delete/"+req.params.id
        res.render('password-delete', {urlID: urlID, invalidPassword:"Invlaid Password"})
    }
    
}

const categoryPasswordDelete = (req, res) =>{
    let urlID = "/category/delete/"+req.params.id
    res.render('password-delete', {urlID: urlID, invalidPassword: ""})
}

const categoryPassword = (req, res) =>{
    let destinationURL = "/category" + req.url.slice(9)
    res.render('password', {destinationURL: destinationURL, invalidPassword: ""})
}

const passwordCheck = (password) =>{
    if (password === 'fruity'){
        return true
    }
    else{
        return false
    }
}


module.exports = {renderCategoryList, renderCategoryCreate, renderCategorySpec, categoryCreate, deleteCategory, categoryPassword, categoryPasswordDelete}