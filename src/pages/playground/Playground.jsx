import React, { useEffect, useState } from 'react'
import './Playground.scss'
import Navbar from '../../components/navbar/Navbar'
import CodeEditor from '../../components/codeEditor/CodeEditor'
import play_icon from '../../assets/icons/play.svg'
import { languageOptions } from '../../utils/languages';
import { generateTheme } from '../../utils/generateTheme'
import Axios from 'axios';
import spinner from '../../assets/icons/spinner.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Playground = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [code, setCode] = useState(location?.state?.code || "");
    const [language, setLanguage] = useState(location?.state?.language && Object.keys(location?.state?.language).length!==0? location?.state?.language: languageOptions[0]);
    const [theme, setTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(16);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);

    useEffect(() => {
        console.log(location?.state);
        if (!window.localStorage.getItem("didToken")) {
            toast(`Log in to sync your code.`, {
                icon: '💿',
                style: {
                  borderRadius: '5px',
                  background: '#1a1a1e',
                    color: '#a9acbb',
                },
            });
        }
    },[])
    
    const handlePatch = async () => {
        if (!window.localStorage.getItem("didToken")) {
            return;
        }
        console.log(language);
        let postObj = {
            code_id: location?.state?.code_id,
            code: code,
            language: language,
            file_name: location?.state?.file_name,
            total_lines: 0,
            last_edited: new Date().toLocaleString(),
        }
        try {
            const resp = await Axios.patch(`${import.meta.env.VITE_APP_SERVER}/patchCode`,
                postObj,
                { headers: { Authorization: "Bearer " + window.localStorage.getItem('didToken') } })
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    //run handlePatch every 10 seconds
    useEffect(() => {
        //create a timeout
        const timeout = setTimeout(() => {
            handlePatch();
        }, 2000);
        //clear the timeout
        return () => clearTimeout(timeout);

        // let interval = setInterval(() => {
        //     handlePatch();
        // }, 10000);
        // return () => clearInterval(interval);
    }, [code, language]);

    const handleLanguageChange = (selectedOption) => {
        console.log(selectedOption);
        setLanguage(selectedOption);
    }

    const handleThemeChange = async (theme) => {
        window.localStorage.setItem("theme", JSON.stringify(theme));
        console.log(theme);
        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            generateTheme(theme.value).then(() => setTheme(theme));
        }
        if (window.localStorage.getItem("didToken")) {
            try {
                const resp = await Axios.patch(`${import.meta.env.VITE_APP_SERVER}/setTheme`, { theme }, { headers: { Authorization: "Bearer " + window.localStorage.getItem('didToken') } });
                console.log(resp.data.message);
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        // if (window.localStorage.getItem("theme") === undefined) {
        //     window.localStorage.setItem("theme", JSON.stringify({ value: "vs-dark", label: "Dark" }));
        // }
        let theme = JSON.parse(window.localStorage.getItem("theme"));
        //if theme object is not empty
        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            generateTheme(theme.value).then(() => setTheme(theme));
        }
    },[])

    const handleCompile = () => {
        console.log("handleCompile");
        setProcessing(true);
        const formData = {
            language_id: language.id,
            // encode source code in base64
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        const options = {
            method: "POST",
            url: import.meta.env.VITE_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
            },
            data: formData,
        };

        Axios
            .request(options)
            .then(function (response) {
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                let status = err.response.status;
                console.log("status", status);
                if (status === 429) {
                    console.log("too many requests", status);
                }
                setProcessing(false);
                console.log("catch block...", error);
            });
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: import.meta.env.VITE_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
            },
        };
        try {
            let response = await Axios.request(options);
            let statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                console.log("response.data", response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
        }
    };

    return (
        <div className='playground-con'>
            <Toaster position="bottom-center"/>
            <Navbar handleLanguageChange={handleLanguageChange}
                handleThemeChange={handleThemeChange}
                setFontSize={setFontSize}
                usertheme={theme}
                codeLang={language}
            />
            <div className='sub'>
                <CodeEditor language={language?.value}
                    theme={theme.value || theme}
                    code={code}
                    setCode={setCode}
                    fontSize={fontSize}
                />
                <div className="side-panel">
                    <textarea className="custom-input-box"
                        placeholder='Custom input'
                        onChange={(e) => setCustomInput(e.target.value)}
                    />
                    <p>Output</p>
                    <pre className="output-box">
                        {outputDetails !== null
                            ? `${atob(outputDetails?.stdout)}`
                            : null}
                    </pre>
                    <div className="stats-box">
                        <p>Status: <span>{outputDetails?.status?.description || null}</span></p>
                        <p>Time: <span>{outputDetails?.time || null}</span></p>
                        <p>Memory: <span>{outputDetails?.memory || null}</span></p>
                    </div>

                    <button onClick={handleCompile} disabled={processing} className={processing ? "processing" : "run"}>
                        {processing ? <img src={spinner} alt="Processing..." /> :
                            <><img src={play_icon} alt="" />
                                <span>Run</span></>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Playground