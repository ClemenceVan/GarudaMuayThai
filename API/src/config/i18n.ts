/* Modules */
import i18next from "i18next";
import fs from "fs";

/* Constants */
import { dot, en, dev } from "../constants/general";

const resources = {} as any;

fs.readdirSync(`${__dirname}/locales`).map((file : string) => {
    resources[file.split(dot)[0]] = {
        translation: JSON.parse(fs.readFileSync(`${__dirname}/locales/${file}`, "utf8"))
    }
});

i18next.init({
    lng: en,
    debug: false,
    resources,
    fallbackLng: [en, dev],
});


export default i18next.t;