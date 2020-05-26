import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

/* Todas las paginas que requieran navegar con routerlink deben poder acceder a este modulo */
import { RouterModule } from '@angular/router';
/* Para usar directivas como NGFOR o NGIF tenemos que importar el commonmodule */
import { CommonModule } from '@angular/common';

/* Este modulo controla todas las paginas alojadas en pages que son compartidas por la aplicacion, el sidebar
el header, la 404, etc, por eso las exporta ademas de deckararlas */
@NgModule({

    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
    ],
    imports: [
    RouterModule,
    CommonModule
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
    ],

})

export class SharedModule {}