import { User } from "@types";

// TODO:
const loginUser = async (user: User) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); 
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        signal: controller.signal, 
      });
      clearTimeout(timeoutId); 
      return response;
    } catch (error) {
      if (error === "AbortError") {
        throw new Error("Request timed out");
      }
      throw error;
    }
  };
  
const UserService = {
    loginUser,
};

export default UserService;