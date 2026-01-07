import { createContext, useContext } from "react";

export const CurrChatContext = createContext({
    currChat: null,
    setCurrChat: () => { }

})

export const CurrChatProvider = CurrChatContext.Provider;

export default function useCurrChat() {
    return useContext(CurrChatContext);
}