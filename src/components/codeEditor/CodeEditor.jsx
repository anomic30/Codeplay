import React, { useState } from 'react'
import './CodeEditor.scss'
import Editor from "@monaco-editor/react";

const CodeEditor = ({language, theme, code, setCode, fontSize}) => {
    const [value, setvalue] = useState(code || "");

    const handleEditorChange = (value) => {
        setCode(value);
    }

    const options = {
        fontSize: fontSize,
    }

    return (
        <div className='codeeditor-con'>
            <Editor
                options={options}
                height="calc(100vh - 64px)"
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