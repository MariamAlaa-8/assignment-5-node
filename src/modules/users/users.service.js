import { User } from "../../DB/index.js";
import { Op } from "sequelize";

//a2


export const upsertUserService = async (id, data) => {
    const { name, email, password, role } = data;

    const user = await User.findByPk(id);

    let isNew = false;  

    if (user) {
       
        await user.update(
            { name, email, password, role },
            { validate: false }
        );
        return { user, isNew: false };
    }

  
    isNew = true;
    const newUser = await User.create(
        { id, name, email, password, role },
        { validate: false }
    );
    return { user: newUser, isNew: true };
};
//a3

export const getUserByEmailService = async (email) => {
    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        const error = new Error("no user found");
        error.cause = { status: 404 };
        throw error;
    }

    return user;
};

//a4
export const getUserByIdService = async (id) => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["role"]
        }
    });

    if (!user) {
        const error = new Error("no user found");
        error.cause = { status: 404 };
        throw error;
    }

    return user;
};