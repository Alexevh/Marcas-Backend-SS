import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

/* Todas las paginas que requieran navegar con routerlink deben poder acceder a este modulo */
import { RouterModule } from '@angular/router';
/* Para usar directivas como NGFOR o NGIF tenemos que importar el commonmodule */
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';

/* Este modulo controla todas las paginas alojadas en pages que son compartidas por la aplicacion, el sidebar
el header, la 404, etc, por eso las exporta ademas de deckararlas */
@NgModule({

    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        FooterComponent,
        ChatComponent,
    ],
    imports: [
    RouterModule,
    CommonModule,
    PipesModule,
    FormsModule
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        FooterComponent,
        ChatComponent
    ],

})

export class SharedModule {}