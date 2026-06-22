import TaskCard from "./TaskCard";

function TaskList() {
    const tasks = [
        "Study React",
        "Practice components",
        "Understand props"
    ];
    return (
        <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                    <TaskCard text={task} />
                </li>
            ))}
        </ul>
    );
}

export default TaskList;