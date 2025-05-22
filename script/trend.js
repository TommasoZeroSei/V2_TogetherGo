document.addEventListener("DOMContentLoaded", () => {
    
    const trendOptions = document.querySelectorAll(".trend-select");

    trendOptions.forEach(option => {
        option.addEventListener("click", () => {
            const trendType = option.dataset.trend;
            
            console.log(trendType);

            if (trendType) {
                localStorage.setItem("selectedTrend", trendType);
                window.location.href = "trend_scelto.html";
            } else {
                alert("Errore nel selezionare il trend.");
            }
            
    
        });
    });
});
