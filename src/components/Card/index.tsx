import { TaskProps } from '../../interfaces/Task';
import './style.css';

export function Card(props: TaskProps) {
    const openTask = (event: React.MouseEvent<HTMLElement>) => {
        
    }

    return(
        <div id={props.id} className='card' key={props.key} onClick={openTask}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}