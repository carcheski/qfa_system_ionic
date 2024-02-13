import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { UsuarioService } from 'src/services/domain/usuario.service';
import { AuthInterceptorProvider } from 'src/interceptors/auth.interceptor';
import { ClienteService } from 'src/services/domain/cliente.service';
import { ProdutoService } from 'src/services/domain/produto.service';
import { CartService } from 'src/services/domain/cart.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HomePage } from './home/home.page';


registerLocaleData(localePt);
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ 
    provide:
      RouteReuseStrategy, 
      useClass: 
      IonicRouteStrategy
    },
    {
      provide:
        LOCALE_ID, useValue: 'pt-BR'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    UsuarioService,
    ClienteService,
    ProdutoService,
    CartService,
    HomePage
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
