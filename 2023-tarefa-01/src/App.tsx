import { ChangeEvent, FormEvent, useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from  'lodash';

type InputProps = {
  type: string,
  placeholder: string,
  className: string,
  value: string,
  required: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
const Input = ({ onChange, type, placeholder, className, value, required}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  )
}

type FilterButtonProps = {
  role: string,
  className: string,
  text: string,
  onClick: () => void
}
const FilterButton = ({ role, className, text, onClick }: FilterButtonProps) => {

  return (
    <li
      role={role}
      className={className}
    >
      <a href="#" onClick={onClick} className="nav-link" >{text}</a>
    </li>
  )
}

type CardsProps = {
  texto: string,
  handleRemoveItem: (event: FormEvent) => void,
  expected: number
}

const CardToDo = ({ texto, handleRemoveItem, expected }: CardsProps) => {
  const [isChecked, setIsChecked] = useState(false);

  function vaiMostrar(){
    if(expected===0){
      return true
    }
    if(expected===1){
      return isChecked
    }
    if(expected===2){
      return !isChecked
    }
  }

  return (
    <>
      {(vaiMostrar()) ? (
        <div className={isChecked ? "todo-item complete" : "todo-item"}>
          <div className="checker">
            <input type="checkbox" checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
          </div>
          <span> {texto} </span>
          <a className="float-right remove-todo-item" 
              onClick={handleRemoveItem}>
              <FontAwesomeIcon icon={faTrash} /></a>
        </div>)
        :
        null
      }
    </>
  )
}

function App() {
  const [task, setTask] = useState('')
  const [item, setItem] = useState<string[]>([]);
  const [expected, setExpected] = useState(0)

  console.log(item)

  function handleAddItem(event: FormEvent) {
    event.preventDefault();
    if (isEmpty(task.trim())) {
      alert('Digite um nome válido para sua task!')
      return;
    }
    setItem([...item, task])
    setTask('')

  }

  const handleTaskCHange= (e:React.ChangeEvent<HTMLInputElement>) =>{
    setTask(e.target.value)
  }

  const isTaskEmpty = isEmpty(task.trim())

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body"></div>
              <h5 className="card-title">Todo List</h5>
              <form onSubmit={handleAddItem}>
                <Input
                  type='text'
                  value={task}
                  placeholder='Adicione sua tarefa...'
                  className={`form-control ${isTaskEmpty ? 'empty-input' : ''}`}
                  onChange={handleTaskCHange}
                  required
                  />
              </form>
              <ul className="nav nav-pills todo-nav">
                <FilterButton
                  role='presentation'
                  className='nav-item all-task active'
                  text='All'
                  onClick= {() => setExpected(0)}
                />
                <FilterButton
                  role='presentation'
                  className='nav-item completed-task'
                  text='Completed'
                  onClick= {() => setExpected(1)}
                />
                <FilterButton
                  role='presentation'
                  className='nav-item active-task'
                  text='Active'
                  onClick= {() => setExpected(2)}
                />
              </ul>
              <div className="todo-list">
                {item.map((item) => (
                  <CardToDo
                    texto={item}
                    handleRemoveItem={(event) => {
                      event.preventDefault()
                      setItem((oldItem) => oldItem.filter((e) => e !== item))
                    }}
                    expected={expected}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
