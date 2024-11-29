const getAllProducts = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/api/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export default { getAllProducts };