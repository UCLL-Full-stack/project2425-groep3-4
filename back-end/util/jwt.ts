import jwt from "jsonwebtoken";

const generateJwtToken = ({ username, role }): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'calorie-track-pro' };

    try {
        return jwt.sign({username, role}, process.env.JWT_SECRET, options);
    } catch (error) {
        throw new Error("Error generation JWT token, see server log for details.")
    }
};

export { generateJwtToken };