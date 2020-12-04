/*eslint-disable*/
import React, { useState } from 'react'
import styled from 'styled-components'

import { Frame, Button, Link, convertHex } from '../ui-kit/styled-templates'
import Playground from './playground'

let Multiplayer = () => {

    let [config, setConfig] = useState(new Array(9).fill(`-`))

    let active_player = config.filter(i => i !== `-`).length % 2

    return (
        <Wrapper>
            <Playground />
        </Wrapper>
    )
}

const Wrapper = styled(Frame)`
    width: 100%;
    height: 100%;
`;

export default Multiplayer;
/*eslint-enable*/