
document.getElementById('convertForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const format = document.getElementById('format').value;

    const response = await fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, format })
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (response.ok) {
        const data = await response.json();
        const downloadLink = document.createElement('a');
        downloadLink.href = data.downloadUrl;
        downloadLink.textContent = 'Download File';
        downloadLink.download = `video.${format}`;
        resultDiv.appendChild(downloadLink);
    } else {
        resultDiv.textContent = 'Error converting the video. Please try again.';
    }
});
