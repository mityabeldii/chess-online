/*eslint-disable*/
let additional = {
    shadow: {
        small: `box-shadow: 6px 6px 24px rgba(0, 0, 0, 0.07);`,
        none: `box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);`,
        blue: `box-shadow: 0px 20px 60px rgba(87, 138, 214, 0.2);`,
    }
}

let basePalette = {

    red: `#FE7563`,
    yellow: `#FDCA21`,
    green: `#5CC956`,
    blue: `#578AD6`,
    rtu_green: `#005551`,
}

export let theme = {
    ...basePalette,
    ...additional,
    background: {
        primary: `#ffffff`,
        secondary: `#EEEEEE`,
        support: `#d5d5d5`,
    },
    text: {
        primary: `#374A5E`,
        secondary: `#767676`,
        support: `#939393`,
    }
}

export default {
    theme: theme,
}
/*eslint-enable*/