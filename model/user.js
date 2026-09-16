import {DataTypes} from "sequelize";
import {sequelize} from "../services/sequelize.js";

export const User = sequelize.define("user", {
    IP: {
        type: DataTypes.STRING,
    },
    User_Agent: {
        type: DataTypes.STRING
    },
    isAIAssistant: {
        type: DataTypes.BOOLEAN
    },
    isAICrawler: {
        type: DataTypes.BOOLEAN
    },
    isBot: {
        type: DataTypes.BOOLEAN
    },
    isVPN: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
    },
    isTor: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
    },
    isDatacenterIP: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
    },
    Country: {
        type: DataTypes.STRING,
    },
    City: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: "user",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
})