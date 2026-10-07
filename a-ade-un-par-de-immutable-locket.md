# Plan: Añadir Generadores de Email y Contraseña

## Context
Expandir la aplicación Lorem Ipsum para incluir dos generadores adicionales: un generador de emails de prueba y un generador de contraseñas. La aplicación pasará de un único widget a un layout de tres widgets en grid que se adapte a dispositivos móviles.

## Requisitos
- **Generador de Email**: Generar emails simples aleatorios (ej: user123@test.com)
- **Generador de Contraseña**: Generar contraseñas con mayúsculas, minúsculas, números y caracteres especiales, con longitud aleatoria (12-20 caracteres)
- **Layout**: Tres widgets en grid (lado a lado en desktop, apilados en móvil)
- **Funcionalidad**: Cada widget debe incluir:
  - Botón para generar
  - Cuadro de texto con el resultado
  - Botón para copiar al portapapeles con popup "¡Copiado!"
  - Contador de caracteres

## Cambios a Realizar

### 1. HTML (`index.html`)
- **Restructurar layout**: Cambiar el contenedor principal de un widget a un grid de 3 columnas
- **Widget 1 (Lorem Ipsum)**: Mantener la estructura actual pero dentro de un contenedor grid
- **Widget 2 (Email Generator)**: Nueva sección con:
  - Campo de entrada (número de emails a generar)
  - Botón "Generar Emails"
  - Textarea para mostrar los emails
  - Botón "Copiar al portapapeles"
  - Contador de caracteres
- **Widget 3 (Password Generator)**: Nueva sección con:
  - Botón "Generar Contraseña"
  - Textarea para mostrar la contraseña
  - Botón "Copiar al portapapeles"
  - Contador de caracteres

### 2. CSS (`styles.css`)
- **Grid layout**: 
  - Desktop (>768px): 3 columnas iguales
  - Tablet/Mobile (<768px): 1 columna, apilados verticalmente
- **Widget card**: Nuevo estilo de contenedor para cada widget (borde, padding, sombra)
- **Reutilizar estilos existentes**: Los botones y textarea ya existen, solo ajustar para que funcionen en el nuevo grid
- **Responsive**: Media queries para ajustar spacing y tamaños en dispositivos pequeños

### 3. JavaScript (`script.js`)
- **Función `generateEmails()`**: Generar array de emails aleatorios
  - Nombres: lista de nombres comunes aleatorios
  - Dominios: lista de dominios de prueba (test.com, example.com, demo.org)
  - Separar cada email con salto de línea
- **Función `generatePassword()`**: Generar contraseña aleatoria
  - Caracteres especiales: !@#$%^&*
  - Longitud aleatoria entre 12-20
  - Mezclar tipos de caracteres para garantizar variedad
- **Reutilizar**:
  - `updateCharCounter()` para ambos nuevos widgets
  - `showNotification()` para el popup "¡Copiado!"
  - Estructura general de event listeners

## Archivos a Modificar
1. `index.html` - Estructura HTML con grid y 3 widgets
2. `styles.css` - Grid layout responsivo y estilos de widgets
3. `script.js` - Nuevas funciones de generación + lógica de event listeners

## Verificación
1. **Visual**: Verificar que los 3 widgets se muestren en grid en desktop y apilados en móvil
2. **Lorem Ipsum**: Debe seguir funcionando igual (generar párrafos, copiar, contador)
3. **Email Generator**: 
   - Genera emails válidos con formato correcto
   - Muestra varios emails separados por saltos de línea
   - Copiar funciona y muestra popup
   - Contador actualiza correctamente
4. **Password Generator**:
   - Genera contraseñas con todos los tipos de caracteres
   - Cada generación produce contraseñas diferentes
   - Longitud varía entre 12-20 caracteres
   - Copiar funciona y muestra popup
   - Contador actualiza correctamente
5. **Responsive**: Probar en dispositivos pequeños que el layout se adapta correctamente
