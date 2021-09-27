module.exports = {
  apps: [{
    name: 'cointc_frontend',
    script: 'yarn build && serve -s build',
    watch: './frontend'
  }]
};
