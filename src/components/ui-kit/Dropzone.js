/*eslint-disable*/
import React, { useState, useRef } from 'react';

import SimpleControledUploadPanel from '../upload/SimpleControledUploadPanel'

let Dropzone = (props) => {

    let uploaderRef = useRef(null)
    let [name, setName] = useState(``)

    return (
        <SimpleControledUploadPanel
            {...props}
            ref={uploaderRef}
            onUploaded={(pld) => {
                if (props.onUploaded !== undefined) {
                    props.onUploaded(pld.url, name)
                }
            }}
            onFileDrop={(f) => {
                setName(f.name)
                uploaderRef.current.uploadFile()
                if (props.onFileDrop !== undefined) {
                    props.onFileDrop(f)
                }
            }}
            accept={props.accept || `.png,.jpg`}
            endpoint={`https://wave.rest/api/upload`}
        >
            {props.children}
        </SimpleControledUploadPanel>
    );
}

export default Dropzone;

/*eslint-enable*/