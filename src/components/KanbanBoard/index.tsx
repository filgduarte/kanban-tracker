import { KanbanProps } from '../../interfaces/KanbanBoard';
import { Column } from '../Column';
import { Card } from '../Card';

import './style.css';

export function KanbanBoard(props: KanbanProps) {
    return(
        <main>
            <div className="kanban-board">
            {
                props.columns.map((column, index) => (
                    <Column id={column.id}
                            title={column.title}
                            order={column.order}
                            color={column.color}
                            icon={column.icon}
                            key={index}
                    >
                    {
                        props.cards.filter(card => card.columnId == column.id)
                                    .map((card, index) => (
                            <Card id={card.id}
                                  title={card.title}
                                  description={card.description}
                                  order={card.order}
                                  columnId={card.columnId}
                                  creationDate={card.creationDate}
                                  timeTracker={card.timeTracker}
                                  lastStatusChange={card.lastStatusChange}
                                  key={index}
                            />
                        ))
                    }
                    </Column>
                ))
            }
            </div>
        </main>
    )
}