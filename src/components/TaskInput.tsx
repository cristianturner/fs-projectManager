import { useState } from "react";
import "./TaskInput.css";

type TaskInputProps = {
  onAddTask: (text: string) => void;
};

function TaskInput(props: TaskInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim() === "") {
      return;
    }

    props.onAddTask(text);
    setText("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );    
}

export default TaskInput;