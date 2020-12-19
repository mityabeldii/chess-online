/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import marked from 'marked'

import { Frame } from '../ui-kit/styled-templates'

let DocsPage = (props) => {

    let [docs, setDocs] = useState(``)

    useEffect(() => {
        axios.get(`https://raw.githubusercontent.com/Nymaxxx/tik-toe-toy-online/main/README.md`).then((d) => { setDocs(d.data) })
    }, [])

    return (
        <Wrapper>
            <article dangerouslySetInnerHTML={{ __html: marked(docs) }}></article>
        </Wrapper>
    )
}

const Wrapper = styled(Frame)`
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    align-items: flex-start;
    justify-content: flex-start;
`;

export default DocsPage;
/*eslint-enable*/