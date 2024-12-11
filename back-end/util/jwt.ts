import jwt from "jsonwebtoken";
import { Role } from "../types";

const generateJwtToken = ({ username, role }: { username: string, role: Role}): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'Warehouse management system' };

    try {
        return jwt.sign({username, role}, process.env.JWT_SECRET!, options);
    } catch (error) {
        throw new Error("Error generation JWT token, see server log for details.")
    }
};

export { generateJwtToken };