import { useReducer, useEffect, useRef } from 'react'
import { mockData } from 'src/utils/mockData'

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? { ...action.data } : item,
      )
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.targetId))
    case 'INIT':
      return action.data
  }
  return state
}

const useDiaryLogic = (setIsDataLoaded) => {
  const [data, dispatch] = useReducer(reducer, [])

  const idRef = useRef(0)
  useEffect(() => {
    dispatch({
      type: 'INIT',
      data: mockData,
    })
    setIsDataLoaded(true)
  }, [])

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    })
    idRef.current += 1
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    })
  }
  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId,
    })
  }

  return { data, onCreate, onUpdate, onDelete }
}

export default useDiaryLogic
