
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/convert', (req, res) => {
    const { url, format } = req.body;
    if (!url || !['mp3', 'wav'].includes(format)) {
        return res.status(400).send('Invalid parameters.');
    }

    const outputFileName = `video.${format}`;
    const command = `yt-dlp -x --audio-format ${format} -o ${outputFileName} "${url}"`;

    exec(command, (error) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error processing video.');
        }

        const filePath = path.join(__dirname, outputFileName);
        res.json({ downloadUrl: `/downloads/${outputFileName}` });

        setTimeout(() => fs.unlinkSync(filePath), 60000); // Delete file after 1 minute
    });
});

app.use('/downloads', express.static(path.join(__dirname)));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
