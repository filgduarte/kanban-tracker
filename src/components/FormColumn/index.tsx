import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { kanbanState } from '../../recoilState';
import { Column, FormColumnProps } from '../../types';
import { FormField } from '../FormField';
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
            <FormField type='text'
                       name='title'
                       label='Título:'
                       value={columnData.title}
                       className='full-width'
                       onChange={onChangeHandler}
                       required
            />
            <div className='form-field'>
                <fieldset>
                    <legend>Ícone:</legend>
                    {
                        iconOptions.map((currentIcon, index) => (
                            <FormField type='radio'
                                       name='icon'
                                       label={<FontAwesomeIcon icon={currentIcon} />}
                                       value={currentIcon.toString()}
                                       id={`icon-${index}`}
                                       className='input-icon'
                                       checked={columnData.icon == currentIcon}
                                       key={index}
                                       onChange={onChangeHandler}
                                       required
                            />
                        ))
                    }
                </fieldset>
            </div>
            <div className='form-field'>
                <fieldset>
                    <legend>Cor:</legend>
                    {
                        colorOptions.map((currentColor, index) => (
                            <FormField type='radio'
                                       name='color'
                                       label={currentColor}
                                       value={currentColor}
                                       id={currentColor}
                                       className={`input-color ${currentColor}`}
                                       checked={columnData.color == currentColor}
                                       key={index}
                                       onChange={onChangeHandler}
                                       required
                            />
                        ))
                    }
                </fieldset>
            </div>
            <FormField type='number'
                       name='order'
                       label='Ordem:'
                       value={columnData.order}
                       onChange={onChangeHandler}
            />
            <FormField type='select'
                       name='archiveAfter'
                       label='Arquivar cards:'
                       value={columnData.archiveAfter}
                       id='archive-after'
                       defaultValue={columnData.archiveAfter}
                       onChange={onChangeHandler}
                       required
            >
                {
                    Object.entries(archiveOptions).map(([caption, seconds], index) => (
                        <option key={index} value={seconds}>{caption}</option>
                    ))
                }
            </FormField>
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