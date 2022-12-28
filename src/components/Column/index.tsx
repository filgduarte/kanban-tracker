import { ColumnProps } from '../../interfaces/Column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(fas);

export function Column(props: ColumnProps) {
    let columnClass = 'column';
    if (props.className) {
        columnClass += ' ' + props.className
    }
    if (props.color) {
        columnClass += ' ' + props.color
    }

    const openModal = (event: React.MouseEvent<HTMLElement>) => {
        const modalTitle = 'Editar coluna';
        const modalContent = <></>
    }

    const columnIcon = props.icon ?? 'layer-group';

    return(
        <div id={props.id} className={columnClass}>
            <div className='column__title' onClick={openModal}>
                <span className='icon'>{<FontAwesomeIcon icon={columnIcon} />}</span>
                <h2>{props.title}</h2>
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