import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { nanoid } from 'nanoid';
import { Column, KanbanData, FormColumnProps, FormCardProps } from '../../types';
import { setKanbanData } from '../../kanbanDataHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faInbox, faLayerGroup, faPause, faPlay, faTimes, faUserClock, faBan } from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(
    faCheck,
    faInbox,
    faLayerGroup,
    faPause,
    faPlay,
    faUserClock,
    faTimes,
    faBan,
);

export function FormColumn(props: FormColumnProps) {
    const iconOptions: Array<IconProp> = [
        'layer-group',
        'inbox',
        'play',
        'pause',
        'user-clock',
        'check',
        'ban',
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

    const archiveOptions = {
        'Não': 0,
        'Após 1 dia': 1440,
        'Após 1 semana': 10080,
        'Após 1 mês': 43200,
    }

    const [kanban, setKanbanState] = useRecoilState(kanbanState);
    const setModal = useSetRecoilState(modalState);

    const [titleInput, setTitleInput] = useState(props.column ? props.column.title : '');
    const [iconInput, setIconInput] = useState(props.column ? props.column.icon : iconOptions[0]);
    const [colorInput, setColorInput] = useState(props.column ? props.column.color : colorOptions[0]);
    const [orderInput, setOrderInput] = useState(props.column ? props.column.order : (kanban.columns.length + 1));
    const [archiveInput, setArchiveInput] = useState(props.column ? props.column.archiveAfter : archiveOptions['Não']);

return(
        <form className={'form ' + (props.className ?? '')}>
            <div className='form-field full-width'>
                <label htmlFor='title'>Título:</label>
                <input type='text' id='title' value={titleInput} onChange={e => setTitleInput(e.target.value)} />
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
                                <input type='radio' id={`icon-${index}`} name='icon' value={currentIcon.toString()} checked={iconInput == currentIcon} onChange={e => setIconInput(currentIcon)} />
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
                                <input type='radio' id={currentColor} name='color' value={currentColor} checked={colorInput == currentColor} key={index} onChange={e => setColorInput(e.target.value)}></input>
                            </div>
                        ))
                    }
                </fieldset>
            </div>
            <div className='form-field'>
                <label htmlFor='order'>Ordem:</label>
                <input id='order' type='number' value={orderInput} onChange={e => setOrderInput(parseInt(e.target.value))}></input>
            </div>
            <div className='form-field'>
                <label htmlFor='archive'>Arquivar cards:</label>
                <select id='archive' defaultValue={archiveInput} onChange={e => setArchiveInput(parseInt(e.target.value))}>
                    {
                        Object.entries(archiveOptions).map(([caption, seconds], index) => (
                            <option key={index} value={seconds}>{caption}</option>
                        ))
                    }
                </select>
            </div>
            <div className='form-field form-actions full-width'>
                {
                    (kanban.columns.length > 1) &&
                    <button type='button' className='action-button danger' onClick={(removeColumn)}><FontAwesomeIcon icon='trash-can' />Excluir</button>
                }
                <button type='button' className='action-button warning' onClick={(discardChanges)}><FontAwesomeIcon icon='times' />Cancelar</button>
                <button type='submit' className='action-button success' onClick={(saveColumn)}><FontAwesomeIcon icon='check' />Salvar</button>
            </div>
        </form>
    );

    function saveAndCloseModal(newKanban: KanbanData) {
        setKanbanState(newKanban);
        setKanbanData(newKanban);
        setModal({show: false})
    }

    function removeColumn (event: React.MouseEvent<HTMLElement>) {
        const index = kanban.columns.findIndex((column) => column.id == props.column?.id);
        if (index < 0) {
            alert('Não foi possível encontrar o id da coluna.');
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

    function saveColumn(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const index = kanban.columns.findIndex((column) => column.id == props.column?.id);
        let newKanban: KanbanData = {
            columns: [],
            cards: kanban.cards,
        }

        if (index < 0) {
            const newColumn: Column = {
                id: nanoid(),
                title: titleInput,
                color: colorInput,
                icon: iconInput,
                order: orderInput,
                archiveAfter: 0,
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
                title: titleInput,
                color: colorInput,
                icon: iconInput,
                order: orderInput,
                archiveAfter: archiveInput,
            }

            newKanban.columns = [
                ...kanban.columns.slice(0, index),
                columnToUpdate,
                ...kanban.columns.slice(index + 1),
            ];
        }

        saveAndCloseModal(newKanban);
    }

    function discardChanges (event: React.MouseEvent<HTMLButtonElement>) {
        if (confirm('Tem certeza de que quer descartar as alterações?')) {
            setModal({show: false});
        }
    }
}