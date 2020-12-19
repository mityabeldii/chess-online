/*eslint-disable*/
var fs = require('fs');
let time_0 = +new Date(),
    a = `/*eslint-disable*/`,
    b = `/*eslint-enable*/`,
    clean = (s) => s.replace(/\/{2}/g, "/"),
    counter = 0

let defineFolder = (folder_name = `./`) => {
    folder_name = clean(folder_name + `/`)
    if ([`build`, `public`, `node_modules`].map(i => Math.sign(folder_name.split(`/`).indexOf(i) + 1)).reduce((a, b) => a + b) > 0) { return }
    fs.readdirSync(folder_name).forEach(async (file_name) => {
        if (file_name.split(`.`).length === 1) { defineFolder(folder_name + file_name); return }
        if (file_name.split(`.`)[1] === `js`) {
            let contents = fs.readFileSync(folder_name + file_name, { encoding: 'utf8', flag: 'r' })
            if (contents.split(`\n`)[0] !== a) {
                fs.writeFileSync(folder_name + file_name, a + `\n` + contents + `\n` + b)
                console.log('\x1b[32m%s\x1b[0m', `changed --->`, clean(folder_name + file_name));
                counter++
            }
            return
        }
    })
    return
}

defineFolder(`./`)
console.log('\x1b[33m%s\x1b[0m', `Done:`, `changed ${counter} files for ${(+new Date() - time_0) / 1000}s\n`);
/*eslint-enable*/