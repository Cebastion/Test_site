import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const route = [
    'index',
    'about',
    'contact',
    'shop'
]

export const router = {
    route: (name, res) => {
        if(route.includes(name)){
            res.sendFile(`../public/${name}.html`, { root: __dirname });
        }
        else {
            res.sendFile('../public/index.html', { root: __dirname });
        }
    }
}