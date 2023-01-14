import { useSetRecoilState, useRecoilValue } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { CardProps } from '../../types';
import { FormCard } from '../FormCard';
import { StateHandlerButton } from '../StateHandlerButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import './style.css';


export function Card(props: CardProps) {
    const kanban = useRecoilValue(kanbanState)
    const setModal = useSetRecoilState(modalState);

    return(
        <div className='card'>
            <div className='card-content' title={`Editar card "${props.title}"`} onClick={openCardModal}>
                <div className='card-title'>
                    <h3>
                        {props.title}
                    </h3>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div className='card-description'>
                {
                    props.description?.split('\n').map((line, index) => (
                        <p key={index}>
                            {line}
                        </p>
                    ))
                }
                </div>
            </div>

            <div className='move-card-buttons'>
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
        </div>
    );

    function openCardModal() {
        setModal({
            show: true,
            title: 'Alterar Card',
            children: <FormCard columnId={props.columnId} card={props} />,
        })
    }
}