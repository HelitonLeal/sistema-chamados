import { useState, useEffect, createContext } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        function loadStorage(){

            const storageUser = localStorage.getItem('SistemaUser');
    
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, [])


    // LOGIN DO USUÁRIO
    async function signIn(email, password){
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            };            
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem vindo ao Sistema!');
        })
        .catch((error) => {
            console.log(error);
            toast.error('Algo deu Errado!!');
            setLoadingAuth(false);
        })
    }
 

    // CADASTRANDO NOVO USUÁRIO
    async function signUp(email, password, nome){
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,
            })
            .then(() => {

                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Sucesso ao cadastar!!');
            })
        })
        .catch((error) => {
            console.log(error);
            toast.error('Algo deu Errado!!');
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return(
        <AuthContext.Provider 
        value={{ signed: !!user, 
            user, loading, 
            signUp, 
            signOut, 
            signIn, 
            loadingAuth, 
            setUser, 
            storageUser  
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;