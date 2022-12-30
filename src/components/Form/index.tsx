import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { nanoid } from 'nanoid';
import { Column } from '../../interfaces/Column';
import { kanbanJSON } from '../../interfaces/kanbanJSON';
import { FormColumnProps, FormCardProps } from '../../interfaces/Form';
import { setKanbanData } from '../../kanbanDataHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheck,
    faDownload,
    faInbox,
    faLayerGroup,
    faPause,
    faPlay,
    faTimes,
    faTrashCan,
    faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(
    faCheck,
    faInbox,
    faLayerGroup,
    faPause,
    faPlay,
    faTrashCan,
    faUserClock,
    faDownload,
    faTimes,
);



export function FormColumn(props: FormColumnProps) {
    const iconOptions: Array<IconProp> = [
        'layer-group',
        'inbox',
        'play',
        'pause',
        'user-clock',
        'check',
        'trash-can',
    ];

    const colorOptions = [
        'color-1',
        'color-2',
        'color-3',
        'color-4',
        'color-5',
        'color-6',
        'color-7',
    ];

    const [title, setTitle] = useState(props.column ? props.column.title : '');
    const [icon, setIcon] = useState(props.column ? props.column.icon : iconOptions[0]);
    const [color, setColor] = useState(props.column ? props.column.color : colorOptions[0]);
    const [order, setOrder] = useState(props.column ? props.column.order : 1);
    const [kanban, setKanban] = useRecoilState(kanbanState);
    const setModal = useSetRecoilState(modalState);

    function closeModal(event: React.MouseEvent<HTMLButtonElement>) {
        setModal({
            show: false,
            title: '',
        })
    }

    function saveAndCloseModal(newKanban: kanbanJSON) {
        setKanban(newKanban);
        setKanbanData('kanbanTracker', newKanban);
        setModal({
            show: false,
            title: '',
        })
    }

    const removeColumn = (event: React.MouseEvent<HTMLElement>) => {
        const index = kanban.columns.findIndex((column) => column.id == props.column?.id);
        if (index < 0) {
            alert('Não foi possível encontrar o id da coluna');
            return
        };

        if (confirm('Tem certeza de que quer excluir essa coluna?')) {
            const newKanban = {
                columns: [...kanban.columns.slice(0, index), ...kanban.columns.slice(index + 1)],
                cards: kanban.cards,
            };

            saveAndCloseModal(newKanban);
        }
    }

    const saveColumn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const index = kanban.columns.findIndex((column) => column.id == props.column?.id);
        let newKanban: kanbanJSON = {
            columns: [],
            cards: kanban.cards,
        }

        if (index < 0) {
            const newColumn: Column = {
                id: nanoid(),
                title: title,
                color: color,
                icon: icon,
                order: order,
            }

            newKanban.columns = [
                ...kanban.columns,
                newColumn
            ]
        }
        else {
            if (confirm('Tem certeza de que quer alterar essa coluna?') == false) {
                return
            }

            const columnToUpdate: Column = {
                id: kanban.columns[index].id,
                title: title,
                color: color,
                icon: icon,
                order: order,
            }

            newKanban.columns = [
                ...kanban.columns.slice(0, index),
                columnToUpdate,
                ...kanban.columns.slice(index + 1),
            ];
        }

        saveAndCloseModal(newKanban);
    }

    const discardChanges = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (confirm('Tem certeza de que quer descartar as alterações?')) {
            closeModal(event);
        }
    }

    return(
        <form className={'form ' + (props.className ?? '')}>
            <div className='form-field full-width'>
                <label htmlFor='title'>Título:</label>
                <input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className='form-field'>
                <fieldset>
                    <legend>Ícone:</legend>
                    {
                        iconOptions.map((currentIcon, index) => (
                            <div className='input-icon' key={index}>
                                <label htmlFor={`icon-${index}`}>
                                    <FontAwesomeIcon icon={currentIcon} />
                                </label>
                                <input type='radio' id={`icon-${index}`} name='icon' value={currentIcon.toString()} checked={icon == currentIcon} onChange={e => setIcon(currentIcon)} />
                            </div>
                        ))
                    }
                </fieldset>
            </div>
            <div className='form-field'>
                <fieldset>
                    <legend>Cor:</legend>
                    {
                        colorOptions.map((currentColor, index) => (
                            <div className='input-color' key={index}>
                                <label htmlFor={currentColor} className={currentColor}>
                                    {currentColor}
                                </label>
                                <input type='radio' id={currentColor} name='color' value={currentColor} checked={color == currentColor} key={index} onChange={e => setColor(e.target.value)}></input>
                            </div>
                        ))
                    }
                </fieldset>
            </div>
            <div className='form-field full-width'>
                <label htmlFor='order'>Ordem:</label>
                <input id='order' type='number' value={order} onChange={e => setOrder(parseInt(e.target.value))}></input>
            </div>
            <div className='form-field full-width'>
                {
                    (kanban.columns.length > 1) &&
                    <button type='button' className='action-button danger' onClick={(removeColumn)}><FontAwesomeIcon icon='trash-can' />Excluir</button>
                }
                <button type='button' className='action-button warning' onClick={(discardChanges)}><FontAwesomeIcon icon='times' />Cancelar</button>
                <button type='submit' className='action-button success' onClick={(saveColumn)}><FontAwesomeIcon icon='download' />Salvar</button>
            </div>
        </form>
    )
}

export function FormCard(props: FormCardProps) {
    return(
        <form className={'form ' + (props.className ?? '')}>
            <div className='form-field'>
                <label htmlFor='title'>Título:</label>
                <input name='title' type='text' value={(props.card ? props.card.title : '')}></input>
            </div>
        </form>
    )
}