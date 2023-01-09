import express from 'express'
import cors from 'cors'

const app = express()
const usuarios = []
const tweets = []
const PORT = 5000
app.use(cors())
app.use(express.json())


app.post('/sign-up', (req, res) => {
    const usuario = req.body
    usuarios.push(usuario)
    res.send('OK')

})
app.post('/tweets', (req, res) => {
    const tweet = req.body
    const UsuarioExiste = usuarios.find((item) => item.username === tweet.username)
    if (UsuarioExiste) {
        tweets.push(tweet)
        res.send('OK')
    } else {
        res.send('UNAUTHORIZED')
    }

})
app.get('/tweets', (req, res) => {
    const quantidadeTweets = tweets.length -1
    console.log(quantidadeTweets)
    const tweetsMapeados = []
    if (quantidadeTweets >= 9) {
        for (let i = quantidadeTweets; i >= quantidadeTweets - 9; i--) {
          tweetsMapeados.push(MapearTweets(i))
            

        }
        res.send(tweetsMapeados)
    }else{
      for(let i = quantidadeTweets; i>=0; i--){
        tweetsMapeados.push(MapearTweets(i))
      }
      res.send(tweetsMapeados)
    }
})

function MapearTweets(contador){
  const usuario = usuarios.find(item => item.username === tweets[contador].username)
           
  return { username: tweets[contador].username, avatar: usuario.avatar, tweet: tweets[contador].tweet }
}

app.listen(PORT)

