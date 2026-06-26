import { useState } from "react";

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
    <div>
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