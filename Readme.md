# Proyecto de Automatización con Playwright

Este proyecto utiliza [Playwright](https://playwright.dev/) para realizar pruebas automatizadas de aplicaciones web.

## Estructura del Proyecto


### Archivos y Carpetas Principales

- **`package.json`**: Contiene las dependencias y scripts del proyecto.
- **`playwright.config.ts`**: Archivo de configuración de Playwright.
- **`tests/`**: Carpeta que contiene los archivos de pruebas automatizadas.
- **`playwright-report/`**: Carpeta donde se generan los reportes de las pruebas.
- **`test-results/`**: Carpeta que almacena los resultados de las pruebas.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>

npx playwright test --grep "Title of the test"


How to set the baseURL 
set baseURL = http://www.google.com
How to ask 4 the baseURL 
echo %baseURL%


USE TRACEVIEWER con esto se ve la grabación de la petición y el proceso realizado, headers, requests, etc

npx playwright test --grep "test name"
npx playwright show-trace