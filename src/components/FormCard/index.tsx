import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { Card, KanbanData, FormCardProps } from '../../types';
import { setKanbanData } from '../../kanbanDataHandler';
import { TimeTrackers } from '../TimeTrackers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export function FormCard(props: FormCardProps) {
    const [titleInput, setTitleInput] = useState(props.card ? props.card.title : '');
    const [descriptionInput, setDescriptionInput] = useState(props.card ? props.card.description : '');
    const [kanban, setKanban] = useRecoilState(kanbanState);
    const setModal = useSetRecoilState(modalState);

    let formClassName = 'form ' + (props.card ? 'edit-card' : 'add-card');
    if (props.className) {
        formClassName += ' ' + props.className;
    }

    return(
        <form className={formClassName}>
            <div className='form-field full-width'>
                <label htmlFor='title'>Título:</label>
                <input type='text' id='title' value={titleInput} onChange={e => setTitleInput(e.target.value)} />
            </div>
            <div className='form-field full-width'>
                <label htmlFor='description'>Descrição:</label>
                <textarea name='description' onChange={e => setDescriptionInput(e.target.value)} value={descriptionInput}></textarea>
            </div>
            {
                (props.card) &&
                 <TimeTrackers card={props.card} />
            }
            <div className='form-field form-actions full-width'>
                {
                    (props.card) &&
                    <button type='button' className='action-button danger' onClick={(removeCard)}><FontAwesomeIcon icon={faTrashCan} />Excluir</button>
                }
                <button type='button' className='action-button warning' onClick={(discardChanges)}><FontAwesomeIcon icon={faTimes} />Cancelar</button>
                <button type='submit' className='action-button success' onClick={(saveCard)}><FontAwesomeIcon icon={faCheck} />Salvar</button>
            </div>
        </form>
    );

    function saveAndCloseModal(newKanban: KanbanData) {
        setKanban(newKanban);
        setKanbanData(newKanban);
        setModal({show: false});
    }

    function removeCard(event: React.MouseEvent<HTMLElement>) {
        const index = kanban.cards.findIndex((card) => card.id == props.card?.id);
        if (index < 0) {
            alert('Não foi possível encontrar o id do card.');
            return
        };

        if (confirm('Tem certeza de que quer excluir esse card?')) {
            const newKanban = {
                columns: kanban.columns,
                cards: [...kanban.cards.slice(0, index), ...kanban.cards.slice(index + 1)],
            };

            saveAndCloseModal(newKanban);
        }
    }

    function saveCard (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const index = kanban.cards.findIndex((card) => card.id == props.card?.id);

        const newKanban: KanbanData = {
            columns: kanban.columns,
            cards: [],
        }

        const now = Date.now();

        if (index < 0) {
            const newCard: Card = {
                id: nanoid(),
                title: titleInput,
                description: descriptionInput,
                order: 1,
                columnId: props.columnId,
                creationDate: now,
                timeTracker: {
                    [props.columnId]: 0,
                },
                lastChange: now,
            }

            newKanban.cards = [
                ...kanban.cards,
                newCard
            ]
        }
        else {
            if (confirm('Tem certeza de que quer alterar esse card?') == false) {
                return
            }
            
            const cardToUpdate = kanban.cards[index];
            const newTimeTracker = {...cardToUpdate.timeTracker};
            newTimeTracker[props.columnId] += (now - cardToUpdate.lastChange) / 1000;

            const updatedCard: Card = {
                id: cardToUpdate.id,
                title: titleInput,
                description: descriptionInput,
                order: cardToUpdate.order,
                columnId: props.columnId,
                creationDate: cardToUpdate.creationDate,
                timeTracker: newTimeTracker,
                lastChange: now,
            }

            newKanban.cards = [
                ...kanban.cards.slice(0, index),
                updatedCard,
                ...kanban.cards.slice(index + 1),
            ];
        }

        saveAndCloseModal(newKanban);
    }

    function discardChanges(event: React.MouseEvent<HTMLButtonElement>) {
        if (confirm('Tem certeza de que quer descartar as alterações?')) {
            setModal({show: false});
        }
    }
}