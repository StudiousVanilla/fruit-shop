const Fruit = require('../models/fruit')
const Category = require('../models/category')

const renderInventoryList = async (req, res) =>{
    try {
        const fruits = await Fruit.find()
        res.render('inventory', {fruits: fruits})
    } catch (error) {
       console.log(error); 
    }   
}

const renderInventoryEdit = async (req, res) =>{
    let password = req.query.password
    if(passwordCheck(password)){
        try {
            const fruit = await Fruit.findById(req.params.id)
            const categories = await Category.find()
            res.render('edit', {fruit: fruit, categories: categories})
        } catch (error) {
            console.log(error);
        }
    }
    else{
        let destinationURL = "/inventory/edit/" + req.params.id
        res.render('password', {destinationURL: destinationURL, invalidPassword: "Invlaid password"})
    }
    
}

const renderInventoryCreate = async (req, res) =>{
    let password = req.query.password
    if(passwordCheck(password)){
        try {
            const categories = await Category.find()
            res.render('item-create', {categories: categories})
        } catch (error) {
            console.log(error);
        }
    
    }
    else{
        let destinationURL = "/inventory/create"
        res.render('password', {destinationURL: destinationURL, invalidPassword: "Invlaid password"})
    }
    
}

const renderInventorySpecific = async (req, res) =>{
    try {
        const fruit = await Fruit.findById(req.params.id)
        res.render('inventory-specific', {fruit:fruit})
    } catch (error) {
        console.log(error);
    }
    
}

const deleteInventoryItem = async (req, res) =>{
    let password = req.query.password
    if(passwordCheck(password)){
        try {
            await Fruit.findByIdAndDelete(req.params.id)
            res.redirect('/')
        } catch (error) {
           console.log(error); 
        }
        
    }
    else{
        let urlID = "/inventory/delete/"+req.params.id
        res.render('password-delete', {urlID: urlID, invalidPassword:"Invlaid Password"})
    }
    
}

// creates a new fruit on the fruits DB
const inventoryCreate =  async (req, res) =>  {

    let img = ''

    // sets imgURL to Schema default if no url is submitted on the form
    if(req.body.imgURL === ''){
        img = undefined
    }
    else{
        img = req.body.imgURL
    }
    
    // sets the properties of the fruit
    let fruit =  new Fruit({
        name:req.body.name,
        description:req.body.description,
        imgURL:img,
        price:req.body.price,
        category:req.body.category,
        stock:req.body.stock,
    })

    try {
        // waits for operation to complete before redirection
        fruit = await fruit.save()
        res.redirect('/') 
    } catch (error) {
        // renders create page and logs error, if there is one
        res.render('item-create', {fruit: fruit})
        console.log(error);
    }
};

const editInventory = async (req, res) => {
    try {
        let fruit = await Fruit.findById(req.params.id)
        if(req.body.name !== ''){
            fruit.name = req.body.name
        }
        if(req.body.price !== ''){
            fruit.price = req.body.price
        }
        if(req.body.imgURL !== ''){
            fruit.imgURL = req.body.imgURL
        }
        if(req.body.description !== 'Enter text here...'){
            fruit.description = req.body.description
        }
        if(req.body.category !== ''){
            fruit.category = req.body.category
        }
        if(req.body.stock !== ''){
            fruit.stock = req.body.stock
        }
        try {
            // waits for operation to complete before redirection
            fruit = await fruit.save()
            res.redirect('/') 
        } catch (error) {
            // renders create page and logs error, if there is one
            res.render('edit', {fruit: fruit})
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
    
}

const inventoryPassword = (req, res) =>{
    let destinationURL = "/inventory" + req.url.slice(9)
    res.render('password', {destinationURL: destinationURL, invalidPassword: ""})
}

const inventoryPasswordDelete = (req, res) =>{
    let urlID = "/inventory/delete/"+req.params.id
    res.render('password-delete', {urlID: urlID, invalidPassword: ""})
}

const passwordCheck = (password) =>{
    if (password === 'fruity'){
        return true
    }
    else{
        return false
    }
}

module.exports = {renderInventoryList, renderInventoryEdit, renderInventoryCreate, inventoryCreate, renderInventorySpecific,deleteInventoryItem, editInventory,inventoryPassword,inventoryPasswordDelete}