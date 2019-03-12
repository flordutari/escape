'use strict';

const mongoose = require('mongoose');
const EscapeRoom = require('../models/EscapeRoom');

const escapeRooms = [
  {
    name: 'Bank of Thaqar',
    description: 'En estos días se encuentra en nuestra ciudad el primer ministro de la República de Thaqar. Ha traído consigo el mayor tesoro de su país, la joya llamada “La Flor de Thaqar”. La ha depositado en una sucursal bancaria de su país, el BANK OF THAQAR y aquí es donde entráis en juego, este es el reto.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 6, minPlayers: 2 },
    direction: 'Ctra. Esplugues, 47, Local 8, 08940 Cornellá de Llobregat, Barcelona',
    location: '41.356467, 2.071869',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'http://www.missionleak.com/web/wp-content/uploads/2018/06/cropped-careta_missionleak-1.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338112/project_2_images/dollars.png'
  },
  {
    name: 'Wolf',
    description: 'El Doctor Kurt está trabajando en las instalaciones del CECCA (Centro de Estudio, Conservación y Control de Animales), situado a los pies del Monte Altái. A pesar de las interferencias derivadas del clima y la orografía, ha conseguido hacernos llegar un extraño mensaje solicitándonos ayuda a causa de algunos sucesos extraños que le han ocurrido.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 10, minPlayers: 2 },
    direction: 'local, Carrer de Lepanto, 18, 08940 Cornellà de Llobregat, Barcelona',
    location: '41.351964, 2.087888',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'http://www.missionleak.com/web/wp-content/uploads/2018/06/cropped-careta_missionleak-1.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338113/project_2_images/wolf.png'
  },
  {
    name: 'Enigma Puccini',
    description: 'Un escenario único donde podréis disfrutar de una experiencia escape room en EL GRAN TEATRE DEL LICEU. Un número limitado de afortunados podrán disfrutar de esta aventura. Solo los más rápidos y atentos a las redes de Missionleak podrán reservar las únicas plazas.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 4, minPlayers: 4 },
    direction: 'La Rambla, 51-59, 08002 Barcelona',
    location: '41.380204, 2.173294',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'http://www.missionleak.com/web/wp-content/uploads/2018/06/cropped-careta_missionleak-1.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338112/project_2_images/enigma.png'
  },
  {
    name: '60\'ESCAPE',
    description: 'Una organización secreta, conocida con las siglas WD, ha urdido una estrategia maléfica para minar las tradiciones culturales e intelectuales de nuestro país, infiltrándose de forma insidiosa y decidida. El lavado de cerebros ya ha comenzado.Pero no todo está perdido. Uno de nuestros agentes también ha logrado infiltrarse en la organización de la WD y está trabajando para desmantelarla.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 8, minPlayers: 4 },
    direction: 'Carrer de Rocafort, 15 08015 Barcelona',
    location: '41.375837, 2.157793',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'https://60escape.es/wp-content/uploads/2017/01/escape-white-logo.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338112/project_2_images/luzsombra.png'
  },
  {
    name: 'La Mina',
    description: 'Durante más de cien años, la Mina de St. Louis fue utilizada como fuente de recursos minerales, hasta que una inesperada explosión hizo que todos sus trabajadores quedaran atrapados en su interior. Desde entonces muchos son los que han especulado con todo tipo de hipótesis sobre el suceso…La empresa Dunklerde ha logrado reabrir la Mina y ha manifestado su compromiso de hacerse cargo de la recuperación de todas las víctimas que quedaron atrapadas en el lugar.Sin embargo sus fines reales no son del todo claros, ya que según voces expertas, la Mina ya no cuenta con tantos recursos minerales como antaño. Esta situación ha avivado de nuevo los antiguos rumores de la existencia de una extraña y valiosa fuente de minerales en la Mina, motivo por el cual algunos afirman que el objetivo real de esta empresa es encontrarlos.¿Serán ciertos los rumores?¿Qué misterios esconde la Mina de St. Louis?',
    dificulty: 4,
    duration: 90,
    capacity: { maxPlayers: 7, minPlayers: 2 },
    direction: 'Calle Bacardi nº 32, 08902 Hospitalet de Llobregat, Barcelona',
    location: '41.362193, 2.129101',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'https://unrealroomescape.es/wp-content/uploads/2018/06/cropped-unreal-room-escape-barcelona.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338112/project_2_images/lamina.png'
  },
  {
    name: 'Misión S.W.A.T',
    description: 'John era un soldado SWAT que lideraba un equipo contra una célula terrorista. En una de las misiones se producen unas explosiones y todos logran salvarse menos John. Sus restos jamás fueron hallados y aunque algunos afirman que el cuerpo fue volatilizado en la explosión, otros creen que fue capturado por el enemigo.10 años después, los SWAT son alertados de que el comando terrorista se ha rearmado y están preparando un nuevo ataque.¿Estáis preparados para reducir y eliminar de una vez por todas al comando terrorista que acabó con la vida de vuestro compañero John y honrar así su muerte? Y más aún… ¿seréis capaces de conseguirlo sin John en vuestras filas?',
    dificulty: 4,
    duration: 80,
    capacity: { maxPlayers: 7, minPlayers: 2 },
    direction: 'Calle Travessera, 10, 08940, Cornellá de Llobregat, Barcelona',
    location: '41.365037, 2.077612',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'https://openmindroomescape.es/wp-content/uploads/2017/01/room-escape-cornella-barcelona.jpg',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338113/project_2_images/swat.png'
  },
  {
    name: 'El último Safardí',
    description: 'A finales del siglo XV Giovanni Pico, humanista y pensador italiano viajaba por el mundo siguiendo la pista de su familia, terminando en Hospitalet en plena época del exilio Sefardí ...',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 6, minPlayers: 2 },
    direction: 'Carrer de Castelao, 79, 08902 Hospitalet de Llobregat, Barcelona',
    location: '41.363295, 2.124950',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'http://hospitalet.salaenigma.com/wp-content/uploads/2015/06/top-web-35x35.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338118/project_2_images/mapa.png'
  },
  {
    name: 'DIA D',
    description: 'Francia, junio de 1944. Las aguas del canal nunca han visto una fuerza tan poderosa... los aliados lanzan una gran ofensiva en Normandía... El alcance estratégico y humano de la operación es extraordinario. Más de 160.000 hombres van a ser lanzados en paracaídas y desembarcados en el Canal de la Mancha...Necesitamos más reclutas para que esta operación sea la más grande jamás contada y acabar liberando París de la invasión nazi...',
    dificulty: 4,
    duration: 70,
    capacity: { maxPlayers: 5, minPlayers: 2 },
    direction: 'Carrer Bruc, 41, 08901 Hospitalet de Llobregat, Barcelona',
    location: '41.362636, 2.099698',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'https://diadroomescape.com/assets/imgs/Logotipo_dia_d.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338111/project_2_images/diad.png'
  },
  {
    name: 'Comecocos',
    description: 'El escape room es un juego que consiste en escapar de una habitación en 60 minutos resolviendo enigmas y rompecabezas. Para conseguirlo necesitaréis: trabajar en equipo, un poco de imaginación y grandes dosis de humor.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 6, minPlayers: 2 },
    direction: 'Carrer de les Esquadres, 21, 08901 Hospitalet de Llobregat, Barcelona',
    location: '41.362724, 2.106513',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'https://www.comecocosescaperoom.com/wp-content/uploads/2017/08/logo.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338111/project_2_images/comecocos.png'
  },
  {
    name: 'The Mansion',
    description: 'Esta noche William Harrison II organiza una gran fiesta en el lugar secreto de reunión de los miembro de la Asociación Secreta de Exploradores Mundiales para dar a conocer el descubrimiento de su última reliquia, el misterioso ídolo perdido Utundu-Utundu.',
    dificulty: 4,
    duration: 60,
    capacity: { maxPlayers: 6, minPlayers: 2 },
    direction: 'Carrer de l’Església, 08901 Hospitalet de Llobregat, Barcelona',
    location: '41.360757, 2.099174',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'https://www.l-hescaperoom.com/wp-content/uploads/2017/07/logo.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338113/project_2_images/secret.png'
  },
  {
    name: 'Kessler Galimary',
    description: 'Ven a la nueva “Room Escape” de Sants y ayúdanos a resolver el gran misterio que se esconde tras las puertas de este enigmático obrador…Si te gustan los acertijos y resolver enigmas, disfruta de ésta aventura junto a tus amigos, tu familia o forma equipo con tus compañeros de trabajo, donde tu misión será descifrar las combinaciones escondidas que abren las puertas hacia un gran secreto familiar…',
    dificulty: 4,
    duration: 75,
    capacity: { maxPlayers: 6, minPlayers: 2 },
    direction: 'Carrer de Cros, 4, 08014 Barcelona',
    location: '41.375499, 2.137861',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'http://room-escape.cat/wp-content/uploads/2016/11/logo-room-escape-horizontal-4.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338112/project_2_images/galimany.png'
  },
  {
    name: 'Prision',
    description: 'El terrible Régimen está vigilando aún más de cerca. El Líder nunca ha sido tan fuerte y cada día desaparece más gente. ¿Por qué se han ido? ¿Qué han hecho? Y lo más importante, ¿puedes hacer algo para parar todo esto? ¿Esperarás a ser el siguiente? ¡Es hora de ponerse en acción!',
    dificulty: 5,
    duration: 60,
    capacity: { maxPlayers: 6, minPlayers: 4 },
    direction: 'Carrer de Rocafort, 12, 08015 Barcelona',
    location: '41.376292, 2.158012',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'https://d2clrhemorntkp.cloudfront.net/assets/images/logo.svg',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338112/project_2_images/carcel.png'
  },
  {
    name: 'Training Room',
    description: 'Training Room (TR) es la zona de entrenamiento en Barcelona para formar parte de la mayor red secreta de espionaje.En esta zona de escape, seguiréis las pistas para resolver enigmas y superaréis pruebas impactantes para completar la misión y convertiros en espías.No somos un room escape normal. Con esta experiencia pondréis a prueba todos los sentidos y descubriréis habilidades que no conocíais.',
    dificulty: 4,
    duration: 90,
    capacity: { maxPlayers: 6, minPlayers: 2 },
    direction: 'Local 2, Passatge de Serra i Arola, 15, 08028 Barcelona',
    location: '41.376841, 2.135292',
    schedule: { days: 'de Lunes a Domingo', showtime: ['17:00', ' 18:30', ' 20:00', ' 21:30', ' 23:00'] },
    icon: 'http://trainingroombcn.com/images/light-logo2.png',
    image: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1552338113/project_2_images/training.png'
  }
];

mongoose.connect('mongodb://localhost/escape', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

mongoose.connect('mongodb://localhost/escape', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

EscapeRoom.insertMany(escapeRooms)
  .then(result => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));

module.exports = escapeRooms;
