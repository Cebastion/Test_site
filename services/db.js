import { User } from "../model/user.js";
import { sequelize } from "./sequelize.js";

export const DB = {
    init: async () => {
        await sequelize.sync();
    },
    addedUser: async (user_data) => {
        await User.create(user_data);
    },
};