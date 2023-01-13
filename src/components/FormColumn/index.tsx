import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { kanbanState } from '../../recoilState';
import { Column, FormColumnProps } from '../../types';
import { StateHandlerButton } from '../StateHandlerButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { faInbox, faLayerGroup, faPause, faPlay, faUserClock, faBan, faCheck, faTrashCan, faTimes } from '@fortawesome/free-solid-svg-icons';
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

export function FormColumn({column, className}: FormColumnProps) {
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

    const kanban = useRecoilValue(kanbanState);

    const [columnData, setColumnData] = useState<Column>({
        id: column?.id ?? '',
        title: column?.title ?? '',
        color: column?.color ?? colorOptions[0],
        icon: column?.icon ?? iconOptions[0],
        order: column?.order ?? (kanban.columns.length + 1),
        archiveAfter: column?.archiveAfter ?? archiveOptions['Não'],
    });

return(
        <form className={'form ' + (className ?? '')}>
            <div className='form-field full-width'>
                <label htmlFor='title'>Título:</label>
                <input type='text' id='title' name='title' value={columnData.title} onChange={onChangeHandler} />
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
                                <input type='radio' id={`icon-${index}`} name='icon' value={currentIcon.toString()} checked={columnData.icon == currentIcon} onChange={onChangeHandler} />
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
                                <input type='radio' id={currentColor} name='color' value={currentColor} checked={columnData.color == currentColor} key={index} onChange={onChangeHandler}></input>
                            </div>
                        ))
                    }
                </fieldset>
            </div>
            <div className='form-field'>
                <label htmlFor='order'>Ordem:</label>
                <input id='order' name='order' type='number' value={columnData.order} onChange={onChangeHandler}></input>
            </div>
            <div className='form-field'>
                <label htmlFor='archive'>Arquivar cards:</label>
                <select id='archive-after' name='archiveAfter' defaultValue={columnData.archiveAfter} onChange={onChangeHandler}>
                    {
                        Object.entries(archiveOptions).map(([caption, seconds], index) => (
                            <option key={index} value={seconds}>{caption}</option>
                        ))
                    }
                </select>
            </div>
            <div className='form-field form-actions full-width'>
            {
            (kanban.columns.length > 1 && column?.id)  &&
                <StateHandlerButton label='Excluir'
                                    className='danger'
                                    icon={faTrashCan}
                                    action='removeColumn'
                                    columnData={columnData}
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
                                    action='saveColumn'
                                    columnData={columnData}
                                    preventDefault
                />
            </div>
        </form>
    );

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setColumnData(previous => ({
            ...previous,
            [e.target.name]: e.target.value,
        }))
    }
}