/*eslint-disable*/
import React from 'react'
import styled, { keyframes } from 'styled-components'

import { Frame } from './styled-templates'

let min_side = 30, max_side = 300, n = 10

let Balls = (props) => {
    return (
        <Wrapper>
            {
                new Array(n).fill(0).map((item, index) => {
                    return <Ball key={index} index={index} width={index * (max_side - min_side) / n} />
                })
            }
        </Wrapper>
    )
}

let from = -100, to = 500

let gradients = [
    `#F1D025, #FF3D45`,
    `90deg, #C182FF, #9001FF`,
    `90deg, #82BCFF, #0175FF`,
]

const rotate = (index, delta) => {
    let s_x = `calc((100vw - 1100px) / 2)`
    return keyframes`
        0% {
            ${index % 2 === 0 ? `left` : `right`}: calc((100vw - ${to}px) / 2 * ${delta} + ${from}px);
            /* top: calc(${(50 - index / n * 100) * delta + index / n * 100}vh); */
            top: calc(${index / n * 80}vh);
            opacity: ${1};
            filter: blur(${0}px);
            transform:
                scale(${1 - delta});
        }
        ${100 * (1 - delta)}% {
            ${index % 2 === 0 ? `left` : `right`}: calc((100vw - ${to}px) / 2 + ${from}px);
            /* top: calc(${50}vh); */
            top: calc(${index / n * 80}vh);
            opacity: 0;
            filter: blur(16px);
            transform:
                scale(0);
        }
        ${100 * (1 - delta) + 0.0001}% {
            ${index % 2 === 0 ? `left` : `right`}: ${from}px;
            /* top: calc(${index / n * 100}vh); */
            top: calc(${index / n * 80}vh);
            opacity: 1;
            filter: blur(0px);
            transform:
                scale(1);
        }
        100% {
            ${index % 2 === 0 ? `left` : `right`}: calc((100vw - ${to}px) / 2 * ${delta} + ${from}px);
            /* top: calc(${50 * delta - index / n * 100 * (1 - delta)}vh); */
            top: calc(${index / n * 80}vh);
            opacity: ${1 - delta};
            filter: blur(${1}px);
            transform:
                scale(${1 - delta});
        }
    `;
}

const Ball = styled(Frame)`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    background: linear-gradient(${props => gradients[props.index % gradients.length]});
    animation: ${props => rotate(props.index, Math.random())} 20s linear infinite;
`;

const Wrapper = styled(Frame)`
    width: 100vw;
    height: 80vh;
    position: absolute;
    top: 80px;
    z-index: -1 !important;

`;

export default Balls;
/*eslint-enable*/