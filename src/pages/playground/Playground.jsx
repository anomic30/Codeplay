import React, { useState } from 'react'
import './Playground.scss'
import Navbar from '../../components/navbar/Navbar'
import CodeEditor from '../../components/codeEditor/codeEditor'
import play_icon from '../../assets/icons/play.svg'
import { languageOptions } from '../../utils/languages';

const Playground = () => {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState(languageOptions[0]);
    const [theme, setTheme] = useState('vs-dark');

    const handleLanguageChange = (selectedOption) => {
        console.log(selectedOption);
        setLanguage(selectedOption);
    }

    return (
        <div className='playground-con'>
            <Navbar handleLanguageChange={handleLanguageChange}/>
            <div className='sub'>
                <CodeEditor language={language?.value} theme={theme} code={code} setCode={setCode}/>
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