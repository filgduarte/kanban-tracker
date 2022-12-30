import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { Card, kanbanData, FormCardProps } from '../../types';
import { setKanbanData } from '../../kanbanDataHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export function FormCard(props: FormCardProps) {
    const [kanban, setKanban] = useRecoilState(kanbanState);
    const setModal = useSetRecoilState(modalState);
    function closeModal(event: React.MouseEvent<HTMLButtonElement>) {
        setModal({
            show: false,
            title: '',
        })
    }

    function saveAndCloseModal(newKanban: kanbanData) {
        setKanban(newKanban);
        setKanbanData('kanbanTracker', newKanban);
        setModal({
            show: false,
            title: '',
        })
    }

    const removeCard = (event: React.MouseEvent<HTMLElement>) => {
        
    }

    const saveCard = (event: React.MouseEvent<HTMLButtonElement>) => {
        
    }

    const discardChanges = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (confirm('Tem certeza de que quer descartar as alterações?')) {
            closeModal(event);
        }
    }

    return(
        <form className={'form ' + (props.className ?? '')}>
            <div className='form-field'>
                <label htmlFor='title'>Título:</label>
                <input name='title' type='text' value={(props.card ? props.card.title : '')}></input>
            </div>
            <div className='form-field full-width'>
                {
                    (kanban.columns.length > 1) &&
                    <button type='button' className='action-button danger' onClick={(removeCard)}><FontAwesomeIcon icon={faTrashCan} />Excluir</button>
                }
                <button type='button' className='action-button warning' onClick={(discardChanges)}><FontAwesomeIcon icon={faTimes} />Cancelar</button>
                <button type='submit' className='action-button success' onClick={(saveCard)}><FontAwesomeIcon icon={faDownload} />Salvar</button>
            </div>
        </form>
    )
}