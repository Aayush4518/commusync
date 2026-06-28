import mongoose, {Document,Schema} from "mongoose"

export interface ITask extends Document{ //interface for the task model
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title:{
      type: String,
      required: true,
      trim:true,
      maxlength:100,
    },
    description:{
      type: String,
      trim:true,
      default: "",
    }
    
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ITask>("Task", taskSchema)

//"task" is the name of the collection in the database. Mongoose will automatically create a collection named "tasks" in the database.
//taskSchema is the schema for the task model. It defines the structure of the task documents in the database.