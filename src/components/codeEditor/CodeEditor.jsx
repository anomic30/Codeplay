import React, { useState } from 'react'
import './CodeEditor.scss'
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
    const [code, setCode] = useState('');

    const handleEditorChange = (val) => {
        setCode(val);
    }


    return (
        <div className='codeeditor-con'>
            <Editor
                height="calc(100vh - 50px)"
                width={'100%'}
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
            />
        </div>
    )
}

export default CodeEditor