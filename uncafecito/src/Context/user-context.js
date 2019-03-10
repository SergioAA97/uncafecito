import React from 'react';

export const data = {
    
    group: {
      cohorte: "",
      users: [],
    },
    user:{
        username: ""
    }
  };

  export const UserContext = React.createContext(
    data
  );