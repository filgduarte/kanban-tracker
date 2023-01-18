import { HTMLInputTypeAttribute } from 'react';
import './style.css';

interface FormFieldProps {
    type: HTMLInputTypeAttribute | 'textarea' | 'select';
    name: string;
    label: React.ReactNode;
    placeholder?: string;
    value?: string | number;
    defaultValue?: string | number;
    checked?: boolean;
    defaultChecked?: boolean;
    required?: boolean;
    id?: string;
    className?: string;
    children?: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function FormField(props: FormFieldProps) {
    const fieldId = props.id ?? props.name;

    return(
        <div className={'form-field ' + (props.className ?? '')}>
                <label htmlFor={fieldId}>
                    {props.label}
                </label>
                {renderElement()}
        </div>
    );

    function renderElement() {
        switch (props.type) {
            default:
                return(
                    <input type={props.type}
                           name={props.name}
                           id={fieldId}
                           value={props.value}
                           placeholder={props.placeholder}
                           checked={props.checked}
                           defaultChecked={props.defaultChecked}
                           required={props.required}
                           onChange={props.onChange}
                    />
                );
    
            case 'textarea':
                return(
                    <textarea name={props.name}
                              id={fieldId}
                              placeholder={props.placeholder}
                              required={props.required}
                              onChange={props.onChange}
                    >
                        {props.value}
                    </textarea>
                );
    
            case 'select':
                return(
                    <select name={props.name}
                            id={fieldId}
                            defaultValue={props.defaultValue}
                            required={props.required}
                            onChange={props.onChange}
                    >
                        {props.children ?? ''}
                    </select>
                );
        }
    }
}