/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Frame, Text, Image, PopUp } from '../ui-kit/styled-templates'
import Input from '../ui-kit/Input'
import Button from '../ui-kit/Button'
import Selector from '../ui-kit/Selector'
import mvConsts from '../../constants/mvConsts';
import axios from 'axios'
import moment from 'moment'
import useComponentVisible from '../ui-kit/useComponentVisible'

let DatePicker = (props) => {
    let [date, set_date] = useState(+moment().add(1, `hour`).startOf(`hour`))
    let set_date_up_to_date = (date) => {
        if (+date >= +moment().startOf(`day`)) {
            set_date(date)
        }
    }
    useEffect(() => {
        if (props.onChange !== undefined && props.value !== date) {
            props.onChange(date)
        }
    })
    let DD = +moment(date).format(`DD`)
    let MM = +moment(date).format(`MM`)
    let YYYY = +moment(date).format(`YYYY`)
    let HH = +moment(date).format(`HH`)
    let mm = +moment(date).format(`mm`)
    return (
        <Frame extra={`align-items: flex-start; width: 100%;`} >
            {/* <Text size={1} extra={`margin: 0.25vw;`} >Дата</Text> */}
            <Frame row >
                <Selector
                    array={new Array(moment(date).daysInMonth()).fill(0).map((a, b) => b + 1)}
                    selected={DD - 1}
                    onChange={(n) => { set_date_up_to_date(+moment(`${n + 1}.${MM}.${YYYY} ${HH}:${mm}`, `D.M.Y H:m`)) }}
                    width={1}
                />
                <Selector
                    array={mvConsts.month}
                    selected={MM - 1}
                    onChange={(n) => { set_date_up_to_date(+moment(`${DD}.${n + 1}.${YYYY} ${HH}:${mm}`, `D.M.Y H:m`)) }}
                    width={6}
                />
                <Selector
                    array={new Array(2).fill(0).map((a, b) => +moment().format(`YYYY`) + b)}
                    selected={YYYY - +moment().format(`YYYY`)}
                    onChange={(n) => { set_date_up_to_date(+moment(`${DD}.${MM}.${+moment().format(`YYYY`) + n} ${HH}:${mm}`, `D.M.Y H:m`)) }}
                    width={3}
                />
            </Frame>
            {
                props.time && <>
                    {/* <Text size={1} extra={`margin: 0.25vw;`} >Время</Text> */}
                    <Frame row >
                        <Selector
                            array={new Array(24).fill(0).map((a, b) => (b < 10 ? `0` : null) + b)}
                            selected={HH}
                            onChange={(n) => { set_date_up_to_date(+moment(`${DD}.${MM}.${YYYY} ${n + 1}:${mm}`, `D.M.Y H:m`)) }}
                            width={1}
                        />
                        <Text>:</Text>
                        <Selector
                            array={new Array(12).fill(0).map((a, b) => (b * 5 < 10 ? `0` : null) + b * 5)}
                            selected={mm / 5}
                            onChange={(n) => { set_date_up_to_date(+moment(`${DD}.${MM}.${YYYY} ${HH}:${n * 5}`, `D.M.Y H:m`)) }}
                            width={1}
                        />
                    </Frame>
                </>
            }
        </Frame>
    )
}

export default DatePicker;
/*eslint-enable*/