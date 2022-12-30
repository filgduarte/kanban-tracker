import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useRecoilValue } from 'recoil';
import { kanbanState } from '../../recoilState';
import { Card, kanbanData, FormCardProps } from '../../types';
import { closeModal, saveAndCloseModal } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export function FormCard(props: FormCardProps) {
    const kanban = useRecoilValue(kanbanState);

    const removeCard = (event: React.MouseEvent<HTMLElement>) => {
        // const index = kanban.columns.findIndex((column) => column.id == props.column?.id);
        // if (index < 0) {
        //     alert('Não foi possível encontrar o id da coluna');
        //     return
        // };

        // if (confirm('Tem certeza de que quer excluir essa coluna?')) {
        //     const newKanban = {
        //         columns: [...kanban.columns.slice(0, index), ...kanban.columns.slice(index + 1)],
        //         cards: kanban.cards,
        //     };

        //     saveAndCloseModal(newKanban);
        // }
    }

    const saveCard = (event: React.MouseEvent<HTMLButtonElement>) => {
        // event.preventDefault();
        // const index = kanban.columns.findIndex((column) => column.id == props.column?.id);
        // let newKanban: kanbanData = {
        //     columns: [],
        //     cards: kanban.cards,
        // }

        // if (index < 0) {
        //     const newColumn: Column = {
        //         id: nanoid(),
        //         title: title,
        //         color: color,
        //         icon: icon,
        //         order: order,
        //     }

        //     newKanban.columns = [
        //         ...kanban.columns,
        //         newColumn
        //     ]
        // }
        // else {
        //     if (confirm('Tem certeza de que quer alterar essa coluna?') == false) {
        //         return
        //     }

        //     const columnToUpdate: Column = {
        //         id: kanban.columns[index].id,
        //         title: title,
        //         color: color,
        //         icon: icon,
        //         order: order,
        //     }

        //     newKanban.columns = [
        //         ...kanban.columns.slice(0, index),
        //         columnToUpdate,
        //         ...kanban.columns.slice(index + 1),
        //     ];
        // }

        // saveAndCloseModal(newKanban);
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