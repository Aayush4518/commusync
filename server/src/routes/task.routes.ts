import {Router} from "express"; //used for creating a new router object
import * as taskController from "../controllers/task.controller"

const router= Router()

router.get("/", taskController.getTasks)
router.post("/", taskController.createTask)
router.put("/:id", taskController.markCompleted)
router.patch("/:id", taskController.markCompleted)
router.delete("/:id", taskController.deleteTask)

export default router