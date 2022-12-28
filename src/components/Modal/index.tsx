import { ModalProps } from '../../interfaces/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export function Modal(props: ModalProps) {
    let modalClass = 'modal';
    if (props.show) {
        modalClass += ' show';
    }
    if (props.className) {
        modalClass += ' ' + props.className
    }

    return (
        <div className={modalClass}>
            <div className='modal__overlay'></div>
            <div className='modal__box'>
                <h2>{props.title}</h2>
                <div className='modal__body'>
                    {props.children}
                </div>
                <div className='modal__close-bt'>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        </div>
    )
}