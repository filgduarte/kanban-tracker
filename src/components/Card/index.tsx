import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { KanbanData, CardProps } from '../../types';
import { setKanbanData } from '../../kanbanDataHandler';
import { FormCard } from '../FormCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faDownload, faInbox, faLayerGroup, faPause, faPlay, faTrashCan, faUserClock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(
    faCheck,
    faInbox,
    faLayerGroup,
    faPause,
    faPlay,
    faTrashCan,
    faUserClock,
    faDownload,
    faPenToSquare
);

export function Card(props: CardProps) {
    const [kanban, setKanban] = useRecoilState(kanbanState);
    const setModal = useSetRecoilState(modalState);

    function openCardModal() {
        setModal({
            show: true,
            title: 'Alterar Card',
            children: <FormCard columnId={props.columnId} card={props} />,
        })
    }

    function changeColumn(goTo: string) {
        const index = kanban.cards.findIndex((card) => card.id == props.id);
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

    return(
        <div className='card'>
            <div className='card-content' title={`Editar card "${props.title}"`} onClick={openCardModal}>
                <div className='card-title'>
                    <h3>
                        {props.title}
                    </h3>
                    <FontAwesomeIcon icon='pen-to-square' />
                </div>
                <p>{props.description}</p>
            </div>
            <div className='card-actions'>
                {
                    kanban.columns.filter(column => column.id != props.columnId)
                    .map((column, index) => (
                        <button key={index} className={`action-button ${column.color ?? ''}`} onClick={() => changeColumn(column.id)}>
                            {<FontAwesomeIcon icon={column.icon ?? 'layer-group'} />}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}