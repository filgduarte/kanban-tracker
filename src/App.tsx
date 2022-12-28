import React, { useState } from 'react';
import { Header } from './components/Header';
import { KanbanBoard } from './components/KanbanBoard';
import { Column } from './interfaces/Column';
import { Card } from './interfaces/Card';
import { Modal } from './components/Modal';
import { ModalProps } from './interfaces/Modal';
import { FormColumn, FormCard } from './components/Form';
import { kanbanJSON } from './interfaces/kanbanJSON';
import { getKanbanData, setKanbanData } from './kanbanDataHandler';
import './App.css';

const [kanban, setKanban] = useState<kanbanJSON>( getKanbanData('kanbanTracker') );
const [modal, setModal] = useState<ModalProps>( {show: false, name: ''} );

function App() {
  return (
    <>
      <Header />
      <KanbanBoard columns={kanban.columns} cards={kanban.cards} callModal={callModal} />
      <Modal name={modal.name} show={modal.show}>
        {modal.children}
      </Modal>
    </>
  )
}

const updateColumn = (toUpdate: Column)  => {
  
}

const updateCard = (toUpdate: Card) => {

}

const callModal = (modalName: string, targetId?: string) => {
  switch (modalName) {
    case 'column':
      let columnToUpdate: Column | undefined;

      if (targetId) {
        columnToUpdate = kanban.columns.find(column => column.id == targetId);
      }

      setModal({
        show: true,
        name: modalName,
        children: <FormColumn column={columnToUpdate} action={updateColumn} />
      });
    break;
    
    case 'card':
      let cardToUpdate: Card | undefined;

      if (targetId) {
        cardToUpdate = kanban.cards.find(card => card.id == targetId);
      }

      setModal({
        show: true,
        name: modalName,
        children: <FormCard card={cardToUpdate} action={updateCard} />
      })
    break;

    default:
      setModal({show: false, name: ''});
    break;
  }
}

export default App