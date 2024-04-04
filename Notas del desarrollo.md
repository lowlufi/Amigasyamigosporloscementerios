# Notas del desarrollo
# Miercoles a las 8 de la tarde  
*ENTREGA hoy*
*--------------------------------------------------*
slider con boton a 
los pdf individual
al videio docu


*--------------------------------------------------*
Centrar la seccion de programacion
*--------------------------------------------------*
añadir seccion para poner interaccon con los pdf
*--------------------------------------------------*
ver donde y como poner trozo de video interesante 
o video completo
*--------------------------------------------------*
en seccion de preogramcion
#raices poner boton en el slider que lleve a 
la pagina protfolio inner del gp 
ahi estaria el video o los pdf tmb 

*--------------------------------------------------*
TRABAJAR en seccion de preoyectos
*--------------------------------------------------*
ordenar css
*--------------------------------------------------*
poner instagram en cta, buscar el insta
*--------------------------------------------------*
poner barra nav para telefonos 
*--------------------------------------------------*
cambiar a color amarillo a #CE5353
*--------------------------------------------------*
video como background 
*--------------------------------------------------*
VER VIDEOS DOCUMENTALES dejando notas
subir con insta pero mostrar en local con FOTOGRAFIA

# importante 

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