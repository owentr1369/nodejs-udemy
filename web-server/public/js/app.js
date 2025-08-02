console.log("Client side js has bean loaded 2");

const searchForm = document.getElementById("searchForm");
if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value;
    fetchProducts(searchTerm);
  });
}

const fetchProducts = (searchTerm) => {
  const productsContainer = document.getElementById("productsContainer");
  // Show loading animation
  productsContainer.innerHTML = `
    <div class="flex justify-center items-center py-12">
      <svg class="animate-spin h-8 w-8 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span class="text-blue-600 text-lg">Loading...</span>
    </div>
  `;

  const productApiUrl = `http://localhost:3000/products?search=${searchTerm}`;
  fetch(productApiUrl)
    .then((res) => res.json())
    .then((data) => {
      productsContainer.innerHTML = ""; // Clear loading animation

      if (Array.isArray(data.products) && data.products.length > 0) {
        // Add a grid layout for product cards
        const gridDiv = document.createElement("div");
        gridDiv.className =
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";

        data.products.forEach((product, idx) => {
          const productDiv = document.createElement("div");
          productDiv.className =
            "bg-white rounded-lg shadow-md p-6 flex flex-col gap-2 border border-gray-200 hover:shadow-lg transition-shadow duration-200";

          productDiv.innerHTML = `
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-gray-400">#${idx + 1}</span>
              <span class="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 font-semibold">ID: ${
                product.id
              }</span>
            </div>
            <h2 class="text-lg font-bold text-gray-800 mb-1">${
              product.name
            }</h2>
            <div class="text-sm text-gray-600 break-words">
              <span class="font-semibold">Data:</span>
              <span class="block mt-1 bg-gray-50 rounded p-2 text-xs font-mono text-gray-700">${
                product.data ? JSON.stringify(product.data, null, 2) : "null"
              }</span>
            </div>
          `;
          gridDiv.appendChild(productDiv);
        });

        productsContainer.appendChild(gridDiv);
      } else {
        productsContainer.innerHTML = `
          <div class="text-center text-gray-500 py-8">
            <span class="inline-block px-4 py-2 bg-gray-100 rounded">No products found.</span>
          </div>
        `;
      }
    })
    .catch((error) => {
      productsContainer.innerHTML = `
        <div class="text-center text-red-500 py-8">
          <span class="inline-block px-4 py-2 bg-red-100 rounded">Failed to load products.</span>
        </div>
      `;
    });
};
