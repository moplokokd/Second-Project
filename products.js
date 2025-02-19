const BASE_URL = "https://6799f84e747b09cdcccd2e7a.mockapi.io/";

window.onload = async () => {
  await loadData();
};

// Function to load and display users
const loadData = async (searchTerm = "") => {
  // Get all users from the backend
  const response = await axios.get(`${BASE_URL}/FinalProject`);
  let products = response.data;
  console.log("products", products);
  // Filter users based on the search term
  if (searchTerm) {
    products = products.filter(
      (product) =>
        String(product.pro_name)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(product.pro_inch)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }

  // Construct HTML for the table
  let productHTMLData = `
    <table border="1" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th>Brandname</th>
          <th>Explanation</th>
          <th>Price</th>
          <th>Size</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>`;

  for (let i = 0; i < products.length; i++) {
    //Start Loop Data
    productHTMLData += `<tr>
      <td>${products[i].Brandname}</td>
      <td>${products[i].Explanation}</td>
      <td>${products[i].Price}</td>
      <td>${products[i].Size}</td>
      <td>
        <button onclick="editUser(${products[i].id})">Edit</button>
        <button class='delete' data-id='${products[i].id}'>Delete</button>
      </td>
    </tr>
    `;
  } // End Loop Data

  productHTMLData += `
      </tbody>
    </table>`;
  // Insert the HTML into the DOM
  let productsDOM = document.getElementById("products");
  productsDOM.innerHTML = productHTMLData;

  // Attach click event listeners to all delete buttons
  let deleteDOMs = document.getElementsByClassName("delete");
  for (let i = 0; i < deleteDOMs.length; i++) {
    deleteDOMs[i].addEventListener("click", async (event) => {
      let id = event.target.dataset.id;
      try {
        await axios.delete(`${BASE_URL}/FinalProject/${id}`);
        loadData(); // Reload data after deletion
      } catch (error) {
        console.log("error", error);
      }
    });
  }

  // Check if the page was reloaded after an edit
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("edited")) {
    await loadData(); // Reload data after an edit
  }
};

// Function to handle edit action
const editUser = (id) => {
  // Navigate to the edit page and set the edited flag
  window.location.href = `index1.html?id=${id}&edited=true`;
};

// Function to handle search action
const handleSearch = async () => {
  const searchInput = document.getElementById("search").value;
  console.log("searchInput", searchInput);
  await loadData(searchInput);
};