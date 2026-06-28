import {Request, Response} from "express"
import * as taskService from "../services/task.service"
import {validateTask} from "../validators/task.validator"

export const createTask= async(req: Request, res: Response): Promise<void>=>{
  try{
    const {title}= req.body //we write it in {} because we only want the title from the body
    const error= validateTask(title)
    if(error){
      res.status(400).json({error})
      return
    }
    const task= await taskService.createTask(title)
    res.status(201).json(task)

  }catch(err){
    res.status(500).json({error: "failed to create task"})
  }
  
}



export const getTasks= async(_: Request, res:Response):Promise<void> =>{
  try{
    const tasks= await taskService.getAllTask()
    res.json(tasks) //by default status code is 200
  }catch(err){
    res.status(500).json({error: "failed to fetch tasks"})
  }
}
  

export const markCompleted= async(req: Request, res: Response): Promise<void>=>{
  try{
    // const {id}= req.params
    const task= await taskService.completeTask(req.params.id)
    res.json(task)
  }catch(err){
    res.status(500).json({error: "failed to mark task as completed"})
  }
}

export const deleteTask= async(req: Request, res: Response): Promise<void>=>{

  try{
    const task= await taskService.deleteTask(req.params.id)
    if(!task){
      res.status(404).json({error: "Task not found"})
    }else{
      res.json({message: "Task deleted successfully"})
    }
  }catch(err){
    res.status(500).json({error: "failed to delete task"})
  }
}

