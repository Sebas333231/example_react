import { useState } from "react"

export function Main() {
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ userData, setUserData ] = useState(null)

    const searchUser = async (username) => {
        try {
            const response = await fetch(`http://localhost:8000/api/User/?name=${username}`)
            const data = await response.json()
            
            if (data.length === 0) {  // Verifica si la lista está vacía
                alert("No se encontró el usuario")
            } else {
                let userFound = false;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name === username) {
                        alert(data[i].name + " Tu usuario fue encontrado satisfactoriamente")
                        userFound = true;
                        break; // Salimos del bucle ya que encontramos al usuario
                    }
                }
                if (!userFound) {
                    alert("No se encontró el usuario")
                }
            }
            setUserData(data)
            setErrorMessage('')
        } catch (error) {
            setErrorMessage(error.message)
            setUserData(null)
            setIsModalVisible(true)

        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const username = event.target.elements.username.value;
        searchUser(username)
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setErrorMessage('')
    }
   
    return (
        <>
           <form action="" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Ingrese el nomber" required />
                <button type="submit">
                    Buscar
                </button>
           </form>

           <span>
                {
                   userData ? userData.map(user => {
                    return (
                        <div key={user.id}>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    )
                   }) : 
                   <Modal isvisible={isModalVisible} message={errorMessage} onClose={closeModal} />
                }
           </span>
        </>
    )
}


// eslint-disable-next-line react/prop-types
const Modal = ({ isvisible, message, onClose }) => {
    if (!isvisible) return null
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
            </div>
            <p>{message}</p>
        </div>
    )
}