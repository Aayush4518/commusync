import EmptyState from "@/components/EmptyState";
import TaskItem from "@/components/TaskItem";
import { Task, TaskDraft } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onUpdateTask: (id: string, task: TaskDraft) => void;
}

export default function TaskList({    //this component is used to display the list of tasks
  tasks,
  onDeleteTask,
  onToggleTask,
  onUpdateTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState />;    //empty state gives a message when there are no tasks to display
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </div>
  );
}
