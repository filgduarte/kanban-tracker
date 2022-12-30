import { RecoilRoot } from 'recoil';
import { Header } from './components/Header';
import { KanbanBoard } from './components/KanbanBoard';
import { Modal } from './components/Modal';
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <Header />
      <KanbanBoard />
      <Modal />
    </RecoilRoot>
  )
}

export default App