import TaskCard from "./TaskCard";

type Task= {
  id: number;
  text: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
};

function TaskList(props: TaskListProps) {
  return (
    <ul>
      {props.tasks.map((task) => (
        <li key={task.id}>
          <TaskCard text={task.text} />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;