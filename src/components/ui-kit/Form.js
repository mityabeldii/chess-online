/*eslint-disable*/
import React, { useState } from 'react'
import styled from 'styled-components'
import { Frame, Text, Image, PopUp, Textarea, Input, Checkbox, P, convertHex } from './styled-templates'
import Dropzone from './Dropzone'
import Button from './Button'
import DatePicker from './DatePicker'
import mvConsts from '../../constants/mvConsts';
import moment from 'moment'
import axios from 'axios';
import InputMask from 'react-input-mask';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select'
import { makeAnimated } from 'react-select';
import TagsInput from './TagsInput'

import useDictionary from '../hooks/useDictionary'

let animatedComponents = makeAnimated();

let { min, max } = Math

let validateDate = (date) => {
    date = date.split(`.`)
    if (!isNaN(+date[0])) { date[0] = (`0` + Math.max(1, Math.min(31, +date[0]))).slice(-2) }
    if (!isNaN(+date[1])) { date[1] = (`0` + Math.max(1, Math.min(12, +date[1]))).slice(-2) }
    if (!isNaN(+date[2])) { date[2] = Math.max(+moment().format(`YYYY`), Math.min(2120, +date[2])) }
    return date.join(`.`)
}

let Form = (props) => {

    let { fields = [], onChange = () => { }, data = {}, editable = true, extra = `` } = props
    let { getText, dict, lang } = useDictionary()

    return (
        <Wrapper extra={extra} >
            {
                fields.map((item, index) => {
                    let key = item.name.toLowerCase().split(` `).join(`_`)
                    if (editable === false) {
                        return <Field key={index} >
                            <Label>{item.name}</Label>
                            <Text extra={`margin: 0.5vw;`} bold >{data ? data[key] || `` : ``}</Text>
                        </Field>
                    }
                    switch (item.type) {
                        case `string`:
                        case `number`:
                            return <Field key={index} >
                                <Input {...item} value={data ? data[key] || `` : ``} onChange={e => { onChange(key, e.target.value) }} placeholder={getText(item.name)} />
                            </Field>
                        case `password`:
                            return <Field key={index} >
                                <Input value={data ? data[key] || `` : ``} type={`password`} onChange={e => { onChange(key, e.target.value) }} short={item.short} extra={item.extra} placeholder={getText(item.name) || `Password`} />
                            </Field>
                        case `date`:
                            return <Field key={index} >
                                <InputMask mask="99.99.9999" value={data ? data[key] || `` : ``} onChange={e => { onChange(key, validateDate(e.target.value)) }} short={item.short} extra={item.extra} placeholder={getText(item.name)} pattern={`[0-9]*`} >
                                    {(props) => <Input number {...props} />}
                                </InputMask>
                            </Field>
                        case `phone`:
                            return <Field key={index} >
                                <InputMask mask="+370 99 999 999" value={data ? data[key] || `` : ``} onChange={e => { onChange(key, e.target.value) }} short={item.short} extra={item.extra} placeholder={getText(item.name)} pattern={`[0-9]*`} >
                                    {(props) => <Input {...props} />}
                                </InputMask>
                            </Field>
                        case `textarea`:
                            return <Field key={index} >
                                <Textarea value={data ? data[key] || `` : ``} onChange={e => { onChange(key, e.target.value) }} short={item.short} extra={item.extra} placeholder={getText(item.name)} />
                            </Field>
                        case `wysiwyg`:
                            return <Field key={index} >
                                <Label>{getText(item.name)}</Label>
                                <Editor
                                    initialValue={data ? data[key] || `` : ``}
                                    apiKey={`u3254i8i3jcmyci068mjgrh4rjpeulx7epdcv5bevx54sjyq`}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        branding: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount',
                                            `media`
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help | media',
                                    }}
                                    onEditorChange={e => { onChange(key, e) }}
                                />
                            </Field>
                        case `select`:
                            return <Field key={index} >
                                <MySelect
                                    {...item}
                                    value={data[key] && data[key].value ? data[key] : null}
                                    options={item.options || []}
                                    placeholder={getText(item.name)}
                                    onChange={e => { onChange(key, e ? e.value : e) }}
                                />
                            </Field>
                        case `tagsinput`:
                            return <Field key={index} >
                                <TagsInput
                                    tagsArray={Object.keys(dict).filter(i => i.indexOf(`tag_`) > -1)}
                                    selectedTagsArray={data ? data[key] || [] : []}
                                    onChange={e => { onChange(key, e) }}
                                />
                            </Field>
                        case `checkbox`:
                            return <Field key={index} row >
                                <Checkbox
                                    checked={data[key] === true}
                                    onChange={e => { onChange(key, data[key] !== true) }}
                                />
                                <Text extra={`margin-left: 15px; font-size: 16px; margin-bottom: 0px;`} >{getText(item.name)}</Text>
                            </Field>
                        case `multicheck`:
                            return <Field key={index} >
                                {
                                    item.options.map((option, option_i) => {
                                        return (
                                            <Frame key={option_i} row extra={`margin-bottom: 10px;`} >
                                                <Checkbox
                                                    checked={(data[key] || []).indexOf(option.id) > -1}
                                                    onChange={e => { onChange(key, [...(data[key] || []), option.id].filter((item, index, self) => self.filter(a => a === item).length === 1)) }}
                                                />
                                                <Text extra={`margin-left: 15px; font-size: 16px; margin-bottom: 0px;`} >{option[lang.toLowerCase()]}</Text>
                                            </Frame>
                                        )
                                    })
                                }
                            </Field>
                        case `custom`:
                            return <Field key={index} >
                                {item.component()}
                            </Field>
                        default: return null
                    }
                })
            }
        </Wrapper >
    )
}

const MySelect = styled(Select).attrs((props) => {
    return ({
        defaultValue: [],
        closeMenuOnSelect: true,
        components: animatedComponents,
        isClearable: props.isClearable === true,
        styles: {
            singleValue: style => ({ ...style, color: props.theme.text.primary, marginLeft: `12px`, }),
            control: styles => ({
                ...styles,
                width: `255px`,
                height: `50px`,
                borderRadius: `4px`,
                border: `1px solid ${props.theme.background.secondary}`,
                background: props.theme.background.primary,
                overflow: `hidden`,
                fontSize: `14px`,
                ':hover': null,
                ...props.extra
            }),
            menuList: style => ({ borderRadius: `12px`, }),
            placeholder: style => ({ ...style, marginLeft: `12px`, color: props.theme.text.secondary, fontSize: `14px`, }),
            input: style => ({ ...style, marginLeft: `12px`, fontSize: `14px`, }),
            valueContainer: style => ({ ...style, fontSize: `14px`, color: props.theme.text.secondary, margineft: `12px`, }),
            indicatorSeparator: style => ({ ...style, opacity: 0, }),
            option: styles => ({
                ...styles,
                background: props.theme.background.secondary,
                fontSize: `14px`,
                color: props.theme.text.primary,
                zIndex: 2000,
                ':hover': { backgroundColor: props.theme.background.support, },
            }),

        }
    })
})``;

let Field = styled(Frame)`
    align-items: flex-start;
    margin-bottom: 20px;

    @media only screen and (max-width: 600px) {
        margin-bottom: 6.25vw;
    }
`;

let Label = styled(Text)`
    margin: 0.5vw;
    color: ${props => props.theme.text.secondary};
`

let Wrapper = styled(Frame)`
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    width: 540px;
    ${props => props.extra}

    @media only screen and (max-width: 600px) {
        width: 90vw;
        margin: 0 !important;
    }
`;

export default Form;
/*eslint-enable*/