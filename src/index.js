#!/usr/bin/env node

const fs = require("fs");
const exec = require('child_process');


const file = ".git/hooks/post-commit";
const njsPath = "/neutralino-app/neutralino";


if(process.argv.length <= 2) {
    if(fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log("gitmeme -> OFF");
    }
    else {
        fs.writeFileSync(file, "#!/bin/bash\ngitmeme run\n");
        exec.exec("chmod +x " + file);
        console.log("gitmeme -> ON");
    }
}
else {
    if(process.argv[2] == "run") {
        let pathToPackage = require("global-modules-path").getPath("gitmeme");
        
        let execPath = pathToPackage + njsPath;
        console.log("gitmeme -> MEME");
        exec.execFileSync(execPath, {
            cwd: (pathToPackage + njsPath).replace(/\/neutralino$/g, "")
        });
    }
}