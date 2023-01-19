import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { nanoid } from 'nanoid';
import { KanbanData, Column, Card, ActionButtonProps } from '../../types';
import { setKanbanData } from '../../kanbanDataHandler';
import { ActionButton } from "../ActionButton";

interface StateHandlerButtonProps extends ActionButtonProps {
    action: string;
    preventDefault?: boolean;
    columnData?: Column;
    cardData?: Card;
    ignoreConfirmation?: boolean;
}

interface Actions {
    [key: string]: () => boolean;
}

export function StateHandlerButton({onClick, action, preventDefault, columnData, cardData, ignoreConfirmation, ...rest}: StateHandlerButtonProps) {
    const [kanban, setKanban] = useRecoilState(kanbanState);
    const setModal = useSetRecoilState(modalState);
    let updateKanban = true;
    
    const askForConfirmation = !ignoreConfirmation; // FOR READABILITY ONLY

    return(
        <ActionButton onClick={e => doAction(e)} {...rest} />
    )

    function doAction(event: React.MouseEvent<HTMLButtonElement>) {
        if (preventDefault) event.preventDefault();

        const newKanban: KanbanData = {
            columns: [...kanban.columns],
            cards: [...kanban.cards],
        }
        const stateActions: Actions = {
            saveColumn: () => {
                if (!columnData) {
                    alert('Nenhuma informação de Coluna para salvar');
                    return false;
                }

                const index = kanban.columns.findIndex((column) => column.id == columnData.id);

                if (index < 0) {
                    const newColumn: Column = {
                        id: nanoid(),
                        title: columnData.title,
                        color: columnData.color,
                        icon: columnData.icon,
                        order: columnData.order,
                        archiveAfter: 0,
                    }

                    newKanban.columns.push(newColumn);
                }
                else {
                    if (askForConfirmation && 
                        confirm('Tem certeza de que quer alterar essa coluna?') == false
                    ) {
                        return false;
                    }

                    const columnToUpdate: Column = {
                        id: kanban.columns[index].id,
                        title: columnData.title,
                        color: columnData.color,
                        icon: columnData.icon,
                        order: columnData.order,
                        archiveAfter: columnData.archiveAfter,
                    }

                    newKanban.columns = [
                        ...kanban.columns.slice(0, index),
                        columnToUpdate,
                        ...kanban.columns.slice(index + 1),
                    ];
                }

                return true;
            },

            removeColumn: () => {
                const index = kanban.columns.findIndex((column) => column.id == columnData?.id);
                if (index < 0) {
                    alert('Não foi possível encontrar o id da coluna.');
                    return false;
                };

                if (confirm('Tem certeza de que quer excluir essa coluna?') == false) {
                    return false;
                }
                
                newKanban.columns = [...kanban.columns.slice(0, index), ...kanban.columns.slice(index + 1)];
                return true;
            },

            saveCard: () => {
                if (!cardData) {
                    alert('Nenhuma informação de Card para salvar');
                    return false;
                }

                const index = kanban.cards.findIndex((card) => card.id == cardData.id);
                const now = Date.now();

                if (index < 0) {
                    const newCard: Card = {
                        id: nanoid(),
                        title: cardData.title,
                        description: cardData.description,
                        order: 1,
                        columnId: cardData.columnId,
                        creationDate: now,
                        timeTracker: {
                            [cardData.columnId]: 0,
                        },
                        lastChange: now,
                    }

                    newKanban.cards.push(newCard);
                }
                else {
                    if (askForConfirmation && 
                        confirm('Tem certeza de que quer alterar esse card?') == false
                    ) {
                        return false;
                    }
                    
                    const cardToUpdate = kanban.cards[index];
                    const newTimeTracker = {...cardToUpdate.timeTracker};
                    // update current column
                    newTimeTracker[cardToUpdate.columnId] += Math.round((now - cardToUpdate.lastChange) / 1000);
                    // update destiny column
                    console.log(cardData.columnId);
                    console.log(newTimeTracker[cardData.columnId]);
                    newTimeTracker[cardData.columnId] = newTimeTracker[cardData.columnId] ?? 0;

                    const updatedCard: Card = {
                        id: cardToUpdate.id,
                        title: cardData.title,
                        description: cardData.description,
                        order: cardToUpdate.order,
                        columnId: cardData.columnId,
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

                return true;
            },

            removeCard: () => {
                const index = kanban.cards.findIndex((card) => card.id == cardData?.id);
                if (index < 0) {
                    alert('Não foi possível encontrar o id do card.');
                    return false;
                };

                if (confirm('Tem certeza de que quer excluir esse card?') == false) {
                    return false;
                }

                newKanban.cards = [...kanban.cards.slice(0, index), ...kanban.cards.slice(index + 1)];
                return true;
            },

            discardChanges: () => {
                if (askForConfirmation && 
                    confirm('Tem certeza de que quer descartar as alterações?') == false
                ) {
                    return false;
                }

                updateKanban = false;
                return true;
            },
        }

        if (!stateActions[action]) {
            alert('Ação não reconhecida.');
            return
        };

        if ( stateActions[action]() ) {
            if (updateKanban) {
                setKanban(newKanban);
                setKanbanData(newKanban);
            }
            
            setModal({show: false});
        }
    }
}