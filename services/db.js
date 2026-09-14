import { User } from "../model/user.js";
import { sequelize } from "./sequelize.js";

export const DB = {
    init: async () => {
        await sequelize.sync();
    },
    addedUser: async (user_data) => {
        const user = await User.create(user_data);
        return user.id;
    },
    updateUser: async (id, patch) => {
        await User.update(patch, { where: { id } });
    },
    getAllUsers: async () => {
        return User.findAll({
            order: [['createdAt', 'DESC']],
        });
    },
};