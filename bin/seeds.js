'use strict';

const escapeRooms = [
  {
    name: 'Bank of Thaqar',
    descritption: 'En estos días se encuentra en nuestra ciudad el primer ministro de la República de Thaqar. Ha traído consigo el mayor tesoro de su país, la joya llamada “La Flor de Thaqar”. La ha depositado en una sucursal bancaria de su país, el BANK OF THAQAR y aquí es donde entráis en juego, este es el reto.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 10, minPlayers: 2 },
    direction: 'Ctra. Esplugues, 47, Local 8, 08940 Cornellá de Llobregat, Barcelona',
    location: '41.356467, 2.071869',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', '18:30', '20:00', '21:30', '23:00'] },
    icon: 'http://www.missionleak.com/web/wp-content/uploads/2018/06/cropped-careta_missionleak-1.png',
    image: 'http://www.missionleak.com/web/wp-content/uploads/2018/06/flor-thaqar.jpg'
  },
  {
    name: 'Wolf',
    descritption: 'El Doctor Kurt está trabajando en las instalaciones del CECCA (Centro de Estudio, Conservación y Control de Animales), situado a los pies del Monte Altái. A pesar de las interferencias derivadas del clima y la orografía, ha conseguido hacernos llegar un extraño mensaje solicitándonos ayuda a causa de algunos sucesos extraños que le han ocurrido.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 8, minPlayers: 2 },
    direction: 'local, Carrer de Lepanto, 18, 08940 Cornellà de Llobregat, Barcelona',
    location: '41.351964, 2.087888',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', '18:30', '20:00', '21:30', '23:00'] },
    icon: 'http://www.missionleak.com/web/wp-content/uploads/2018/06/cropped-careta_missionleak-1.png',
    image: 'http://www.missionleak.com/web/wp-content/uploads/2018/10/wolf_escape_room.png'
  },
  {
    name: 'Enigma Puccini / Liceo Room Escape',
    descritption: 'Un escenario único donde podréis disfrutar de una experiencia escape room en EL GRAN TEATRE DEL LICEU. Un número limitado de afortunados podrán disfrutar de esta aventura. Solo los más rápidos y atentos a las redes de Missionleak podrán reservar las únicas plazas.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 8, minPlayers: 4 },
    direction: 'La Rambla, 51-59, 08002 Barcelona',
    location: '41.380204, 2.173294',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', '18:30', '20:00', '21:30', '23:00'] },
    icon: 'http://www.missionleak.com/web/wp-content/uploads/2018/06/cropped-careta_missionleak-1.png',
    image: 'http://www.missionleak.com/web/wp-content/uploads/2018/06/enigma-puccini.jpg'
  }

];

module.exports = escapeRooms;
