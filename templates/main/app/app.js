import { i18n } from '@thewebformula/lithe';
import en from './locales/en.json' assert { type: "json" };
import es from './locales/es.json' assert { type: "json" };
import './routes/index/index.js';


i18n.addTranslation('en', en);
i18n.addTranslation('es', es);
