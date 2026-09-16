import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public'); // разрешаем один раз здесь

const route = [
    'index',
    'about',
    'contact',
    'shop'
]

export const router = {
    route: (name, res) => {
        if (route.includes(name)) {
            res.sendFile(`${name}.html`, { root: PUBLIC_DIR });
        }
        else {
            res.sendFile('index.html', { root: PUBLIC_DIR });
        }
    }
}