# Notas del desarrollo
# Miercoles a las 8 de la tarde  
*ENTREGA hoy*
*--------------------------------------------------*
dejar imagen en vez de slider en programacoon html
*--------------------------------------------------*

*--------------------------------------------------*
Perzonalizar una pagina y copiarla 
para solo cambiar el contenido a mostrar
*--------------------------------------------------*
ocultar  seccion directiva 
*--------------------------------------------------*
slider con boton a 
La programacion de abril
Los pdf individual
Al las capsulas para ver los videio docu
*--------------------------------------------------*
poner instagram en cta, buscar el insta
*--------------------------------------------------*
efect que le guisto a al aditi
*--------------------------------------------------*
ordenar css
*--------------------------------------------------*
poner barra nav para telefonos  Esn el css del nav
*--------------------------------------------------*
TRABAJAR en seccion de preoyectos
*--------------------------------------------------*
Hacer .html de Capsulas y 
*--------------------------------------------------*
visita a cementerio Disidentes, Comité Gestor de Patrimonio ,Valparaíso Creativo -Corfo Otubre 2023
*--------------------------------------------------*
Directiva poner nombres

directiva poner fotos
*--------------------------------------------------*
Slider en hero
*--------------------------------------------------*
logos actualizar 
*--------------------------------------------------*
Iconos en objetivos
*--------------------------------------------------*
telefon aditi
*--------------------------------------------------*
Seccion testimonios va a ser seccion a
Ponencias en Blogspot red iberoamericana
*--------------------------------------------------*
ubicacion con los cementerios parroquiales para poner en mapa 
Cementerio Numero Dos calle dinamarca 217
Cementerio Numero Uno 
Cementerio Disidentes 

*--------------------------------------------------*\
TESTIMONIOS DEBAJO DE DIRECTIVA 
PONER SOCIOS  
*--------------------------------------------------*
*--------------------------------------------------*
# importante 
10 abril despliegue 
subir al servidor 
*--------------------------------------------------*
\\ preguntas
Galeria de imagenes de instagram 

Con y sin video 
4ta persona directiva
Preguntar la direccion para poner en el nav y mapa
video 
quiere que vaya la seccion de testimonios?
me habia mencionado a un hijo ilustre

[directiva con foto grupal debajo] 
Quiere que vaya la directiva completa al sitio web?

[pensar]
Como le gustaria incluir el material audivisual videos?
Como le gustaria incluir el material del proyecto portico junto a los
planos en pdf 

alquime de almas coreana




*--------------------------------------------------*
# # # # # # # # # # # # # # # # # # # # # # # # # #



*Comandos*
ctrl b
ctrl + k + ctrl c
CTL ,

ctrl+c luego ctrl+k para comentar
ctrl +c luego ctrl +u para descomentar

ctrl p
ctlr shif p

Shift + Alt + F

  display: flex;
  align-items: center;
  justify-content: center;

# preguntas
que foto le gustarian

transparencia 
seccion de proyectos
o seccion de biblioteca o bibliografia seccion prensa






<!-- ======= Vídeo de fondo ======= -->
  <video id="background-video" autoplay loop muted poster="assets/img/mapa.jpg">
    <source src="assets/img/CompactoHuertas.mp4.mp4" type="video/mp4">
  </video>
<!-- ======= End Vídeo de fondo ======= -->


#background-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  filter: blur(8px);

}