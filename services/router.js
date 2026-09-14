import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const route = [
    'index',
]

export const router = {
    route: (name, res) => {
        if(route.includes(name)){
            res.sendFile(`./pages/${name}.html`, { root: __dirname });
        }
        else {
            res.sendFile('./pages/404.html', { root: __dirname });
        }
    }
}