import { ColumnProps } from '../../types';
import { FormColumn } from '../ColumnForm';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoilState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheck,
    faDownload,
    faInbox,
    faLayerGroup,
    faPause,
    faPlay,
    faTimes,
    faTrashCan,
    faUserClock,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
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
    faTimes,
    faPlus,
);

export function Column(props: ColumnProps) {
    const setModal = useSetRecoilState(modalState);
    const openModal = (event: React.MouseEvent<HTMLElement>) => {
        setModal({
            show: true,
            title: 'Alterar coluna',
            children: <FormColumn column={props} />,
        })
    }

    let columnClass = 'column';
    if (props.className) {
        columnClass += ' ' + props.className
    }
    if (props.color) {
        columnClass += ' ' + props.color
    }

    const columnIcon = props.icon ?? 'layer-group';

    return(
        <div id={props.id} className={columnClass}>
            <div className='column__title'>
                <h2 onClick={openModal} title={`Editar coluna ${props.title}`}>
                    <span className='icon'>{<FontAwesomeIcon icon={columnIcon} />}</span>
                    {props.title}
                </h2>
            </div>
            <div className='column__tasks'>
                {props.children ?? ''}
                <div className='add-task'>
                    <button>
                        <FontAwesomeIcon icon='plus' />
                    </button>
                </div>
            </div>
        </div>
    );
}