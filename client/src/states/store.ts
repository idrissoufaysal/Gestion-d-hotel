import { create } from "zustand";
import { State, StoreState } from "../utils/types";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

const INITIAL_STATE: State = {
  city: undefined,
  dates: { from: new Date(Date.now()), to: addDays(new Date(Date.now()), 10) },
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const useSearchStore = create<StoreState>((set) => ({
  ...INITIAL_STATE,
  setCity: (city) => set({ city }),
  setDates: (dates:DateRange |undefined) => set({ dates }),
  setOptions: (options) => set({ options }),
  resetSearch: () => set(INITIAL_STATE),
}));

// export const SearchContext = createContext(INITIAL_STATE)
// const SearchReducer => (state: any, action: { type: any; payload: any; }) {
//     switch (action.type) {
//         case "NEW_SEARCH":
//             return action.payload
//         case "RESET_SEARCH":
//             return INITIAL_STATE
//         default:
//             return state;
//     }
// }

// export const SearchContextProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
//     return (
//         <SearchContext.Provider
//             value={{ city: state.city, dates: state.dates, options: state.options, dispatch }}
//         >
//             {children}
//         </SearchContext.Provider>
//     )

// }
