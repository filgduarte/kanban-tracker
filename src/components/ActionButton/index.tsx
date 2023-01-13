import { ActionButtonProps } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

export function ActionButton(props: ActionButtonProps) {
    let buttonClassName = 'action-button';
    if (props.className) {
        buttonClassName += ` ${props.className}`;
    }

    return(
        <button type={props.type ?? 'button'}
                title={props.title}
                className={buttonClassName}
                onClick={props.onClick}
        >
            {
                props.icon &&
                <FontAwesomeIcon icon={props.icon} />
            }

            { props.label }
        </button>
    )
}