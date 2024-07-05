const express = require('express');
const app = express();
const cors = require('cors')
const port = 8000;
const { Hercai } = require('hercai');

// Contoh route
app.use(cors())
app.get('/api/:message', (req, res) => {
  const message = req.params.message; // Tangkap nilai parameter message dari URL

  const herc = new Hercai();
  herc.question({ model: "v3", content: message }).then(response => {
    const reply = response.reply; // Tangkap nilai response dari Hercai

    console.log(reply); // Tampilkan response di console

    // Kirim response sebagai JSON menggunakan res.send
    res.send({ reply: reply });
  }).catch(err => {
    console.error("Error:", err);
    res.status(500).send({ error: 'Something failed!' }); // Handle error jika terjadi
  });
});

// Mulai server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});