const productapi = "https://safehomecam.com/api/" + "products/";
// const productapi = "http://192.168.27.123:8000/api/products/"
//console.log(productapi);
export async function reqGetAllProduct() {
  try {
    const response = await fetch(productapi + "?action=selectall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
      //body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("99",await response.headers)
    return await response.json();
  } catch (error) {

    console.error("Errors:", error









          


    );
    throw error; // 重新抛出错误，以便调用者可以处理它
  }
}

export async function reqGetProductbyFilter(filterParams: any) {
  try {
    const response = await fetch(productapi + "?action=selectbyfilters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterParams),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // 重新抛出错误，以便调用者可以处理它
  }
}
