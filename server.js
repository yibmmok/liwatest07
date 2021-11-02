const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;

app.set("view options", {layout: false})
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
	res.render('index.html')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))