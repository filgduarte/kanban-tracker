import { ColumnProps } from '../../interfaces/Column';
import { Card } from '../Card';
import './style.css';

export function Column(props: ColumnProps) {
    return(
        <div className={'column ' + props.className}>
            <div className='column__title'>
                <span className='icon'>{props.icon}</span>
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
                            tracker={task.tracker}
                            lastStatusChange={task.lastStatusChange}
                            key={index} />
                    )
                )
                }
            </div>
        </div>
    );
}