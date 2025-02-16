document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "FsEvzeEYbydcSIZVWXote5uPjxPdv7QI7UlGlqTo"; // Sostituisci con la tua chiave API della NASA
  const form = document.getElementById("filter-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rover = document.getElementById("rover").value;
    const camera = document.getElementById("camera").value;
    const sol = document.getElementById("sol").value;
    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}`;
    if (camera) {
      apiUrl += `&camera=${camera}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const dataContainer = document.getElementById("data-container");
        dataContainer.innerHTML = ""; // Clear previous results

        if (data.photos.length === 0) {
          dataContainer.innerHTML =
            "<p>No photos found for the selected filters.</p>";
          return;
        }

        data.photos.forEach((photo) => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${photo.rover.name} - ${photo.camera.full_name}</h3>
            <p>${photo.earth_date}</p>
            <img src="${photo.img_src}" alt="Mars Rover Photo" />
          `;
          dataContainer.appendChild(card);
        });
      })
      .catch((error) => {
        const dataContainer = document.getElementById("data-container");
        dataContainer.innerHTML =
          "<p>Error fetching data from NASA API. Please try again later.</p>";
        console.error("Error fetching data from NASA API:", error);
      });
  });

  // Trigger initial load without filters
  form.dispatchEvent(new Event("submit"));
});
