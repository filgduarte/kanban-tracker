import { useRecoilState } from 'recoil';
import { kanbanState } from '../../recoilState';
import { setKanbanData } from '../../kanbanDataHandler';
import { KanbanData } from '../../types';
import { ActionButton } from '../ActionButton';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import './style.css';

interface ColumnShifterProps {
    cardId: string;
    columnId: string;
}

export function ColumnShifter(props: ColumnShifterProps) {
    const [kanban, setKanban] = useRecoilState(kanbanState);
    return(
        <div className='column-shifter'>
            {
                kanban.columns
                .filter(column => column.id != props.columnId)
                .map((column, index) => (
                    <ActionButton title={column.title}
                                  action={e => changeColumn(column.id)}
                                  className={`icon-only small ${column.color ?? ''}`}
                                  icon={column.icon ?? faLayerGroup}
                                  key={index}
                    />
                ))
            }
        </div>
    )

    function changeColumn(goTo: string) {
        const index = kanban.cards.findIndex((card) => card.id == props.cardId);
        const cardToUpdate = kanban.cards[index];
        const now = Date.now();
        const newTimeTracker = {...cardToUpdate.timeTracker};
        
        if (!newTimeTracker[goTo]) {
            newTimeTracker[goTo] = 0;
        }

        newTimeTracker[props.columnId] += (now - cardToUpdate.lastChange) / 1000;

        const updatedCard = {
            id: cardToUpdate.id,
            title: cardToUpdate.title,
            description: cardToUpdate.description,
            order: cardToUpdate.order,
            columnId: goTo,
            creationDate: cardToUpdate.creationDate,
            timeTracker: newTimeTracker,
            lastChange: now,
        }
        
        const newKanban: KanbanData = {
            columns: kanban.columns,
            cards: [
                ...kanban.cards.slice(0, index),
                updatedCard,
                ...kanban.cards.slice(index + 1),
            ],
        }

        setKanban(newKanban);
        setKanbanData(newKanban);
    }
}