import { createContext, useState } from "react";

export const PostContext = createContext(null);
export const PostProvider = ({children})=>{

    const [post , setPost]= useState(null);
    return(
        <PostContext.Provider value={{post ,setPost}}>
            {children}
        </PostContext.Provider>
    );
};