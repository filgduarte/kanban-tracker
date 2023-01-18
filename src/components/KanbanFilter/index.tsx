import React from 'react';
import { useRecoilState } from 'recoil';
import { kanbanFilterState } from '../../recoilState';
import { KanbanFilterProps } from '../../types';
import { FormField } from '../FormField';
import './style.css';

export function KanbanFilter({filters}: KanbanFilterProps) {
    const [filter, setFilter] = useRecoilState(kanbanFilterState);

    return (
        <div className='kanban-filter'>
            {
                Object.entries(filters).map(([label, value], index) => (
                    <div className='tab' key={index}>
                        <FormField type='radio'
                                   name='kanban-filter'
                                   id={`kanban-filter-${index}`}
                                   label={label}
                                   value={value}
                                   checked={value == filter}
                                   onChange={onChangeHandler}
                        />
                    </div>
                ))
            }
        </div>
    );

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFilter(event.target.value);
    }
}