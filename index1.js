const BASE_URL = "https://6799f84e747b09cdcccd2e7a.mockapi.io/";
let mode = "CREATE";
let selectedId = -1;

const validateData = (productData) => {
  let errors = [];
  if (!productData.Brandname) {
    errors.push("กรุณาใส่ Brandname");
  }
  if (!productData.Explanation) {
    errors.push("กรุณาใส่ Explanation");
  }
  if (!productData.Price) {
    errors.push("กรุณาใส่ Price");
  }
  if (!productData.Size) {
    errors.push("กรุณาใส่ Size");
  }
  return errors;
};

const submitData = async () => {
  let BrandnameDOM = document.querySelector("input[name=Brandname]");
  let ExplanationDOM = document.querySelector("input[name=Explanation]");
  let PriceDOM = document.querySelector("input[name=Price]");
  let SizeDOM = document.querySelector("input[name=Size]");

  let responseMessageDOM = document.getElementById("response-message");

  let productData = {
    Brandname: BrandnameDOM.value,
    Explanation: ExplanationDOM.value,
    Price: PriceDOM.value,
    Size: SizeDOM.value,
  };

  // Validate the data
  let errors = validateData(productData);
  if (errors.length > 0) {
    responseMessageDOM.innerText = errors.join("\n");
    responseMessageDOM.className = "message danger";
    return;
  }

  try {
    let response;
    let successText = "เพิ่มข้อมูลเรียบร้อย !";

    if (mode === "EDIT") {
      response = await axios.put(
        `${BASE_URL}/FinalProject/${selectedId}`,
        productData
      );
      successText = "แก้ไขข้อมูลเรียบร้อย !";
    } else {
      response = await axios.post(`${BASE_URL}/FinalProject`, productData);
    }

    responseMessageDOM.innerText = successText;
    responseMessageDOM.className = "message success";
  } catch (error) {
    responseMessageDOM.innerText = "มีปัญหาเกิดขึ้น";
    responseMessageDOM.className = "message danger";
  }
};

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    mode = "EDIT";
    selectedId = id;

    let BrandnameDOM = document.querySelector("input[name=Brandname]");
  let ExplanationDOM = document.querySelector("input[name=Explanation]");
  let PriceDOM = document.querySelector("input[name=Price]");
  let SizeDOM = document.querySelector("input[name=Size]");

    try {
      const response = await axios.get(`${BASE_URL}/FinalProject/${id}`);
      const product = response.data;

      BrandnameDOM.value = product.Brandname;
      ExplanationDOM.value = product.Explanation;
      PriceDOM.value = product.Price;
      SizeDOM.value = product.Size;

    } catch (error) {
      console.log("error", error);
    }
  }
};
