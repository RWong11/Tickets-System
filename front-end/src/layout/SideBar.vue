<template>
  <div>
    
    <b-sidebar id="sidebar-menu" aria-labelledby="sidebar-menu-title" no-header shadow bg-variant="dark" text-variant="light" visible noCloseOnRouteChange>
        <div class="p-3">
          <div class="d-flex align-items-center flex-column">
            <b-avatar variant="primary" text="ST" class="mr-3" size="5rem"></b-avatar>
            <h4 id="sidebar-menu-title">Sistema de Tickets</h4>
            <div class="divider-menu"></div>
          </div>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item href="/"><b-icon icon="bar-chart-fill"></b-icon> Inicio</b-nav-item>
              <b-nav-item href="/categorias"><b-icon icon="circle"></b-icon> Categorias</b-nav-item>
              <b-nav-item><b-icon icon="person"></b-icon> Personal</b-nav-item>
            </b-nav>
          </nav>
        </div>
    </b-sidebar>
  </div>
</template>


<style>
.nav-item > .nav-link {
  color: #FFF
}
.nav-item > .nav-link:hover {
  color: #CCC
}
</style>