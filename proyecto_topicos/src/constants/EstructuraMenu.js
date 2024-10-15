export const EstructuraMenu = {
  "Navegacion": {
    "etiqueta": "Navegación",
    "items": [
      {
        "etiqueta": "Inicio",
        "Path": "/",
        "icon": "mdi-home",
        "Hijos": []
      }
    ]
  },

  "Herencia": {
    "etiqueta": "Herencia",
    "items": [
      {
        "etiqueta": "Persona",
        "Path": "",
        "icon": "mdi-account-group",
        "Hijos": [
          {
            "etiqueta": "Clientes",
            "Path": "/clientesA",
            "icon": "mdi-account",
            "Hijos": []
          },
          {
            "etiqueta": "Empleados",
            "Path": "/empleadosA",
            "icon": "mdi-account",
            "Hijos": []
          }]
      }
    ]
  }

};
