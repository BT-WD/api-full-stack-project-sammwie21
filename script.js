
const button = document.getElementById("search-btn");
const input = document.getElementById("search-input");
const container = document.getElementById("data-container");

// Fetch random image by breed
async function fetchDogByBreed(breed) {
  try {
    console.log("Fetching breed:", breed);

    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    console.log("API response:", data); // 

    if (data.status !== "success") {
      throw new Error("Invalid breed");
    }

    return data.message;

  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Handle search
async function searchDog() {
  const breed = input.value.toLowerCase().trim();

  if (!breed) {
    container.innerHTML = "<p>Please enter a breed.</p>";
    return;
  }

  container.innerHTML = "<p>Loading...</p>";

  const imageUrl = await fetchDogByBreed(breed);

  if (!imageUrl) {
    container.innerHTML = "<p>Breed not found. Try something like 'husky' or 'beagle'.</p>";
    return;
  }

  container.innerHTML = `
    <div class="dog-card">
      <h4>${breed.toUpperCase()}</h4>
      <img src="${imageUrl}" alt="${breed}">
    </div>
  `;
}

// Button click
button.addEventListener("click", searchDog);

// Enter key support
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchDog();
  }
});
