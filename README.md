# Comic Fight

Página creada con Angular 18 como solución del reto de mouredev. A continuación, las instrucciones del reto:

EJERCICIO:

¡Deadpool y Wolverine se enfrentan en una batalla épica!
Crea un programa que simule la pelea y determine un ganador.
El programa simula un combate por turnos, donde cada protagonista posee unos
puntos de vida iniciales, un daño de ataque variable y diferentes cualidades
de regeneración y evasión de ataques.

Requisitos:

- El usuario debe determinar la vida inicial de cada protagonista.
- Cada personaje puede impartir un daño aleatorio:
  - Deadpool: Entre 10 y 100.
  - Wolverine: Entre 10 y 120.
- Si el daño es el máximo, el personaje que lo recibe no ataca en el
  siguiente turno, ya que tiene que regenerarse (pero no aumenta vida).
  -ada personaje puede evitar el ataque contrario:
  - Deadpool: 25% de posibilidades.
  - Wolverine: 20% de posibilidades.
- Un personaje pierde si sus puntos de vida llegan a cero o menos.
  Acciones:

1. Simula una batalla.
2. Muestra el número del turno (pausa de 1 segundo entre turnos).
3. Muestra qué pasa en cada turno.
4. Muestra la vida en cada turno.
5. Muestra el resultado final.
