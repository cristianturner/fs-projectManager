function EmptyState() {
    // Cambio: se agrega un contenedor para mejorar el mensaje vacío
    return (
        <div className="empty-state">
            {/* Cambio: se agrega icono y se mejora el mensaje principal */}
            <p>📋 No tasks available yet.</p>

            {/* Cambio: se agrega una indicación adicional para el usuario */}
            <small>
                Add your first task to get started and keep your work organized!
            </small>
        </div>
    );
}

export default EmptyState;