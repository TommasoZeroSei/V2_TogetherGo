document.addEventListener('DOMContentLoaded', () => {
    fetch('get_trends.php') // aggiorna questo con il percorso reale del PHP
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nel recupero dei dati');
            }
            return response.json();
        })
        .then(data => {
            const trendList = document.getElementById('trendList');
            trendList.innerHTML = ''; // svuota eventuali <li> già presenti

            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.destinazione} (${item.contatore} visite)`;
                trendList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Errore durante il fetch:', error);
        });
});
