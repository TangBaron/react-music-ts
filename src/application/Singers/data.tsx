import React, { useReducer, createContext } from "react";

export const CategoryDataContext = createContext<{ data: any, categoryDispatch: any }>({ data: {}, categoryDispatch: () => { } });

export const changeCategory_context = 'CHANGE_CATEGORY';

export const changeAlpha_context = 'CHANGE_CONTEXT';

interface IState {
  category: string;
  alpha: string;
}

interface IAction {
  type: string;
  payload: string;
}

interface IProps {
  children: any
}

// 定义useRecuder中使用的reducer
const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case changeCategory_context:
      state = {
        ...state,
        'category': action.payload
      }
      return state
    case changeAlpha_context:
      state = {
        ...state,
        'alpha': action.payload
      }
      return state
    default:
      return state
  }
}

export const Data: React.FC<IProps> = (props) => {
  const [data, dispatch] = useReducer<React.Reducer<IState, IAction>>(reducer, {
    category: '',
    alpha: ''
  })
  return (
    <CategoryDataContext.Provider value={{ data, categoryDispatch: dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  )
}