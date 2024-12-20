import { User } from "@types";

const loginUser = async (user: User) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
      console.log("Sending login request:", user);

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/users/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          signal: controller.signal,
      });

      console.log("Received response:", response);
      clearTimeout(timeoutId);
      return response;
  } catch (error) {
      if (error === "AbortError") {
          throw new Error("Request timed out");
      }
      console.error("Login fetch error:", error);
      throw error;
  }
};
  
const UserService = {
    loginUser,
};

export default UserService;