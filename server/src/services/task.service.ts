import task from "../models/task.model"

export const createTask= async(title:string)=>{
  return await task.create({title})
}

export const getAllTask= async()=>{
  return await task.find().sort({createdAt: -1}) // Sort by createdAt in descending order
}

export const completeTask= async(id:string)=>{
  return await task.findByIdAndUpdate(id, {completed: true}, {new: true}) // Return the updated document
}

export const deleteTask= async(id:string)=>{
  return await task.findByIdAndDelete(id)
}