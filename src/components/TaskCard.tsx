type TaskCardProps = {
  text: string;
};

function TaskCard(props: TaskCardProps) {
  return (
    <div className="task-card">
      <p>{props.text}</p>
    </div>
  );
}

export default TaskCard;