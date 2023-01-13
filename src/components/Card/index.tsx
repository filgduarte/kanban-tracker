import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoilState';
import { CardProps } from '../../types';
import { FormCard } from '../FormCard';
import { ColumnShifter } from '../ColumnShifter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './style.css';


export function Card(props: CardProps) {
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

            <ColumnShifter id={props.id}
                           title={props.title}
                           description={props.description}
                           order={props.order}
                           columnId={props.columnId}
                           creationDate={props.creationDate}
                           timeTracker={props.timeTracker}
                           lastChange={props.lastChange}
            />
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