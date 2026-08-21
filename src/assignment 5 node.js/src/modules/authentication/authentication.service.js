import { User } from "../../DB/index.js";

export const signupService = async (inputs) => {
    const { name, email, password, role } = inputs;

    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.cause = { status: 400 };
        throw error;
    }
    const user = await User.create({
        name,
        email,
        password,
        role});

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};
