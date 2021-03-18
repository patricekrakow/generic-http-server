'use strict'
const express = require('express')
const os = require('os')
const HOSTNAME = '0.0.0.0'
const PORT = process.env.SERVICE_PORT || 8080
const SERVICE_NAME = process.env.SERVICE_NAME || 'generic-http-server'
const SERVICE_VERSION = process.env.SERVICE_VERSION || '0.1.0'

const app = express()

app.use((req, res, next) => {
  console.log(`[INFO_] ${req.ip} | ${req.method} ${req.url}`)
  next()
})

const endpoints = process.env.ENDPOINTS || '/hello'
endpoints.split(';').forEach(path => {
  if (!path.startsWith('/')) {
    console.log(`[ERROR] The path '${path}' does not start with '/'.`)
  } else {
    console.log(`[INFO_] ${SERVICE_NAME} (${SERVICE_VERSION}) will implement GET ${path}`)
    app.get(path, (req, res) => {
      res.json({
        message: `Hello from GET ${path}`,
        internalInfo: {
          serviceName: SERVICE_NAME,
          version: SERVICE_VERSION,
          path: path,
          hostname: {
            configured: HOSTNAME,
            fromOS: os.hostname()
          },
          port: PORT,
          headers: req.headers
        }
      })
      console.log(`[INFO_] ${req.ip} | 200`)
    })
  }
  
})

// NOT FOUND
app.use((req, res) => {
  console.log(`[ERROR] ${req.ip} | 404 | ${SERVICE_NAME} (${SERVICE_VERSION}) does NOT implement ${req.method} ${req.url}`)
  res.status(404).json({
    errorcode: 404,
    errorMessage: `[ERROR] ${SERVICE_NAME} (${SERVICE_VERSION}) does NOT implement ${req.method} ${req.url}`
  })
})

app.listen(PORT, HOSTNAME)
console.log(`Running on http://${HOSTNAME}:${PORT}`);
