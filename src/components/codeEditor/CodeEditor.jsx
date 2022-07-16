import React, { useState } from 'react'
import './CodeEditor.scss'
import Editor from "@monaco-editor/react";

const CodeEditor = ({language, theme, code, setCode}) => {
    const [value, setvalue] = useState(code || "");

    const handleEditorChange = (value) => {
        console.log(value);
        setCode(value);
    }

    return (
        <div className='codeeditor-con'>
            <Editor
                height="calc(100vh - 50px)"
                width={'100%'}
                language={language || 'javascript'}
                theme={theme}
                value={value}
                onChange={handleEditorChange}
            />
        </div>
    )
}

export default CodeEditor