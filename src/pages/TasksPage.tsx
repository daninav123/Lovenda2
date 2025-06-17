import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './TasksPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import {
  Task,
  addTask,
  updateTask,
  deleteTask,
  setTaskStatus
} from '../store/tasksSlice'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd'

const assignees = ['Alice', 'Bob', 'Carol']

const TasksPage: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const dispatch = useDispatch()
  const [tab, setTab] = useState<'list' | 'kanban'>('list')

  const [form, setForm] = useState<Partial<Task>>({
    title: '',
    description: '',
    assignee: assignees[0],
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium',
    status: 'todo'
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return
    if (form.id) {
      dispatch(updateTask(form as Task))
    } else {
      dispatch(addTask({ ...(form as Task), id: uuidv4() }))
    }
    setForm({
      title: '',
      description: '',
      assignee: assignees[0],
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      priority: 'medium',
      status: 'todo'
    })
  }

  const tasksByDate = tasks.reduce<Record<string, Task[]>>((acc, task) => {
    const date = task.dueDate
    if (!acc[date]) acc[date] = []
    acc[date].push(task)
    return acc
  }, {})

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const taskId = result.draggableId
    const newStatus = result.destination.droppableId as Task['status']
    dispatch(setTaskStatus({ id: taskId, status: newStatus }))
  }

  return (
    <div>
      <div>
        <button onClick={() => setTab('list')}>Lista</button>
        <button onClick={() => setTab('kanban')}>Kanban</button>
      </div>

      {tab === 'list' && (
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <h3>Crear / Editar Tarea</h3>
            <form onSubmit={onSubmit}>
              <input
                placeholder="Título"
                value={form.title || ''}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                placeholder="Descripción"
                value={form.description || ''}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
              <select
                value={form.assignee}
                onChange={e => setForm({ ...form, assignee: e.target.value })}
              >
                {assignees.map(a => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <input
                type="date"
                value={form.dueDate}
                onChange={e => setForm({ ...form, dueDate: e.target.value })}
              />
              <select
                value={form.priority}
                onChange={e =>
                  setForm({ ...form, priority: e.target.value as Task['priority'] })
                }
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
              <button type="submit">Guardar</button>
            </form>

            <ul>
              {tasks.map(t => (
                <li key={t.id}>
                  <input
                    type="checkbox"
                    checked={t.status === 'done'}
                    onChange={e =>
                      dispatch(
                        setTaskStatus({
                          id: t.id,
                          status: e.target.checked ? 'done' : 'todo'
                        })
                      )
                    }
                  />
                  {t.title} - {t.assignee} - {t.dueDate}
                  <button onClick={() => setForm(t)}>Editar</button>
                  <button onClick={() => dispatch(deleteTask(t.id))}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Calendario</h3>
            <Calendar
              tileClassName={({ date }) => {
                const d = format(date, 'yyyy-MM-dd')
                return tasksByDate[d] ? 'has-task' : undefined
              }}
            />
          </div>
        </div>
      )}

      {tab === 'kanban' && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {(['todo', 'in-progress', 'done'] as Task['status'][]).map(status => (
              <Droppable droppableId={status} key={status}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ border: '1px solid gray', padding: '0.5rem', width: 250 }}
                  >
                    <h4>
                      {status === 'todo'
                        ? 'Por hacer'
                        : status === 'in-progress'
                        ? 'En curso'
                        : 'Completadas'}
                    </h4>
                    {tasks
                      .filter(t => t.status === status)
                      .map((t, index) => (
                        <Draggable key={t.id} draggableId={t.id} index={index}>
                          {prov => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              style={{
                                padding: '0.5rem',
                                margin: '0.5rem',
                                background: '#eee',
                                ...prov.draggableProps.style
                              }}
                            >
                              {t.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  )
}

export default TasksPage
