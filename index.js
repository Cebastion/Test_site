import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { UAParser } from 'ua-parser-js';
import { isAIAssistant, isBot, isAICrawler } from 'ua-parser-js/bot-detection';
import { DB } from "./services/db.js";
import { router } from "./services/router.js";
import { checkDatacenterIP, checkVPN } from "./services/proxyCheck.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3094;
const app = express();

const ipCache = new Map();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', true);

app.get("/:name", async (req, res, next) => {
    const name = req.params.name;

    if (name.includes('.')) {
        return res.status(404).send('Not found');
    }

    const ip = req.ip;
    const userAgent = req.headers['user-agent'] || '';

    try {
        let dcInfo, vpnInfo;
        const cacheKey = String(ip);

        if (ipCache.has(cacheKey)) {
            ({ dcInfo, vpnInfo } = ipCache.get(cacheKey));
        } else {
            [dcInfo, vpnInfo] = await Promise.all([
                Promise.resolve(checkDatacenterIP(ip)).catch(() => ({})),
                checkVPN(ip).catch(() => ({}))
            ]);

            ipCache.set(cacheKey, { dcInfo, vpnInfo });

            setTimeout(() => ipCache.delete(cacheKey), 3600000);
        }

        const data = UAParser(userAgent);

        const cooked_data = {
            IP: cacheKey,
            User_Agent: String(data.ua),
            Operator: vpnInfo?.operator || 'Unknown',
            isDatacenter: dcInfo?.isDatacenter || false,
            isBot: isBot(userAgent),
            isAICrawler: isAICrawler(userAgent),
            isAIAssistant: isAIAssistant(userAgent),
            VPN: vpnInfo?.vpn || false,
            ASN: vpnInfo?.asn || null,
            Proxy: vpnInfo?.proxy || false,
            Tor: vpnInfo?.tor || false,
        };

        DB.addedUser(cooked_data).catch(err => {
            console.error(`Ошибка записи в БД для IP ${ip}:`, err.message);
        });

        router.route(name, res);

    } catch (error) {
        console.error("Критическая ошибка в маршруте /:name:", error);
        res.status(500).send("Внутренняя ошибка сервера");
    }
});

app.listen(PORT, async () => {
    try {
        await DB.init();
        console.log(`DB ready, server listening on ${PORT}`);
    } catch (err) {
        console.error("Ошибка инициализации БД:", err);
    }
});