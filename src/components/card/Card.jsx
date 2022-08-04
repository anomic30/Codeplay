import React from 'react'
import './Card.scss'
import kebab from '../../assets/icons/kebab.svg'
import { useNavigate } from 'react-router-dom'

const Card = ({ props }) => {
    const navigate = useNavigate();
    return (
        <div className='card-con' onClick={()=>navigate(`/playground`, { state: props })}>
            <div className="options">
                <img src={kebab} alt="" />
            </div>
            <div className="sub-con">
                <div className="lang-icon">
                    <img src="https://img.icons8.com/ios/64/23F7ED/c-plus-plus.png" />
                </div>
                <div className="file-info">
                    <p className='file-name'>{props.file_name}</p>
                    <p className='lines'>Total lines: <span>{props.total_lines}</span></p>
                </div>
                <div className="file-hist">
                    <p>Edited: <span>{props.last_edited}</span></p>
                    <p>Created: <span>{props.created_at}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card