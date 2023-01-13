import { useState } from 'react';
import { Card, FormCardProps } from '../../types';
import { StateHandlerButton } from '../StateHandlerButton';
import { TimeTrackers } from '../TimeTrackers';
import { faCheck, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export function FormCard({columnId, card, className}: FormCardProps) {
    const [cardData, setCardData] = useState<Card>({
        id: card?.id ?? '',
        title: card?.title ?? '',
        description: card?.description ?? '',
        order: card?.order ?? 0,
        columnId: columnId,
        creationDate: card?.creationDate ?? 0,
        timeTracker: card?.timeTracker ?? {},
        lastChange: card?.lastChange ?? 0,
    });

    let formClassName = 'form ' + (card ? 'edit-card' : 'add-card');
    if (className) {
        formClassName += ' ' + className;
    }

    return(
        <form className={formClassName}>
            <div className='form-field full-width'>
                <label htmlFor='title'>Título:</label>
                <input type='text' id='title' name='title' value={cardData.title} onChange={onChangeHandler} />
            </div>
            <div className='form-field full-width'>
                <label htmlFor='description'>Descrição:</label>
                <textarea id='description' name='description' value={cardData.description} onChange={onChangeHandler}></textarea>
            </div>
            {
                (card) &&
                 <TimeTrackers card={card} />
            }
            <div className='form-field form-actions full-width'>
            {
            (card) &&
                <StateHandlerButton label='Excluir'
                                    className='danger'
                                    icon={faTrashCan}
                                    action='removeCard'
                                    cardData={cardData}
                />
            }
                <StateHandlerButton label='Cancelar'
                                    className='warning'
                                    icon={faTimes}
                                    action='discardChanges'
                />
                <StateHandlerButton label='Salvar'
                                    type='submit'
                                    className='success'
                                    icon={faCheck}
                                    action='saveCard'
                                    cardData={cardData}
                                    preventDefault
                />
            </div>
        </form>
    );

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCardData(previous => ({
            ...previous,
            [e.target.name]: e.target.value,
        }))
    }
}