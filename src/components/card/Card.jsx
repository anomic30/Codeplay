import React from 'react';
import './Card.scss';
import kebab from '../../assets/icons/kebab.svg';
import delete_icon from '../../assets/icons/delete.svg';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { iconNames } from '../../utils/icon-names';
import Axios from 'axios';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const Card = ({ props, setCodes }) => {
    const navigate = useNavigate();

    const handleDelete = async (code_id) => {
        try {
            const resp = await Axios.delete(`${import.meta.env.VITE_APP_SERVER}/deleteCode/${code_id}`,
                { headers: { Authorization: "Bearer " + window.localStorage.getItem('didToken') } });
            console.log(resp.data.message);
            setCodes(resp.data.codes);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='card-con'>
            <div className="options">
                <Tippy content="Delete" placement="top"><img src={delete_icon} alt="" onClick={()=>handleDelete(props.code_id)} /></Tippy>
            </div>
            <div className="sub-con" onClick={()=>navigate(`/playground`, { state: props })}>
                <div className="lang-icon">
                    {props?.language?.value ? <img src={`https://img.icons8.com/ios/64/23F7ED/${iconNames[props?.language?.value]}.png`} /> : 
                    <img src={`https://img.icons8.com/ios/64/23F7ED/placeholder-thumbnail-xml.png`} />
                    }
                    
                </div>
                <div className="file-info">
                    <p className='file-name'>{props.file_name}</p>
                    <p className='lines'>Language: <span>{props?.language?.value}</span></p>
                </div>
                <div className="file-hist">
                    <p>Edited: <span>{DateTime.fromISO(props.last_edited).toLocaleString(DateTime.DATETIME_MED)}</span></p>
                    <p>Created: <span>{DateTime.fromISO(props.created_at).toLocaleString(DateTime.DATETIME_MED)}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card