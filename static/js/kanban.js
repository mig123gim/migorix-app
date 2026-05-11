document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.kanban-column');
    let draggedCard = null;

    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(column, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                column.appendChild(draggable);
            } else {
                column.insertBefore(draggable, afterElement);
            }
        });
    });

    const cards = document.querySelectorAll('.kanban-card');
    cards.forEach(card => {
        card.setAttribute('draggable', true);

        card.addEventListener('dragstart', () => {
            draggedCard = card;
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            draggedCard.classList.remove('dragging');
            draggedCard = null;
            saveState();
        });
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.kanban-card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function saveState() {
        const state = {};
        columns.forEach(column => {
            const columnId = column.getAttribute('id');
            const cards = [...column.querySelectorAll('.kanban-card')].map(card => card.getAttribute('data-id'));
            state[columnId] = cards;
        });
        localStorage.setItem('kanbanState', JSON.stringify(state));
    }

    function loadState() {
        const state = JSON.parse(localStorage.getItem('kanbanState'));
        if (!state) return;

        columns.forEach(column => {
            const columnId = column.getAttribute('id');
            if (!state[columnId]) return;

            const cards = state[columnId];
            cards.forEach(cardId => {
                const card = document.querySelector(`.kanban-card[data-id="${cardId}"]`);
                if (card) {
                    column.appendChild(card);
                }
            });
        });
    }

    loadState();
});
