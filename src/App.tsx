import { useEffect } from 'react'
import './App.css'
import AddBlockButton from './features/blocks/AddBlockButton'
import CodeEditor from './features/blocks/CodeEditor'
import { socket } from './app/socket'
import { Block, receivedUpdate } from './features/blocks/blocksSlice'
import UserIdInput from './features/blocks/UserIdInput'
import { useAppDispatch } from './app/hooks'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleUpdate(data: Block[]) {
      dispatch(receivedUpdate(data));
    }

    socket.on('update', handleUpdate);

    return () => {
      socket.off('update', handleUpdate);
    }
  }, [dispatch])

  return (
    <>
      <div>
        <AddBlockButton />
        <UserIdInput />
        <CodeEditor />
      </div>
    </>
  )
}

export default App
