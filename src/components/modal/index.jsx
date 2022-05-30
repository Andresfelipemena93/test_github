import './index.css';
import {useEffect, useState} from "react";
import API from "../../API/axios";

export default function ModalComponent({ user, closeModal}) {

    const [data, setData] = useState({})

    function handleClose() {
        closeModal();
    }

    useEffect(() => {

        API.getUser(user).then((res) => {
            if(user) {
                setData(res)
            }
        }).catch((err) =>  {
            console.error(err)
            alert(`Ha ocurrido un error al intentar obtener el usuario ${user}`);
        })
    }, [user])

    return (
        <div className={'container_modal'}>
            <div className={'content_modal'}>
                <button onClick={() => handleClose()} className={'btn_close'}> X </button>
                <img className={'image'} width={'120px'} src={data?.avatar_url} />
                <span className={'name'}> {data?.login} </span>
                <div className={'info'}>
                    <div className={'style_text'}> ID de usuario: {data?.id} <a href={`https://github.com/${data.login}`} target={'_blank'} className={'btn_link'}> Ver perfil </a>  </div>
                    <div className={'style_text'}> Seguidores: {data?.followers} <a href={`https://github.com/${data.login}?tab=followers`} target={'_blank'} className={'btn_link'}> Ver Seguidores </a>  </div>
                    <div className={'style_text'}> Siguiendo: {data?.following}  <a href={`https://github.com/${data.login}?tab=following`} target={'_blank'}  className={'btn_link'}> Ver Siguiendo </a>  </div>
                    <div className={'style_text'}> Repositorios publicos: {data?.public_repos}  <a  href={`https://github.com/${data.login}?tab=repositories`}  target={'_blank'} className={'btn_link'}> Ver repositorios </a> </div>
                    <div className={'style_text'}> Blog: {data?.blog ? data.blog : 'No se encontro un blog'} {data?.blog ? <a href={data.blog}  target={'_blank'} className={'btn_link'}> Ver blog </a>  : null}  </div>
                    <div className={'style_text'}> Numero de organizaciones: {data?.public_repos}  </div>
                    <div className={'style_text'}> Nombre: {data?.name ? data.name : 'No se encontro un nombre'}  </div>
                </div>
            </div>
        </div>
    )
}