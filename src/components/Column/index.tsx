import { ColumnProps } from '../../interfaces/Column';
import { Card } from '../Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(fas);

export function Column(props: ColumnProps) {
    const columnIcon = props.icon ?? 'layer-group';

    return(
        <div className={'column ' + (props.className ?? '')}>
            <div className='column__title'>
                <span className='icon'>{<FontAwesomeIcon icon={props.icon ?? 'layer-group'} />}</span>
                <h2>{props.title}</h2>
            </div>
            <div className='column__tasks'>
                {
                props.tasks.map((task, index) => 
                    ( <Card id={task.id}
                            title={task.title}
                            description={task.description}
                            order={task.order}
                            columnId={task.columnId}
                            creationDate={task.creationDate}
                            timeTracker={task.timeTracker}
                            lastStatusChange={task.lastStatusChange}
                            key={index} />
                    )
                )
                }
            </div>
        </div>
    );
}