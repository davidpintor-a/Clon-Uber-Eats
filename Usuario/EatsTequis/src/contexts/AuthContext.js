import {createContext, useEffect, useState, useContext} from "react";
import { Auth,DataStore } from "aws-amplify";
import {User} from '../models/';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) =>{
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState (null);
    const sub = authUser?.attributes?.sub; 
    

    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthUser);
    }, []);
    
    useEffect(()=> {
        DataStore.query(User, (user) => user.sub("eq", sub)).then((users) => setDbUser(users[0]))
    }, [sub])

    return(
        <AuthContext.Provider value={{authUser, dbUser, sub, setDbUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);


export default AuthContextProvider;

