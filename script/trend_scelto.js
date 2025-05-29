document.addEventListener("DOMContentLoaded", () => {
    const trendType = localStorage.getItem("selectedTrend");
    if (!trendType) {
        document.body.innerHTML = "<h2>Errore: nessuna tendenza selezionata.</h2>";
        return;
    }

    const pageTitle = document.getElementById("pageTitle");

    switch (trendType) {
        case "citta":
            pageTitle.textContent = "Top 10 Città più visitate";
            
            fetch("get_trends.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ trend: trendType })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
        
                const list = document.getElementById("trendList");
                
                data.forEach((item, index) => {
                    const li = document.createElement("li");
                    li.textContent = `${item.nome}`;
                    list.appendChild(li);
                });
                
                document.body.appendChild(list);
            })
            .catch(err => {
                console.error(err);
                document.body.innerHTML = "<h2>Errore nel caricamento della classifica.</h2>";
            });

            break;

        case "nazioni":
            pageTitle.textContent = "Top 10 Nazioni più visitate";
            
            fetch("get_trends.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ trend: trendType })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            
                const list = document.getElementById("trendList");
                list.innerHTML = ""; // pulisci la lista prima di riempirla
            
                data.forEach((item, index) => {
                    const li = document.createElement("li");
                    li.textContent = `${item.nazione}`;
                    list.appendChild(li);
                });
            })
            .catch(err => {
                console.error(err);
                document.body.innerHTML = "<h2>Errore nel caricamento della classifica.</h2>";
            });
           

            break;

        case "trasporti":
            pageTitle.textContent = "Mezzi di trasporto più usati";

            break;
        case "tempo":
            pageTitle.textContent = "i mesi in cui si parte di più";
            break;
        default:
            pageTitle.textContent = "Classifica";
    }

   
});
