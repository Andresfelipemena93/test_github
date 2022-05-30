import './index.css';
import GitHubLogo from '../../assets/images/gitgub.svg'
import {useState} from "react";
import API from "../../API/axios";
import ModalComponent from "../../components/modal";
export default function MainContainer() {

    // ESTE ESTADO RECIBE LA LISTA DE USUARIOS DE LA API
   const [users, setUsers] = useState([])

    // INDICA SI EL MODAL ESTA ABIERTO
    const [isOpen, setIsOpen] = useState(false)

    // INDICA EL QUERY DE LA BUSQUEDA
    const [username, setUsername] = useState('')

    // ESTE ESTADO ES EL NOMBRE DE USUARIO QUE SE QUIERE BUSCAR
    const [query, setQuery] = useState('')

    // ESTA FUNCION SE EJECUTA CUANDO EL USUARIO LE DA EN BUSCAR (SUBMIT)
    async function handleSubmit(e) {
       e.preventDefault();

        // AQUI NOS CONECTAMOS A LA API POR MEDIO DE AXIOS
        API.getAllUser(query).then((res) => {
           if(res) {
               // AQUI OBTENEMOS LA RESPUESTA (LISTA DE USUARIOS) Y LOS GUARDAMOS EN EL ESTADO DE USERS
               setUsers(res.items)
           }
       }).catch((err) => {
           console.error(err)
            alert('Ha ocurrido un error al intentar obtener los usuarios')
       })
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleClick(name) {
       setIsOpen(true);
       setUsername(name);
    }


    return (
        <>

            <div className={'container_main'}>
                <h1  className={'title'}>
                   BUSCAR EN GITHUB
                    <a className={'link'} href={'https://github.com'} target={'_blank'}>
                        <img className={'logo'} src={GitHubLogo} alt={'github logo'} />
                    </a>
                </h1>
                <form onSubmit={(e) => handleSubmit(e)} className={'content_search'}>
                    <input onChange={(e) => setQuery(e.target.value)} type={'search'} className={'search'} placeholder={'Busca entre mas de 91M de usuarios'} />
                    <button type={'submit'} className={'btn_search'}> Buscar </button>
                </form>
                {

                    //AQUI SE MAPEA (RECORRE) EL ARRAY DE USUARIOS Y SE MUESTRA CADA UNO
                    users.length ? (
                        <div className={'content_result'}>
                            {users.map((x, i) => (
                                <span onClick={() => handleClick(x.login)} className={'item'} key={i}> <span className={'point'}> </span> {x.login}</span>
                            ))}
                        </div>
                    ): null
                }
            </div>
            {
                isOpen ? (
                    <ModalComponent user={username} closeModal={closeModal} />
                ) : null
            }
        </>

    )
}