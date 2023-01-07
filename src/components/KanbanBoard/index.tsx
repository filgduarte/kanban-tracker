import { useRecoilValue, useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { Column } from '../Column';
import { Card } from '../Card';
import { FormColumn } from '../FormColumn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export function KanbanBoard() {
    const kanban = useRecoilValue(kanbanState);
    const setModal = useSetRecoilState(modalState);
    
    return(
        <main>
            <div className='kanban-board'>
            {
                kanban.columns.map((column, index) => (
                    <Column id={column.id}
                            title={column.title}
                            order={column.order}
                            color={column.color}
                            icon={column.icon}
                            archiveAfter={column.archiveAfter}
                            key={index}
                    >
                    {
                        kanban.cards.filter(card => card.columnId == column.id)
                                    .map((card, index) => (
                            <Card id={card.id}
                                  title={card.title}
                                  description={card.description}
                                  order={card.order}
                                  columnId={card.columnId}
                                  creationDate={card.creationDate}
                                  timeTracker={card.timeTracker}
                                  lastChange={card.lastChange}
                                  key={index}
                            />
                        ))
                    }
                    </Column>
                ))
            }
            {
                (kanban.columns.length <= 7) &&
                <div className='column'>
                    <div className='add-column'>
                        <button onClick={(openColumnModal)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            }
            </div>
        </main>
    );

    function openColumnModal(event: React.MouseEvent<HTMLElement>) {
        setModal({
            show: true,
            title: 'Adicionar coluna',
            children: <FormColumn />,
        })
    }
}