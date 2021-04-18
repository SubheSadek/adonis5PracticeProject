import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules,schema} from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'
import User from 'App/Models/User'


export default class PublicsController {
    
    public async index ({view}:HttpContextContract){
        const tasks = await Task.all();
        return view.render('index', {tasks})
        // return tasks
    }
    
    public async showRegister ({view}:HttpContextContract){
        return view.render('auth/register')
    }
    
    public async showLogin ({view}:HttpContextContract){
        return view.render('auth/login')
    }
    
    public async register ({request, auth, response}:HttpContextContract){
        
        const validationSchema = schema.create({
            name: schema.string({trim:true},[
                rules.maxLength(255),
            ]),
            email:schema.string({trim: true},[
                rules.email(),
                rules.maxLength(255),
                rules.unique({table: 'users', column: 'email'}),
            ]),
            password: schema.string({trim:true},[
                rules.confirmed(),
                rules.maxLength(180),
                rules.minLength(6),
            ]),
        }) 
        
        const validateData = await request.validate({
            schema: validationSchema,
            messages:{
                required: 'The {{ field }} field is required.',
                maxLength:'The {{ field }} field should not be greater than {{options.maxLength}} charecter.',
                minLength:'The {{ field }} field must not less be than {{options.minLength}} charecter.',
                'email.unique':'The email has already been taken.',
                'password_confirmation.confirmed':'The password confirmation doesn`t match.',
            }
        })
        
        const user = await User.create(validateData)
        await auth.login(user)
        return response.redirect('/')
        // return validateData
        
    }
    
    
    public async login({request, auth, session, response}:HttpContextContract){
        // const {email, password} = request.all()
        
        const validationSchema = schema.create({
            email:schema.string({trim: true},[
                rules.email(),
                rules.maxLength(255),
                rules.exists({table: 'users', column: 'email'}),
            ]),
            password: schema.string({trim:true}),
        }) 
        
        const validateData = await request.validate({
            schema: validationSchema,
            messages:{
                required: 'The {{ field }} field is required.',
                'email.exists':'The email doesn`t exist.',
            }
        })
        
        try{
            await auth.attempt(validateData.email, validateData.password)
            return response.redirect('/')
        }catch (errors){
            session.flashExcept(['password']);

            session.flash({
              error: 'The password doesn`t match.',
            });
      
            return response.redirect('back');
        }
    }
    
    public async logout({auth, response}){
        await auth.logout()
        return response.redirect('/login')
    }
    

    //All-Task-functions
    public async showCreateTask ({view}:HttpContextContract){
        return view.render('tasks.createTask')
    }
    
    
    public async creatTask ({request, auth, response, session}:HttpContextContract){
        
        const validationSchema = schema.create({
            taskName: schema.string({trim:true},[
                rules.maxLength(255),
            ]),
            taskTitle:schema.string({trim: true},[
                rules.maxLength(255),
            ]),
            taskDesc: schema.string({trim:true}),
        }) 
        
        const validateData = await request.validate({
            schema: validationSchema,
            messages:{
                required: 'The {{ field }} field is required.',
                maxLength:'The {{ field }} field should not be greater than {{options.maxLength}} charecter.',
                
            }
        })
        
        await Task.create({
            user_id: auth.user.id,
            task_name: validateData.taskName,
            task_title: validateData.taskTitle,
            task_desc: validateData.taskDesc,

        })

        session.flash('notification', 'Task added successfully !')
        return response.redirect('back')
        
    }
    
    
    // public async getTask ({view}){
    //     // const user = auth.user
    //     const tasks = await Task.all();
    //     return view.render('index', {tasks})
    // }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
