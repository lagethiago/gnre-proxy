const express = require('express')
const fetch = require('node-fetch')
const app = express()

app.use(express.text({ type: '*/*', limit: '1mb' }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.post('/gnre', async (req, res) => {
  try {
    const targetUrl = req.query.url
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml; charset=utf-8', 'SOAPAction': '""' },
      body: req.body
    })
    const text = await response.text()
    res.set('Content-Type', 'text/xml').send(text)
  } catch (err) {
    res.status(500).send(`<erro>${err.message}</erro>`)
  }
})

app.listen(process.env.PORT || 3000, () => console.log('GNRE proxy rodando'))
