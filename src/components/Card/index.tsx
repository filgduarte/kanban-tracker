import { TaskProps } from '../../interfaces/Task';
import './style.css';

export function Card(props: TaskProps) {
    return(
        <div id={props.id} className='card' key={props.key}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}