module.exports = {
  apps: [{
    name: "app",
    script: "./dist/index.js",
    watch: true,
    // max_memory_restart: "10000",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
    name: 'worker',
    script: 'worker.js'
  }]
}