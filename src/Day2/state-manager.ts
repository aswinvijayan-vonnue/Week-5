function createStore<S, A extends { action: string }>(
  initialState: S,
  reducer: (state: S, action: A) => S
) {
  let state = initialState;
  const listeners: ((state: S) => void)[] = [];
  return {
    getState() {
      return state;
    },
    dispatch(action: A) {
      // Update state
      state = reducer(state, action);
      console.log('after :', action.action);
      console.log('state', (state as KanbanState).column);
      // Notify subscribers
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener: (state: S) => void): void {
      listeners.push(listener);
      // TODO: Return unsubscribe function
    },
  };
}

interface Card {
  id: string;
  title: string;
}
interface KanbanState {
  column: Record<string, Card[]>;
}

type KanbanAction =
  | { action: 'ADD_CARD'; payload: { columnId: string; card: Card } }
  | { action: 'REMOVE_CARD'; payload: { columnId: string; cardId: string } }
  | { action: 'MOVE_CARD'; payload: { sourceId: string; targetId: string; card: Card } };

function reducer(state: KanbanState, action: KanbanAction) {
  switch (action.action) {
    case 'ADD_CARD': {
      const { columnId, card } = action.payload;
      const targetColumn = state.column[columnId] || [];
      const newData = {
        ...state,
        column: { ...state.column, [columnId]: [...targetColumn, card] },
      };
      return newData;
    }

    case 'REMOVE_CARD': {
      const id = action.payload.columnId;
      const cards = state.column[id];
      const updatedCards = cards.filter((card) => card.id !== action.payload.cardId);
      return {
        ...state,
        column: { ...state.column, [id]: [...updatedCards] },
      };
    }
    case 'MOVE_CARD': {
      const { sourceId, targetId, card } = action.payload;
      const targetColumn = state.column[targetId] || [];
      const cards_after_deletion = state.column[sourceId].filter((cd) => cd.id !== card.id);
      return {
        ...state,
        column: {
          ...state.column,
          [targetId]: [...targetColumn, card],
          [sourceId]: [...cards_after_deletion],
        },
      };
    }
  }
}

const initialState: KanbanState = { column: {} };

const store = createStore(initialState, reducer);
const div1 = 'todo';
const div2 = 'inprogress';
const div3 = 'completed';
const card1: Card = {
  id: '200',
  title: 'card1',
};
const card2: Card = {
  id: '201',
  title: 'card2',
};
const card3: Card = {
  id: '202',
  title: 'card3',
};
const card4: Card = {
  id: '203',
  title: 'card4',
};
const card5: Card = {
  id: '204',
  title: 'card5',
};

const action1: KanbanAction = { action: 'ADD_CARD', payload: { columnId: div1, card: card1 } };
store.dispatch(action1);
const action2: KanbanAction = { action: 'ADD_CARD', payload: { columnId: div1, card: card2 } };
store.dispatch(action2);
const action3: KanbanAction = { action: 'ADD_CARD', payload: { columnId: div2, card: card3 } };
store.dispatch(action3);
const action4: KanbanAction = {
  action: 'MOVE_CARD',
  payload: { sourceId: div1, targetId: div3, card: card2 },
};
store.dispatch(action4);
const action5: KanbanAction = { action: 'ADD_CARD', payload: { columnId: div3, card: card4 } };
store.dispatch(action5);
const action6: KanbanAction = { action: 'ADD_CARD', payload: { columnId: div3, card: card5 } };
store.dispatch(action6);
const action7: KanbanAction = {
  action: 'REMOVE_CARD',
  payload: { columnId: div3, cardId: card5.id },
};
store.dispatch(action7);

// const initialState = {
//   route: {
//     path: '/',
//     params: {},
//   },
// };
// function reducer<S, A extends { type: string }>(state:S, action:A) {
//   console.log(state);
//   switch (action.type) {
//     case 'ROUTE_CHANGED':
//       return {
//         ...state,
//         route: action.payload,
//       };
//     case 'CREATE_MOVIE':
//       const currentMovies = state.movies || [];
//       return {
//         ...state,
//         movies: [...currentMovies, action.payload],
//       };
//     case 'USER_CHANGED':
//       return {
//         ...state,
//         username: action.payload,
//       };
//     case 'DELETE_MOVIE':
//       const existingMovies = state.movies || [];
//       const updatedMovies = existingMovies.filter((movie) => movie.id !== action.payload);
//       return {
//         ...state,
//         movies: updatedMovies,
//       };

//     default:
//       return state;
//   }
// }
// let instance = localStorage.getItem('store');
// console.log(instance);
// let baseState;
// if (instance) {
//   baseState = JSON.parse(instance);
// }
// export const store = instance
//   ? createStore(baseState, reducer)
//   : createStore(initialState, reducer);

// function onRouteChange(path, params) {
//   store.dispatch({
//     type: 'ROUTE_CHANGED',
//     payload: {
//       path,
//       params,
//     },
//   });
// }
