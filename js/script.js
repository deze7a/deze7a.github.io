
document.getElementById('convertForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const format = document.getElementById('format').value;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Redirige al usuario a un servicio externo con la URL del video y formato
    const redirectUrl = `https://api.onlinevideoconverter.pro/api/convert?video=${encodeURIComponent(url)}&format=${format}`;

    const link = document.createElement('a');
    link.href = redirectUrl;
    link.textContent = 'Download Your File';
    link.target = '_blank';
    resultDiv.appendChild(link);
});
