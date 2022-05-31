import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

export function getBaseUrl() {
  if (!environment.production)
     //return 'https://192.168.43.3:5000/';
     return 'http://192.168.1.105:5000/';
     //return 'http://localhost:5000/'
     //return 'https://192.168.18.10:5000/'
  else
  return 'https://api.comercial.curbe.com.ec/'
  

}
const providers = [{ provide: "BASE_URL", useFactory: getBaseUrl, deps: [] }];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));