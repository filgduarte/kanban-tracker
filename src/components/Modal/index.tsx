import { useRecoilState } from 'recoil';
import { modalState } from '../../recoilState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export function Modal() {
    const [modal, setModal] = useRecoilState(modalState);

    let modalClass = 'modal';
    if (modal.show) {
        modalClass += ' show';
    }
    if (modal.className) {
        modalClass += ' ' + modal.className
    }

    return (
        <div className={modalClass}>
            <div className='modal__overlay'>
            </div>

            <div className='modal__box'>
                <h2 className='modal__title'>{modal.title}</h2>
                <div className='modal__content'>
                {modal.children}
                </div>                
                <button className='modal__close-bt' onClick={e => setModal({show: false})}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
}