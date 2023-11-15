// Engine de Físicas
let engine;

// Mundo
let world;

// Pala Jugador
let pala;

// Pelota
let pelota; 

// Pared inferior
let ground; 

// Pared izquierda
let leftWall; 

// Pared derecha
let rightWall; 

// Puntuación
let score = 0;

// Magnitud de la fuerza de rebote de la pala
let forceMagnitude = 0.02;

// Velocidad de todos los sonidos del juego
let reboteRate = 1.0;
let speedUpRate = 1.0;
let musicaRate = 1.0;

// Aleatoriedad de los rebotes (en grados)
let offrateizq = 0;
let offrateder = 360;

// Vida del jugador
let health = 3;

//
let size = 500;


let izVel = -1;
let derVel = 1;

// Variable para comprobar si se puede aumentar más el espacio de juego
let moreResizable = true;

// Variable para comprobar si se ha de pasar a la música de nivel 2
let level2Music = false;

function setup() {
  createCanvas(size, 500);

  // Cargar todos los sonidos
  rebote = loadSound("./rebote.wav");
  speedUp = loadSound("./SpeedUp.wav");
  death = loadSound("./death.wav");
  musica = loadSound("./musica.wav");
  musica2 = loadSound("./musica2.wav");
  musica3 = loadSound("./musica3.wav");

  // Establecer el volumen
  rebote.setVolume(0.4);
  speedUp.setVolume(0.4);
  death.setVolume(0.4);
  musica.setVolume(0.1);
  musica2.setVolume(0.1);
  musica3.setVolume(0.1);

  // Crear un motor y un mundo para la física con Matter.js
  engine = Matter.Engine.create({
    constraintIterations: 2,
    positionIterations: 6, 
  });
  world = engine.world;

  // Crear la pala y la pelota
  pala = new Pala(125, height - 20, 25);
  pala.createBody();

  pelota = new Pelota(width / 2, height / 2, 27, 0, 5);
  pelota.createBody();

  // Crear las paredes
  ground = Matter.Bodies.rectangle(width / 2, height, width, 10, {
    isStatic: true,
  });
  leftWall = Matter.Bodies.rectangle(0, height / 2 - 10, 10, height + 20, {
    isStatic: true,
  });
  rightWall = Matter.Bodies.rectangle(width, height / 2 - 10, 10, height + 20, {
    isStatic: true,
  });
  topWall = Matter.Bodies.rectangle(width / 2, 0, width, 10, {
    isStatic: true,
  });

  // Agregar las paredes al mundo
  Matter.World.add(world, [ground, leftWall, rightWall, topWall]);

  // Desactivar la gravedad para la pala
  pala.disableGravity();
}

function draw() {
  background(128);

  // Actualizar el motor de física
  Matter.Engine.update(engine);

  // Mostrar la pala y la pelota
  pala.mostrar();
  pelota.mostrar();

  // Verificar colisión con la pala
  let col = Matter.Collision.collides(pelota.body, pala.body);
  if (col) {
    pelota.rebotarEnPala(pala);
  }

  if (Matter.Collision.collides(pelota.body, rightWall)) {
    pelota.colisionDerecha();
  }

  if (Matter.Collision.collides(pelota.body, leftWall)) {
    pelota.colisionIzquierda();
  }

  if (Matter.Collision.collides(pelota.body, topWall)) {
    pelota.colisionArriba();
  }

  // Perdida de vida
  if (pelota.colisionAbajo()) {
    reiniciarJuego();
  }

  // Mover la pala si las teclas están presionadas
  if (keyIsDown(LEFT_ARROW)) {
    pala.mover(izVel);
  } else if (keyIsDown(RIGHT_ARROW)) {
    pala.mover(derVel);
  } else {
    pala.detener();
  }

  // Mostrar la puntuación
  fill(255);
  textSize(24);
  text("Puntuación: " + score, 20, 30);

  // Mostrar vida
  fill(255);
  textSize(24);
  text("Vida: " + health, 20, 60);
}

function reiniciarJuego() {
  if (health - 1 <= 0) {
    death.play();
    window.location.href = "./gameover.html";

    // Codigo para pruebas del game over
    /** 
    // Reiniciar la posición de la pelota
    Matter.Body.setPosition(pelota.body, { x: width / 2, y: height / 4 });

    // Reiniciar la velocidad de la pelota
    Matter.Body.setVelocity(pelota.body, {
      x: random(-5, 5),
      y: random(-5, -1),
    });

    Matter.Body.setPosition(pala.body, { x: width / 2, y: height - 20 });
    pala.x = width / 2;
    pala.y = height - 20;
    reboteRate = 1.0;
    rebote.rate(reboteRate);
    speedUpRate = 1.0;
    speedUp.rate(speedUpRate);
    forceMagnitude = 0.02;
    health = 3;
    score = 0;
    size = 500;
    resizeCanvas(size, 500);
    Matter.Body.setPosition(rightWall, { x: width, y: height / 2 - 10 });
    offrateizq = 0;
    offrateder = 360;
    */
  } else {
    // Reiniciar la posición de la pelota
    Matter.Body.setPosition(pelota.body, { x: width / 2, y: height / 4 });

    // Reiniciar la velocidad de la pelota
    Matter.Body.setVelocity(pelota.body, {
      x: random(-5, 5),
      y: random(-5, -1),
    });

    Matter.Body.setPosition(pala.body, { x: width / 2, y: height - 20 });
    pala.x = width / 2;
    pala.y = height - 20;
    health--;

    death.play();
  }
}

class Pala {
  constructor(ancho, y, alto) {
    this.x = width / 2;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.body = null;
    this.moving = 0; // -1 para izquierda, 1 para derecha, 0 para detener
    let forceMagnitude = 0.02;
  }

  createBody() {
    this.body = Matter.Bodies.rectangle(this.x, this.y, this.ancho, this.alto);
    Matter.World.add(world, this.body);
  }

  mostrar() {
    fill(255);
    rectMode(CENTER);
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rect(0, 0, this.ancho, this.alto);
    pop();
  }

  mover(direction) {
    // Mover la pala directamente cambiando su posición
    this.moving = direction;
    this.x += this.moving * 5; // Ajusta la velocidad según tu necesidad
    this.x = constrain(this.x, this.ancho / 2, width - this.ancho / 2);
    Matter.Body.setPosition(this.body, { x: this.x, y: this.y });
  }

  detener() {
    // Detener la pala
    this.moving = 0;
  }

  disableGravity() {
    Matter.Body.setStatic(this.body, true);
  }
}

class Pelota {
  constructor(x, y, radio, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.speedX = speedX;
    this.speedY = speedY;
    this.body = null;
  }

  createBody() {
    this.body = Matter.Bodies.circle(this.x, this.y, this.radio);
    Matter.World.add(world, this.body);
  }

  mostrar() {
    fill(255);
    let pos = this.body.position;
    ellipse(pos.x, pos.y, this.radio * 2);
  }

  colisionDerecha() {
    rebote.play();
    let pos = this.body.position;
    let posx = pos.x;
    let posy = pos.y;
    let radius = this.radio;
    this.speedX = Math.abs(this.speedX); // Rebotar en el borde izquierdo
    // Aplicar una fuerza opuesta a la dirección actual de la pelota
    let force = {
      x: -0.01 * pelota.speedX,
      y: -0.005 * pelota.speedY,
    };

    // Aplicar la fuerza al cuerpo de la pelota
    Matter.Body.applyForce(pelota.body, pelota.body.position, force);
  }

  colisionIzquierda() {
    rebote.play();
    let pos = this.body.position;
    let posx = pos.x;
    let posy = pos.y;
    let radius = this.radio;
    this.speedX = Math.abs(this.speedX); // Rebotar en el borde izquierdo
    // Aplicar una fuerza opuesta a la dirección actual de la pelota
    let force = {
      x: 0.01 * pelota.speedX,
      y: -0.005 * pelota.speedY,
    };

    // Aplicar la fuerza al cuerpo de la pelota
    Matter.Body.applyForce(pelota.body, pelota.body.position, force);
  }

  colisionArriba() {
    rebote.play();
    let pos = this.body.position;
    let posx = pos.x;
    let posy = pos.y;
    let radius = this.radio;
    this.speedX = Math.abs(this.speedX); // Rebotar en el borde izquierdo
    // Aplicar una fuerza opuesta a la dirección actual de la pelota
    let force = {
      x: 0.00001 * pelota.speedX,
      y: 0.01 * pelota.speedY,
    };

    // Aplicar la fuerza al cuerpo de la pelota
    Matter.Body.applyForce(pelota.body, pelota.body.position, force);
  }

  colisionAbajo() {
    let pos = this.body.position;
    let posx = pos.x;
    let posy = pos.y;
    let radius = this.radio;

    //borde inferior
    if (posy + radius >= height - 5) {
      return true;
    }
    return false;
  }

  rebotarEnPala(pala) {
    // Calcular el ángulo del rebote en función de dónde golpea la pala
    let offset = this.x - pala.x;
    let angleOffset = map(
      offset,
      -pala.ancho / 2,
      pala.ancho / 2,
      -QUARTER_PI,
      QUARTER_PI
    );

    // Agregar un componente aleatorio a la dirección del ángulo de rebote
    let randomAngle = random(offrateizq, offrateder);
    angleOffset += randomAngle;

    // Inicio de la música
    if (score == 0) {
      musica.loop();
    }

    // Cambio de música al llegar a 150 puntos
    if (score == 150) {
      musica.stop();
      musicaRate = 1.0;
      musica2.play();
      musica2.onended(() => this.changeMusic());
    }

    // Sonido de rebote y cambio de velocidad
    if ((score + 1) % 5 == 0 && score != 0) {
      speedUp.play();
    } else if ((score + 1) % 5 != 0) {
      rebote.play();
    }

    // Aumentar la fuerza para un rebote más fuerte, tras 5 puntos obtenidos
    if (score % 5 == 0 && score != 0) {
      forceMagnitude = forceMagnitude + 0.0008;
      reboteRate += 0.05;
      rebote.rate(reboteRate);
      speedUpRate += 0.05;
      speedUp.rate(speedUpRate);
      offrateizq -= 100;
      offrateder -= 100;
      izVel -= 0.1;
      derVel += 0.1;
    }

    //Aumento de dificultad tras 50 puntos conseguidos
    if ((score + 1) % 50 == 0 && score != 0 && size + 100 <= windowWidth) {
      musicaRate += 0.1;
      if (!level2Music) {
        musica.rate(musicaRate);
      } else if (level2Music) {
        musica3.rate(musicaRate);
      }
      size += 100;
      resizeCanvas(size, 500);
      Matter.Body.setPosition(rightWall, { x: width, y: height / 2 - 10 });
      topWall = Matter.Bodies.rectangle(width / 2, 0, width, 10, {
        isStatic: true,
      });
    } else if (
      (score + 1) % 50 == 0 &&
      score != 0 &&
      size + 100 > windowWidth &&
      moreResizable
    ) {
      resizeCanvas(windowWidth, 500);
      Matter.Body.setPosition(rightWall, { x: width, y: height / 2 - 10 });
      topWall = Matter.Bodies.rectangle(width / 2, 0, width, 10, {
        isStatic: true,
      });
      moreResizable = false;
    }

    if ((score + 1) % 100 == 0) {
      offrateizq -= 100;
      offrateder -= 100;
      izVel -= 0.1;
      derVel += 0.1;
    }

    // Aplicar una fuerza opuesta a la dirección actual de la pelota
    let force = {
      x: forceMagnitude * this.speedX * Math.sin(angleOffset),
      y: -forceMagnitude * this.speedY,
    };

    // Aplicar la fuerza al cuerpo de la pelota
    Matter.Body.applyForce(this.body, this.body.position, force);

    // Introducir una pequeña variación aleatoria en la velocidad en X
    this.speedX += random(-1, 1);

    // Ajustar la posición de la pelota para evitar que se atasque en la pala
    Matter.Body.setPosition(this.body, {
      x: this.body.position.x,
      y: pala.body.position.y - pala.alto / 2 - this.radio - 1,
    });
    score++;
  }

  changeMusic() {
    musica3.loop();
    level2Music = true;
  }
}
