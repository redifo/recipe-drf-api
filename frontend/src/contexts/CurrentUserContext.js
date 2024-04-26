import React from 'react'
import axios from 'axios';

export const CurrentUserContext = React.createContext()
export const SetCurrentUserContext = React.createContext()

export const useCurrentUser = () => React.useContext(CurrentUserContext)
export const useSetCurrentUser = () => React.useContext(SetCurrentUserContext)


export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null)

    const handleMount = async () => {
        try {
            const { data } = await axios.get('/api/dj-rest-auth/user/')
            setCurrentUser(data)
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        handleMount()
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
};
