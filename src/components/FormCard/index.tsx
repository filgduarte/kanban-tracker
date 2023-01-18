import { useState } from 'react';
import { Card, FormCardProps } from '../../types';
import { FormField } from '../FormField';
import { StateHandlerButton } from '../StateHandlerButton';
import { TimeTrackers } from '../TimeTrackers';
import { faCheck, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
            <FormField type='text'
                       name='title'
                       label='Título:'
                       value={cardData.title}
                       className='full-width'
                       onChange={onChangeHandler}
                       required
            />
            <FormField type='textarea'
                       name='description'
                       label='Descrição:'
                       value={cardData.description}
                       className='full-width'
                       onChange={onChangeHandler}
            />

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

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setCardData(previous => ({
            ...previous,
            [e.target.name]: e.target.value,
        }))
    }
}