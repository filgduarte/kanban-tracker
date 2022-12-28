import { FormColumnProps, FormCardProps } from "../../interfaces/Form";

export function FormColumn(props: FormColumnProps) {
    return(
        <form className={props.className ?? ''}>
            <div className='form-field'>
                <label htmlFor='title'>Título:</label>
                <input name='titulo' type='text' value={(props.column ? props.column.title : '')}></input>
            </div>
        </form>
    )
}

export function FormCard(props: FormCardProps) {
    return(
        <form className={props.className ?? ''}>
            <div className='form-field'>
                <label htmlFor='title'>Título:</label>
                <input name='titulo' type='text' value={(props.card ? props.card.title : '')}></input>
            </div>
        </form>
    )
}