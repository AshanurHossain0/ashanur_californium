const shortid = require("shortid")
const validUrl = require('url-validation')
const urlModel = require("../model/UrlModel");
const caching=require("../cacheFolder/cache")

const baseUrl = "http:localhost:3000/"
const createShortUrl = async function (req, res) {
    
  try {
    const { longUrl } = req.body
    if (!longUrl) return res.status(400).send({ status: false, message: "please provide long url" })

    if (!validUrl(longUrl)) return res.status(400).send({ status: false, message: "please provide valid long url" })

    let cachedUrlData = await caching.GET_ASYNC(`${longUrl}`)
    if(cachedUrlData) return res.status(200).send(cachedUrlData)

    const findUrl = await urlModel.findOne({ longUrl: longUrl }).select({ urlCode: 1, shortUrl: 1, longUrl: 1, _id: 0 })

    if (findUrl){
      await caching.SET_ASYNC(`${longUrl}`, JSON.stringify(findUrl), "EX" , 3600*12)
      return res.status(200).send({ status: true, data: findUrl })
    }

    let urlCode = shortid.generate();

    const findUrlCode = await urlModel.findOne({ urlCode: urlCode })

    if (findUrlCode) urlCode = urlCode + shortid.generate()

    const shortUrl = baseUrl + urlCode

    const crData = await urlModel.create({ urlCode: urlCode, longUrl: longUrl, shortUrl: shortUrl })

    const result = { longUrl: crData.longUrl, shortUrl: crData.shortUrl, urlCode: crData.urlCode }

    await caching.SET_ASYNC(`${longUrl}`, JSON.stringify(result), "EX" , 3600*12)

    return res.status(201).send({ status: true, data: result })

  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }
}
const getUrl = async function (req, res) {
  try {

    let urlCode = req.params.urlCode.trim()

    if (!urlCode) return res.status(400).send({ status: false, message: "enter urlCode" })

    let cahcedLongUrl = await caching.GET_ASYNC(`${urlCode}`)

    if(cahcedLongUrl){
      return res.status(302).redirect(cahcedLongUrl)
    }

    const getUrl = await urlModel.findOne({ urlCode: urlCode })

    if (getUrl) {

      let longUrl = getUrl.longUrl

      await caching.SET_ASYNC(`${urlCode}`, longUrl , "EX", 3600*12)

      return res.status(302).redirect(longUrl)

    } else {

      return res.status(404).send({ status: false, message: "Url not found" })

    }
  } catch (err) {

    res.status(500).send({ status: false, msg: err.message })

  }
}
module.exports = { createShortUrl, getUrl }


