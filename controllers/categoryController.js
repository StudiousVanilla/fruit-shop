const Fruit = require('../models/fruit')
const Category = require('../models/category')

const renderCategoryList = async (req, res) =>{
    const categories = await Category.find()
    const fruits = await Fruit.find()
    res.render('category', {categories: categories, fruits: fruits })
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
    const fruits = await Fruit.find()
    res.render('category-specific-inventory', {fruits: fruits, filteredCategory: urlTidy})
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
        await Category.findByIdAndDelete(req.params.id)
        res.redirect('/category')
    }
    else{
        let urlID = "/category/delete/"+req.params.id
        res.render('password-delete', {urlID: urlID, invalidPassword:"Invlaid Password"})
    }
    
}

const categoryPasswordDelete = async (req, res) =>{
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