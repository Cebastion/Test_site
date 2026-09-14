import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { UAParser }  from 'ua-parser-js'
import { isAIAssistant, isBot, isAICrawler } from 'ua-parser-js/bot-detection';
import { DB } from "./services/db.js";
import {router} from "./services/router.js";
import {checkDatacenterIP, checkVPN} from "./services/proxyCheck.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);

app.get('/', async (req, res) => {
    const data = UAParser(req.headers['user-agent']);
    const ip = req.socket.remoteAddress;

    const cooked_data = {
        IP: String(ip),
        User_Agent: String(data.ua),
        Browser: String(data.browser.name),
        Browser_Version: String(data.browser.version),
        Device: String(data.device.type),
        Device_Model: String(data.device.model),
        OS: String(data.os.name),
        OS_Version: String(data.os.version),
        Engine: String(data.engine.name),
        Engine_Version: String(data.engine.version),
        CPU: String(data.cpu.architecture),
        isAIAssistant: isAIAssistant(req.headers['user-agent']),
        isAICrawler: isAICrawler(req.headers['user-agent']),
        isBot: isBot(req.headers['user-agent']),
    };

    const geo = checkDatacenterIP(ip);
    cooked_data.isDatacenterIP = geo.isDatacenter;
    cooked_data.org = geo.org;
    cooked_data.country = geo.country;

    const userId = await DB.addedUser(cooked_data);

    res.sendFile('./pages/index.html', { root: __dirname });

    checkVPN(ip).then(vpnData => {
        DB.updateUser(userId, {
            isVPN: vpnData.proxy === 'yes',
            isTor: vpnData.type === 'TOR',
        }).catch(e => console.error('DB update failed:', e));
    }).catch(e => console.error('VPN check failed:', e));
});

app.get("/:name", async (req, res) => {
    const name = req.params.name;

    if(name === "db") {
        const data =   await DB.getAllUsers();
        res.json(data);
    }

    router.route(name, res)
})

app.listen(8080, async () => {
    await DB.init()
});