import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoilState';
import { ColumnProps } from '../../types';
import { FormColumn } from '../FormColumn';
import { FormCard } from '../FormCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faDownload, faInbox, faLayerGroup, faPause, faPlay, faTimes, faUserClock, faPlus, faPenToSquare, faBan } from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(
    faCheck,
    faInbox,
    faLayerGroup,
    faPause,
    faPlay,
    faUserClock,
    faDownload,
    faTimes,
    faPlus,
    faPenToSquare,
    faBan,
);

export function Column(props: ColumnProps) {
    const setModal = useSetRecoilState(modalState);

    let columnClass = 'column';
    if (props.className) {
        columnClass += ' ' + props.className
    }
    if (props.color) {
        columnClass += ' ' + props.color
    }

    const columnIcon = props.icon ?? 'layer-group';

    return(
        <div className={columnClass} style={{order: props.order}}>
            <div className='column__header' onClick={openColumnModal} title={`Editar coluna "${props.title}"`}>
                <div className='column__title'>
                    <h2>
                        <span className='icon'><FontAwesomeIcon icon={columnIcon} /></span>
                        {props.title}
                    </h2>
                    <FontAwesomeIcon icon='pen-to-square' />
                </div>
            </div>
            <div className='column__cards'>
                {props.children ?? ''}
                <div className='add-card'>
                    <button onClick={openCardModal}>
                        <FontAwesomeIcon icon='plus' />
                    </button>
                </div>
            </div>
        </div>
    );

    function openColumnModal() {
        setModal({
            show: true,
            title: 'Alterar coluna',
            children: <FormColumn column={props} />,
        })
    }

    function openCardModal() {
        setModal({
            show: true,
            title: 'Adicionar Card',
            children: <FormCard columnId={props.id} />,
        })
    }

}