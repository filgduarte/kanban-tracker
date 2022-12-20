import { useState } from 'react';
import { Column } from '../Column';
import { kanbanJSON } from '../../interfaces/kanbanJSON';
import { getKanbanData, setKanbanData } from '../../kanbanDataHandler';
import './style.css';

export function KanbanBoard() {
    const [kanban, setKanban] = useState<kanbanJSON>( getKanbanData('kanbanTracker') );

    return(
        <main className="kanban-board">
            {
                kanban.columns.map((column, index) => 
                    (<Column id={column.id}
                             title={column.title}
                             order={column.order}
                             tasks={kanban.tasks.filter(task => task.columnId == column.id)}
                             key={index} />
                    )
                )
                }
        </main>
    )
}