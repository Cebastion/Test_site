import {DataTypes} from "sequelize";
import {sequelize} from "../services/sequelize.js";

export const User = sequelize.define("user", {
    IP: {
        type: DataTypes.STRING,
    },
    User_Agent: {
        type: DataTypes.STRING
    },
    Browser: {
        type: DataTypes.STRING
    },
    Browser_Version: {
        type: DataTypes.STRING
    },
    Device: {
        type: DataTypes.STRING
    },
    Device_Model: {
        type: DataTypes.STRING
    },
    OS: {
        type: DataTypes.STRING
    },
    OS_Version: {
        type: DataTypes.STRING
    },
    Engine: {
        type: DataTypes.STRING,
    },
    Engine_Version: {
        type: DataTypes.STRING,
    },
    CPU: {
        type: DataTypes.STRING,
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
    ASN_Org: {
        type: DataTypes.STRING,
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