import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskCard from "../components/TaskCard";

describe("TaskCard", () => {
  const task = {
    id: 1,
    text: "Comprar pan",
    completed: false,
  };

  it("muestra el texto de la tarea", () => {
    // Arrange
    const onDeleteTask = vi.fn();
    const onToggleTask = vi.fn();

    render(
      <TaskCard
        task={task}
        onDeleteTask={onDeleteTask}
        onToggleTask={onToggleTask}
      />
    );

    // Assert
    expect(screen.getByText("Comprar pan")).toBeInTheDocument();
  });

  it("llama a onToggleTask cuando se marca el checkbox", async () => {
    // Arrange
    const onDeleteTask = vi.fn();
    const onToggleTask = vi.fn();
    const usuario = userEvent.setup();

    render(
      <TaskCard
        task={task}
        onDeleteTask={onDeleteTask}
        onToggleTask={onToggleTask}
      />
    );

    // Act
    const checkbox = screen.getByRole("checkbox");
    await usuario.click(checkbox);

    // Assert
    expect(onToggleTask).toHaveBeenCalledWith(1);
  });

  it("llama a onDeleteTask cuando se presiona Delete", async () => {
    // Arrange
    const onDeleteTask = vi.fn();
    const onToggleTask = vi.fn();
    const usuario = userEvent.setup();

    render(
      <TaskCard
        task={task}
        onDeleteTask={onDeleteTask}
        onToggleTask={onToggleTask}
      />
    );

    // Act
    await usuario.click(screen.getByRole("button", { name: "Delete" }));

    // Assert
    expect(onDeleteTask).toHaveBeenCalledWith(1);
  });
});