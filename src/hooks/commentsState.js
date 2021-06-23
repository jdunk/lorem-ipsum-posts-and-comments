import { createContext, useContext, useState } from 'react';

const CommentsState = createContext({});

function CommentsStateProvider({ children }) {
  const [commentsState, setCommentsState] = useState({
    dialogOpen: false,
    postId: null,
    postTitle: '',
  });
  const [userComments, setUserComments] = useState({});

  return (
    <CommentsState.Provider
      value={{          
        commentsState,
        setCommentsState,
        userComments,
        setUserComments
      }}
    >
      {children}
    </CommentsState.Provider>
  );
}

const useCommentsState = () => useContext(CommentsState);

export {
  CommentsStateProvider,
  useCommentsState,
};
