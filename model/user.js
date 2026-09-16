import {DataTypes} from "sequelize";
import {sequelize} from "../services/sequelize.js";

export const User = sequelize.define("user", {
    IP: {
        type: DataTypes.STRING,
    },
    ASN: {
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
    VPN: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
    },
    Proxy: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
    },
    Tor: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
    },
    Operator: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    isDatacenterIP: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
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