// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'py-backend',
      script: 'app.py',
      interpreter: '/home/pt101/miniconda3/bin/python',
      cwd: '/home/pt101/Downloads/py101',
      watch: false
    },
    {
      name: 'mkdocs-docs',
      script: 'mkdocs',
      args: 'serve -a 127.0.0.1:8000',
      interpreter: 'none',
      cwd: '/home/pt101/Downloads/py101',
      watch: false
    },
    {
      name: 'signa-server',
      script: 'signa-server.js',
      interpreter: '/usr/bin/node',  // 或 'node'，取决于你的环境
      cwd: '/home/pt101/Downloads/py101/realtime-translation/backend',
      watch: false
    }
  ]
};