import { useRecoilValue } from 'recoil';
import { kanbanState } from '../../recoilState';
import { Card } from '../../types';
import { StateHandlerButton } from '../StateHandlerButton';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export function ColumnShifter(props: Card) {
    const kanban = useRecoilValue(kanbanState);

    return(
        <div className='column-shifter'>
            {
                kanban.columns
                .filter(column => column.id != props.columnId)
                .map((column, index) => (
                    <StateHandlerButton title={column.title}
                                        action='saveCard'
                                        cardData={{...props, columnId: column.id}}
                                        ignoreConfirmation
                                        className={`icon-only small ${column.color ?? ''}`}
                                        icon={column.icon ?? faLayerGroup}
                                        key={index}
                    />
                ))
            }
        </div>
    )
}