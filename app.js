'use strict'
const express = require('express')
const os = require('os')

const SERVICE_HOSTNAME = '0.0.0.0'
const SERVICE_PORT = process.env.SERVICE_PORT || 8080
const SERVICE_NAME = process.env.SERVICE_NAME || 'generic-http-server'
const SERVICE_VERSION = process.env.SERVICE_VERSION || '0.1.0'
const API_GET_PATHS = process.env.API_GET_PATHS || '/hello;/hi'

console.log(`[INFO_] SERVICE_HOSTNAME: ${SERVICE_HOSTNAME}`)
console.log(`[INFO_] SERVICE_PORT: ${SERVICE_PORT}`)
console.log(`[INFO_] SERVICE_NAME: ${SERVICE_NAME}`)
console.log(`[INFO_] SERVICE_VERSION: ${SERVICE_VERSION}`)
console.log(`[INFO_] API_GET_PATHS: ${API_GET_PATHS}`)

const app = express()

app.use((req, res, next) => {
  console.log(`[INFO_] ${req.ip} | ${req.method} ${req.url}`)
  next()
})

API_GET_PATHS.split(';').forEach(path => {
  if (!path.startsWith('/')) {
    console.log(`[ERROR] The path '${path}' does not start with '/'.`)
  } else {
    console.log(`[INFO_] ${SERVICE_NAME} (${SERVICE_VERSION}) will implement GET ${path}`)
    app.get(path, (req, res) => {
      res.json({
        message: `Hello from GET ${path}`,
        debug: {
          serviceName: SERVICE_NAME,
          serviceVersion: SERVICE_VERSION,
          path: path,
          hostname: {
            configured: SERVICE_HOSTNAME,
            fromOS: os.hostname()
          },
          port: SERVICE_PORT,
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
    errorMessage: `${SERVICE_NAME} (${SERVICE_VERSION}) does NOT implement ${req.method} ${req.url}`,
    debug: {
      serviceName: SERVICE_NAME,
      serviceVersion: SERVICE_VERSION,
      hostname: {
        configured: SERVICE_HOSTNAME,
        fromOS: os.hostname()
      },
      port: SERVICE_PORT,
      headers: req.headers
    }
  })
})

app.listen(SERVICE_PORT, SERVICE_HOSTNAME)
console.log(`[INFO_] Running on http://${SERVICE_HOSTNAME}:${SERVICE_PORT}`);
