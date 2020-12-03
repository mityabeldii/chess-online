/*eslint-disable*/
const CommonHelper = {

    linkTo(patientUrl) {
        let url = window.location.origin + window.location.pathname + '#' + patientUrl;
        window.location.href = url;
        try { document.getElementById(`scrollWrapper`).scrollTo({ top: 0, behavior: "smooth", }); } catch (error) { }
        try { window.scrollTo({ top: 0, behavior: "smooth", }); } catch (error) { }
    },

    getGradColor(ratio = 0.5) {
        let color1 = '27E634';
        let color2 = 'F73434';
        let hex = function (x) {
            x = x.toString(16);
            return (x.length === 1) ? '0' + x : x;
        };
        let r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
        let g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
        let b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
        return `#${hex(r)}${hex(g)}${hex(b)}`
    },


};

export default CommonHelper;
/*eslint-enable*/