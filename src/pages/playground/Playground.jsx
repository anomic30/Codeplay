import React from 'react'
import './Playground.scss'
import Navbar from '../../components/navbar/Navbar'
import CodeEditor from '../../components/codeEditor/codeEditor'
import play_icon from '../../assets/icons/play.svg'

const Playground = () => {
    return (
        <div className='playground-con'>
            <Navbar />
            <div className='sub'>
                <CodeEditor />
                <div className="side-panel">
                    <textarea className="custom-input-box" placeholder='Custom input'>
                        Hello world
                    </textarea>
                    <p>Output</p>
                    <pre className="output-box">

                    </pre>
                    <div className="stats-box">

                    </div>

                    <button>
                        <img src={play_icon} alt="" />
                        <span>Run</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Playground