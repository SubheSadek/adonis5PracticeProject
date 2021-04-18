/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


// auth-routes
Route.group(() =>{
Route.get('/register', 'PublicsController.showRegister')
Route.get('/login', 'PublicsController.showLogin')
Route.post('/register', 'PublicsController.register')
Route.post('/login', 'PublicsController.login')
}).middleware('guest')
//Task-routes
Route.group(() =>{
Route.get('/', 'PublicsController.index')
Route.get('/create-task', 'PublicsController.showCreateTask')
Route.post('/create-task', 'PublicsController.creatTask')
Route.get('/logout', 'PublicsController.logout')
}).middleware('auth')