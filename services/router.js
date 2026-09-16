import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');

const generateRouteList = () => {
    try {
        const files = fs.readdirSync(PUBLIC_DIR);

        const pages = files.filter(file => file.endsWith('.html'));

        return pages;
    } catch (err) {
        console.error(err.message);
        return [];
    }
}

export const router = {
    route: (name, res) => {
        const availablePages = generateRouteList();

        if (availablePages.includes(`${name}.html`)) {
            res.sendFile(`${name}.html`, { root: PUBLIC_DIR });
        } else {
            res.sendFile('index.html', { root: PUBLIC_DIR });
        }
    }
}