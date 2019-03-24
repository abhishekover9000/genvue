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
