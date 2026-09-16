import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { UAParser } from 'ua-parser-js';
import { isAIAssistant, isBot, isAICrawler } from 'ua-parser-js/bot-detection';
import { DB } from "./services/db.js";
import { router } from "./services/router.js";
import {checkDatacenterIP, checkVPN} from "./services/proxyCheck.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3094;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', true);

app.get("/:name", async (req, res) => {
    const name = req.params.name;

    const data = UAParser(req.headers['user-agent']);
    const ip = req.ip;

    const dcInfo = checkDatacenterIP(ip);
    const vpnInfo = await checkVPN(ip);

    const cooked_data = {
        IP: String(ip),
        User_Agent: String(data.ua),
        isAIAssistant: isAIAssistant(req.headers['user-agent']),
        isAICrawler: isAICrawler(req.headers['user-agent']),
        isBot: isBot(req.headers['user-agent']),
        isDatacenter: dcInfo.isDatacenter,
        org: dcInfo.org,
        country: dcInfo.country,
        city: dcInfo.city,
        vpn: vpnInfo?.proxy === 'yes',
        vpnType: vpnInfo?.type || null,
    };

    await DB.addedUser(cooked_data);

    router.route(name, res);
});


app.listen(PORT, async () => {
    await DB.init();
    console.log(`DB ready, server listening on ${PORT}`);
});
