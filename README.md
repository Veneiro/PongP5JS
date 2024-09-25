# PongP5JS
<main>
        <h1>Ayuda</h1>
        <h2>Controles básicos</h2>
        <section>
            <p>Para poder jugar al juego tendrás que usar las flechas del teclado. Si pulsas la flecha izquierda la pala
                se moverá hacia la izquierda y si pulsas la flecha derecha ocurrirá lo mismo pero en el otro sentido</p>
            <p>
                El área de juego está marcada en negro, este área será a través de la cual se expandirá la pantalla a
                medida que avance el juego, este punto será explicado en el apartado de "Evolución y aumento de la
                dificultad".
            </p>
        </section>
        <h2>Idea principal del juego</h2>
        <section>El juego tratará de asemejarse al juego que podríamos jugar con una raqueta, la pelota rebotará en la
            pala y por su propia gravedad volverá a caer. El jugador deberá tratar de llegar al mayor número de "toques"
            posibles sin que la pelota se caiga por la parte inferior de la pantalla<section>
                <h2>Evolución y aumento de la dificultad</h2>
                <section>
                    <p>A diferencia de lo que tenemos en la vida real la partida no permanecerá estática hasta que el
                        jugador falle por cansancio o por haber aguantado mucho tiempo, a lo largo de una partida se
                        irán aplicando diferentes modificadores para que el jugador tenga que permanecer en constante
                        alerta y aprender a medida que va aumentando su puntación</p>
                    <ul>
                        <li>
                            Aumento del rebote: Cada 5 puntos obtenidos el rebote de la pelota en la pala aumentará,
                            podemos imaginarnos esto como que la pala se hace más elástica. Esto provocará que poco a
                            poco la pelota llegue más arriba con un mismo "toque".
                        </li>
                        <li>
                            Aumento del ángulo de rebote: Cada 5 puntos obtenidos por el jugador la pelota podrá rebotar
                            poco a poco de manera más inconsistente y con ángulos más abiertos lo que provocará que el
                            jugador deba estar alerta por si la pelota rebota de manera más agresiva
                        </li>
                        <li>
                            Aumento de la sensibilidad: Cada 5 puntos la sensibilidad al mover la pala aumentará de
                            manera que al jugador le será más complicado dejar la pala en la posición deseada
                        </li>
                        <li>
                            Aumento del espacio: Cada 50 puntos el área horizontal de la zona de juego se aumentará
                            provocando que la pelota pueda rebotar más lejos hacia los lados. Esto no se producirá de
                            manera infinita, tendrá como límite el tamaño de la pantalla en la que se esté jugando.
                        </li>
                        <li>
                            Rebote en los límites del área de juego: A primera vista parece una simple pared o techo,
                            pero según vaya aumentando la fuerza de rebote de la pelota un mal rebote puede ocasionar la
                            perdida de una vida.
                        </li>
                        <li>
                            Disminución de la pala: A la vez que unas cosas aumentan, otras se reducen. Tras conseguir
                            50 puntos el ancho de tu pala se reducirá.
                        </li>
                    </ul>
                </section>
                <h2>Sonido</h2>
                <section>
                    <article>
                        <p>Todos los recursos sonoros del juego han sido generados de manera manual utilizando la
                            herramienta Sonic Pi vista en clase
                        <p>
                    </article>
                    <article>
                        <h3>Sonidos existentes</h3>
                        <ul>
                            <li>
                                Sonido de rebote en la pala
                            </li>
                            <li>
                                Sonido de aumento de dificultad
                            </li>
                            <li>
                                Sonido de perdida de vida
                            </li>
                            <li>
                                Toda la música de menús y juego
                            </li>
                        </ul>
                    </article>
                </section>
                <section>
                    <h2>Librerías</h2>
                    <p>
                    <ul>
                        <li>
                            Matter.js - 0.19.0
                        </li>
                        <li>
                            p5sound - 1.7.0
                        </li>
                    </ul>
                    </p>
                </section>
    </main>
