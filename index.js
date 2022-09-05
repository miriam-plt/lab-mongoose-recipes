const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  
  .then(() => {
    // Run your code here, after you have insured that the connection was made

  
  Recipe.create({
    title: 'Spaghetti al pomodoro',
    level: 'Easy Peasy',
    ingredients: ['Spaghetti', 'Olive Oil', 'Garlic', 'Tomatoes', 'Salt', 'Papper', 'Sugar', 'Basil', 'Parmesan'],
    cuisine: 'Italian',
    image: 'https://www.giallozafferano.it/images/221-22163/Spaghetti-al-pomodoro_650x433_wm.jpg',
    duration: 20
  })
    .then(createdRecipe => console.log(createdRecipe.title))
    .catch(err => console.log(err))


   Recipe.insertMany(data)
     .then((x)  => console.log(x))

  })  
  

  Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
    .then(() => console.log('successfully updated'))
    .catch(err => console.log(err))
 

  Recipe.findOneAndDelete({title: 'Carrot Cake'})
    .then(() => console.log('successfully deleted'))
    .catch(err => console.log(err))


  .catch(error => {
      console.error('Error connecting to the database', error);
  });