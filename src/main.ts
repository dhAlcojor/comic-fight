import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'
import { inject as vercelInject } from "@vercel/analytics"
import { environment } from './environments/environment'
import { enableProdMode } from '@angular/core'

console.log('Environment:', environment)

if (environment.isProduction) {
	console.log('Production mode')
	enableProdMode()
	// vercelInject({
	// 	mode: environment.isProduction ? 'production' : 'development',
	// 	debug: !environment.isProduction,
	// })
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))
