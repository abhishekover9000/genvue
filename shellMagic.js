const shell = require("shelljs");

exports.makeFolder = (name, path) => {
  const shellPath = path === "" ? `./${name}` : `${path}${name}`;
  shell.mkdir("-p", shellPath);
  shell.touch(`${shellPath}/${name}.js`);
  shell.touch(`${shellPath}/${name}.scss`);
  shell.touch(`${shellPath}/${name}.vue`);
  shell
    .echo(
      `<template> <div class="${name}-root"> ${name} Coming Soon.. </div> </template> \n <script src="./${name}.js" scoped></script> <style lang="scss" scoped> @import './${name}.scss'</style>`
    )
    .to(`${shellPath}/${name}.vue`);

  shell
    .echo(`export default {\n name: "${name}" \n }`)
    .to(`${shellPath}/${name}.js`);

  shell.echo(`.${name}-root {}`).to(`${shellPath}/${name}.scss`);
};

exports.makeSingle = (name, path) => {
  const shellPath = path === "" ? `./${name}` : `${path}${name}`;
  shell.touch(`${shellPath}/${name}.vue`);
  shell.echo(
    `<template> <div class="${name}-root"> ${name} Coming Soon.. </div> </template> \n
    <script>
    export default {\n name: "${name}" \n }
    </script>
    <style>
      .${name}-root: {}
    </style>`
  );
};

exports.checkorMakeFile = path => {
  console.log(shell.test("-e", path));
  console.log(path);
  if (shell.test("-e", path)) {
    // get info
    const info = shell.cat(path); //.stdout;
    const infoObj = JSON.parse(info.stdout);
    return infoObj;
  } else {
    shell.touch(path);
    const baseInfo = { componentURI: "", unitTestURI: "" };
    const info = JSON.stringify(baseInfo);
    shell.echo(info).to(path);
    return {};
  }
};

exports.updateConfigFile = object => {
  const info = JSON.stringify(object);
  shell.echo(info).to("./vuegen_config.js");
};

exports.retrieveConfigFile = () => {
  shell.echo("whats up");
  const data = shell.cat("./vuegen_config.js");
  console.log(data);
};
