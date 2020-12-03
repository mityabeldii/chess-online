/*eslint-disable*/
let additional = {
    shadow: {
        small: `box-shadow: 6px 6px 24px rgba(0, 0, 0, 0.07);`,
        none: `box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);`,
        blue: `box-shadow: 0px 20px 60px rgba(87, 138, 214, 0.2);`,
    }
}

let basePalette = {
    red: `#F86D3F`,
    yellow: `#FDCA21`,
    green: `#78BA75`,
    purple: `#6350CC`,
}

export let theme = {
    ...basePalette,
    ...additional,
    background: {
        primary: `#1A1A21`,
        secondary: `#1E222C`,
        support: `#D5D5D5`,
    },
    text: {
        primary: `#FFFFFF`,
        secondary: `#62646A`,
        support: `#939393`,
    }
}

export default {
    theme: theme,
}
/*eslint-enable*/