import React, { useMemo, useState } from "react";
import {
  ArrowUpRight, AudioLines, CalendarDays, ChevronDown, Clock3,
  ExternalLink, MapPin, Pause, Play, Route, Sparkles, Utensils,
  Train, Coffee, Beer, History, Crown, Shield, CircleDollarSign, Menu, X
} from "lucide-react";

const GOOGLE_MAPS_LIST_URL = "https://maps.app.goo.gl/ReeJX3avhQ99TfGf6";

const IMG = {
  coat: "https://commons.wikimedia.org/wiki/Special:FilePath/Den_Haag_wapen.svg",
  map1570: "https://commons.wikimedia.org/wiki/Special:FilePath/Plattegrond%20van%20Den%20Haag%2C%201570%20Aenwysinge%20van%20s%27%20Hage%2C%20als%20die%20was%20anno%201570%20Haga-Comitis%20in%20Hollandia%201570%20%28titel%20op%20object%29%2C%20RP-P-AO-12-4.jpg",
  binnenhofNow: "https://commons.wikimedia.org/wiki/Special:FilePath/Binnenhof%20Den%20Haag.jpg",
  binnenhofOld: "https://commons.wikimedia.org/wiki/Special:FilePath/Binnenhof%2C%20The%20Hague%201868.jpg",
  stijkel: "https://stichtingnationaleherdenkingsgravenhage.nl/wp-content/uploads/2018/11/Stijkelgroep1.jpg",
  palace: "https://commons.wikimedia.org/wiki/Special:FilePath/Paleis%20Noordeinde.jpg",
  supreme: "https://www.rijksvastgoedbedrijf.nl/site/binaries/content/gallery/site-content/content-afbeeldingen/vastgoed/den-haag-hoge-raad/den-haag-korte-voorhout-8-hoge-raad-foto-bas-kijzers-3-februari-2016-a.jpg"
};

const stops = [
  {
    id: "nieuwe-kerk", time: "11:35", title: "Nieuwe Kerk", area: "Spui",
    duration: "20 min", type: "Iglesia histórica", color: "sage", map: "Nieuwe Kerk, Spui 175, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/17998%20Nieuwe%20Kerk.jpg",
    facts: [
      "La Nieuwe Kerk se construyó entre 1649 y 1656 porque la Grote Kerk ya no podía absorber el crecimiento de la población. Se diseñó como una iglesia protestante nueva, no como una ampliación de la iglesia medieval.",
      "Su planta central y sus espacios relativamente luminosos reflejan una arquitectura religiosa propia de la República neerlandesa del siglo XVII.",
      "Hoy ya no funciona principalmente como parroquia: el edificio es un monumento y se utiliza sobre todo como sala de conciertos y espacio para actos culturales."
    ],
    guide: "Empieza aquí la ruta histórica. Fíjate en que la Nieuwe Kerk pertenece a una Haya que ya estaba creciendo alrededor del viejo núcleo del Binnenhof: es la respuesta del siglo XVII a una ciudad cada vez más poblada.",
    curious: "Baruch Spinoza vivió en La Haya y fue enterrado en un sepulcro alquilado en el entorno de la Nieuwe Kerk.",
    visit: "Exterior gratuito. El acceso interior depende de conciertos, eventos y horarios del recinto.",
    source: "Nieuwe Kerk Den Haag", sourceUrl: "https://www.nieuwekerkdenhaag.nl/gebouw"
  },
  {
    id: "grote-kerk", time: "12:00", title: "Grote of Sint-Jacobskerk", area: "Torenstraat",
    duration: "25 min", type: "Iglesia histórica", color: "purple", map: "Grote Kerk, Rond de Grote Kerk 12, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Grote%20Kerk%20Den%20Haag.jpg",
    facts: [
      "La Grote Kerk nació como iglesia parroquial medieval a medida que crecía el asentamiento alrededor del hof de los condes de Holanda. El edificio actual es el resultado de varias fases de ampliación y reconstrucción.",
      "La gran torre hexagonal se levantó alrededor de 1420 y alcanza unos 92,5 metros, convirtiéndose durante siglos en uno de los grandes puntos de referencia de la ciudad.",
      "La iglesia mantiene una relación estrecha con la Casa de Orange: varios miembros de la familia fueron bautizados aquí.",
      "Actualmente combina su función religiosa con conciertos, exposiciones y otros acontecimientos culturales."
    ],
    guide: "Mira la torre antes de entrar. Su forma hexagonal cambia mucho según el ángulo y ayuda a entender por qué la Grote Kerk aparece constantemente en los mapas históricos de La Haya.",
    curious: "El campanario conserva campanas históricas y algunas siguen formando parte del paisaje sonoro de la ciudad.",
    visit: "La visita interior depende del calendario del templo y de los eventos. La entrada a la iglesia puede ser gratuita en determinados horarios.",
    source: "Grote Kerk Den Haag", sourceUrl: "https://grote-kerk.nl/bezoek-de-kerk/"
  },
  {
    id: "haagse-harry", time: "12:35", title: "Standbeeld Haagse Harry", area: "Grote Markt",
    duration: "10 min", type: "Arte urbano", color: "ochre", map: "Standbeeld Haagse Harry, Grote Markt, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Den%20Haag%20-%20Standbeeld%20Haagse%20Harry%20%2839790910722%29.jpg",
    facts: [
      "Haagse Harry es un personaje de cómic creado por el dibujante Marnix Rueb. Habla en un fuerte dialecto de La Haya y se convirtió en un icono popular de la identidad local.",
      "La estatua de la Grote Markt transforma un personaje de viñeta en un monumento urbano reconocible y deliberadamente poco solemne.",
      "El personaje apareció a comienzos de los años noventa y sus textos fonéticos ayudan a conservar y caricaturizar el dialecto haags."
    ],
    guide: "Esta es la parada que rompe el tono monumental. Después de iglesias y edificios de gobierno, La Haya se presenta a sí misma con humor, dialecto y cultura popular.",
    curious: "El personaje es tan reconocible que el Ayuntamiento y la ciudad lo utilizan como uno de los símbolos culturales más característicos de La Haya.",
    visit: "Parada exterior gratuita.",
    source: "The Hague Info Store", sourceUrl: "https://shop.denhaag.com/"
  },
  {
    id: "butter-bell", time: "12:50", title: "Butter Bell · Boterklokje", area: "Prinsegracht",
    duration: "10 min", type: "Curiosidad histórica", color: "cream", map: "Boterklokje, Prinsegracht 1, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Boterwaag%20Den%20Haag.jpg",
    facts: [
      "El Boterklokje está en la fachada de la antigua Boterwaag, donde se pesaban y comerciaban mantequilla y queso. El edificio de mercado se construyó en el siglo XVII y fue ampliado hasta convertirse en un elemento destacado de la Grote Markt.",
      "La campana servía para señalar el inicio y el final de la jornada comercial. El cierre era a las 13:00.",
      "La campana original desapareció y el marco quedó en la fachada. En 2013 se instaló una nueva campana, que vuelve a sonar los días laborables a las 13:00 durante aproximadamente un minuto."
    ],
    guide: "Es una parada diminuta, pero cuenta algo muy grande: cómo las campanas regulaban la vida cotidiana antes de que existieran relojes públicos y horarios digitales.",
    curious: "Si haces la ruta un día laborable y llegas justo antes de las 13:00, puedes escucharla en funcionamiento.",
    visit: "Exterior gratuito.",
    source: "Stichting Carillon Den Haag", sourceUrl: "https://www.stichtingcarillondenhaag.nl/activiteiten/"
  },
  {
    id: "chinatown-gate", time: "13:05", title: "Chinatown Gate", area: "Wagenstraat",
    duration: "10 min", type: "Barrio histórico", color: "rose", map: "Chinatown Gate, Wagenstraat 35-37, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Den%20Haag%20-%20Wagenstraat%20-%20View%20on%20Chinese%20Gate.jpg",
    facts: [
      "La puerta china marca una de las entradas al Chinatown de La Haya, un pequeño barrio asiático concentrado alrededor de Wagenstraat y sus calles cercanas.",
      "La decoración, las linternas rojas y los rótulos bilingües hacen visible una historia de migración, comercio y vida comunitaria dentro del centro histórico.",
      "Las puertas fueron realizadas con materiales procedentes de China y por artesanos chinos; sus numerosos elementos convierten la estructura en un objeto decorativo además de una puerta simbólica."
    ],
    guide: "No la trates como una atracción aislada: entra por la puerta y recorre las calles que siguen. La gracia está en el cambio de ambiente en apenas unos metros.",
    curious: "Chinatown es especialmente animado durante celebraciones como el Año Nuevo chino y el Festival de la Luna.",
    visit: "Exterior gratuito.",
    source: "Den Haag / Chinatown", sourceUrl: "https://www.denhaag.com/"
  },
  {
    id: "chinese-street", time: "13:20", title: "Chinese Street · Chinatown", area: "Wagenstraat",
    duration: "15 min", type: "Barrio", color: "rose", map: "Wagenstraat, Chinatown, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Wagenstraat%20Den%20Haag%202019.jpg",
    facts: [
      "Wagenstraat y las calles próximas forman el corazón del Chinatown de La Haya. Es una zona pequeña pero muy reconocible por las linternas, los comercios asiáticos y la señalización en neerlandés y chino.",
      "El barrio se desarrolló sobre una parte muy céntrica de la ciudad, de modo que la historia de inmigración y comercio quedó integrada en el tejido urbano histórico.",
      "Es también una de las zonas gastronómicas más variadas del centro, con restaurantes y tiendas especializadas."
    ],
    guide: "Aquí merece la pena caminar sin prisa unos minutos y mirar escaparates y rótulos. La ruta deja por un momento la monumentalidad política para enseñar otra capa de la ciudad.",
    curious: "Las celebraciones del Año Nuevo chino cambian por completo el ambiente de estas calles, con decoración, actividades y mucha más gente.",
    visit: "Paseo exterior gratuito.",
    source: "Chinatown Den Haag", sourceUrl: "https://www.denhaag.com/"
  },
  {
    id: "cat-street-art", time: "13:45", title: "Cat Street Art · Kattensteeg", area: "Achterom",
    duration: "10 min", type: "Arte urbano", color: "ink", map: "Cat Street Art, Achterom 39E, Den Haag, Netherlands",
    image: "https://denhaag.com/sites/default/files/styles/keyvisual_1220x640/public/2021-03/Kattensteeg3.jpg?h=1f651cd9&itok=n0pZixOU",
    facts: [
      "La Kattensteeg es un pequeño callejón del centro convertido en una galería de arte urbano dedicada a los gatos.",
      "La intervención fue impulsada junto con The Hague Street Art para transformar un espacio de paso en un lugar reconocible y divertido.",
      "Los murales y detalles funcionan como una pequeña colección al aire libre: no necesitas entrada ni reservar para recorrerla."
    ],
    guide: "Es una parada de cinco o diez minutos, perfecta para mirar hacia arriba, las paredes y los pequeños detalles. Está escondida lo suficiente como para sentirse como un descubrimiento.",
    curious: "La calle se hizo especialmente conocida como 'Kattensteeg' a partir de la renovación artística de la zona desde 2020.",
    visit: "Exterior gratuito.",
    source: "The Hague Street Art", sourceUrl: "https://www.thehaguestreetart.nl/"
  },
  {
    id: "former-justice", time: "14:05", title: "Antiguo Ministerio de Justicia", area: "Plein",
    duration: "15 min", type: "Edificio histórico", color: "blue", map: "Former Ministry of Justice, Plein 2B, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Den%20Haag%20-%20Het%20oude%20Ministerie%20van%20Justitie%20%2838938487975%29.jpg",
    facts: [
      "El edificio del Plein se construyó a finales del siglo XIX como Ministerio de Justicia, dentro de la expansión monumental de la Haya administrativa.",
      "Su arquitectura neorrenacentista expresa deliberadamente la importancia del Estado y de sus instituciones.",
      "Posteriormente pasó a formar parte del complejo de la Tweede Kamer. En su interior destaca la Handelingenkamer, antigua biblioteca parlamentaria, cuando el acceso está permitido."
    ],
    guide: "Míralo desde Plein y compáralo con el Binnenhof que está justo detrás: aquí se ve cómo el Estado neerlandés fue ampliando sus edificios administrativos alrededor del núcleo medieval.",
    curious: "El edificio no nació como museo ni como sede parlamentaria: su primera función fue específicamente ministerial.",
    visit: "Exterior gratuito. El acceso interior depende de actividades y visitas organizadas.",
    source: "Monumentenzorg / The Hague", sourceUrl: "https://www.denhaag.nl/"
  },
  {
    id: "binnenhof", time: "14:25", title: "Binnenhof", area: "Centro político histórico",
    duration: "30 min", type: "Complejo histórico", color: "sage", map: "Binnenhof, Den Haag, Netherlands",
    image: IMG.binnenhofNow,
    facts: [
      "El origen del Binnenhof está en el hof que el conde Floris IV adquirió alrededor de 1230. Sus sucesores lo ampliaron hasta convertirlo en residencia de los condes de Holanda.",
      "La Ridderzaal, terminada a finales del siglo XIII, fue concebida como gran sala ceremonial de la corte y no como iglesia. Hoy sigue siendo uno de los grandes símbolos del Estado neerlandés.",
      "Durante siglos el complejo fue absorbiendo funciones políticas hasta convertirse en el corazón institucional de los Países Bajos.",
      "Actualmente está sometido a una renovación de gran escala y el acceso ordinario al complejo está restringido."
    ],
    guide: "Párate en el Buitenhof y después busca la perspectiva hacia el Hofvijver. El Binnenhof no es un palacio aislado: es un conjunto que fue creciendo alrededor del antiguo hof de los condes.",
    curious: "El Binnenhof está en el centro político de una ciudad que durante mucho tiempo no tuvo los derechos urbanos típicos de otras ciudades neerlandesas.",
    visit: "La ruta lo plantea como visita exterior. Durante la renovación existe un punto de observación temporal del Binnenhof; comprueba su apertura el día de la visita.",
    source: "The Hague / Binnenhof", sourceUrl: "https://www.denhaag.nl/"
  },
  {
    id: "vijverhof", time: "15:05", title: "Vijverhof", area: "Buitenhof / Hofvijver",
    duration: "15 min", type: "Edificio histórico", color: "water", map: "Vijverhof, Buitenhof 37, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Den%20Haag%20-%20Buitenhof%2037.JPG",
    facts: [
      "Vijverhof, en Buitenhof 37, es un edificio protegido como monumento nacional. Su historia refleja la transformación de La Haya desde residencia de élites hasta capital administrativa.",
      "El conjunto ha tenido sucesivos usos, vinculados a residencia, almacenamiento de colecciones, educación y administración pública.",
      "Su posición junto al Binnenhof y el Hofvijver lo convierte en una pieza especialmente buena para entender cómo distintas épocas reutilizaron el mismo centro de poder."
    ],
    guide: "No necesitas entrar para apreciarlo. Mira la fachada como una capa intermedia entre el paisaje medieval del Binnenhof y la ciudad administrativa posterior.",
    curious: "La documentación histórica relaciona el complejo con el antiguo Valkhuis, una huella poco visible hoy de la evolución del área del Buitenhof.",
    visit: "Exterior gratuito.",
    source: "Monumentenzorg Den Haag", sourceUrl: "https://www.monumentenzorgdenhaag.nl/"
  },
  {
    id: "mauritshuis", time: "15:25", title: "Mauritshuis", area: "Plein / Hofvijver",
    duration: "1 h 15 min", type: "Museo", color: "ochre", map: "Mauritshuis, Plein 29, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mauritshuis%20Den%20Haag.jpg",
    facts: [
      "El edificio se construyó entre 1633 y 1644 como residencia urbana de Johan Maurits de Nassau-Siegen. No nació como museo: esa función llegó en 1822, cuando pasó a albergar la colección real de pintura.",
      "Hoy es uno de los museos de pintura neerlandesa y flamenca más importantes del país y conserva obras de Vermeer, Rembrandt, Fabritius y Hals.",
      "Su escala relativamente pequeña permite visitar una colección de primer nivel sin recorrer un edificio gigantesco."
    ],
    guide: "Entra pensando en una casa aristocrática del siglo XVII que acabó convertida en museo. Las proporciones de las salas son parte de la historia de la colección.",
    curious: "La joven de la perla de Vermeer es su obra más famosa, pero el museo también conserva La lección de anatomía del Dr. Nicolaes Tulp de Rembrandt.",
    visit: "Adultos €21. Combo Mauritshuis + Galería Príncipe Guillermo V: €24. Comprueba el calendario oficial antes de ir.",
    price: "€21 adulto · €24 combo",
    source: "Mauritshuis", sourceUrl: "https://www.mauritshuis.nl/en/visit"
  },
  {
    id: "thorbecke", time: "16:55", title: "Monumento a Thorbecke", area: "Lange Voorhout",
    duration: "10 min", type: "Monumento", color: "silver", map: "Thorbecke Monument, Lange Voorhout, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Den%20Haag%20-%20Lange%20Voorhout%20-%20Thorbecke%20Monument%20by%20Thom%20Puckey%202017.jpg",
    facts: [
      "Johan Rudolph Thorbecke fue el político asociado a la reforma constitucional de 1848, una de las bases de la democracia parlamentaria neerlandesa moderna.",
      "El monumento contemporáneo está situado en el Lange Voorhout, en pleno corazón político de La Haya.",
      "Su orientación hacia la zona del Binnenhof y el Torentje forma parte de la lectura simbólica de la obra: el político parece mirar hacia el centro del poder parlamentario."
    ],
    guide: "Después del Mauritshuis, camina hacia Lange Voorhout. El monumento funciona mejor si recuerdas que acabas de estar frente a edificios donde se construyó y se ejerció ese sistema político.",
    curious: "Es una obra de arte público contemporánea, no una estatua tradicionalista: utiliza materiales y formas abstractas para hablar de Thorbecke y de su legado.",
    visit: "Exterior gratuito.",
    source: "The Hague / Monumentenzorg", sourceUrl: "https://www.denhaag.nl/"
  },
  {
    id: "escher", time: "17:15", title: "Escher in Het Paleis", area: "Lange Voorhout",
    duration: "1 h", type: "Museo / palacio", color: "ink", map: "Escher in Het Paleis, Lange Voorhout 74, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Escher%20in%20het%20Paleis%2C%20The%20Hague%20%282015-08-13%29.jpg",
    facts: [
      "El edificio nació como palacio urbano y la reina Emma lo compró en 1896 como residencia real. Más tarde dejó de funcionar como residencia y se transformó en museo.",
      "Hoy sus salas presentan la obra gráfica de M.C. Escher y mantienen buena parte de la decoración palaciega, de modo que se visitan dos historias a la vez: la de la monarquía y la de la ilusión óptica.",
      "Las obras exploran perspectivas imposibles, reflejos, metamorfosis, teselaciones y relaciones entre arquitectura y matemáticas."
    ],
    guide: "No te centres únicamente en las obras. Mira las lámparas, techos y escaleras del antiguo palacio: Escher funciona especialmente bien aquí porque el edificio también juega con nuestra percepción del espacio.",
    curious: "El museo conserva más de un centenar de obras de Escher y utiliza también recursos interactivos para explicar cómo funcionan sus ilusiones.",
    visit: "Martes-domingo 11:00–17:00. Entrada adulto €14,50; comprueba precios y horarios oficiales antes de la visita.",
    price: "€14,50 adulto",
    source: "Escher in Het Paleis", sourceUrl: "https://escherinhetpaleis.nl/es/visitar/entradas"
  },
  {
    id: "paleistuin", time: "18:25", title: "Paleistuin · Jardines del Palacio", area: "Prinsessewal",
    duration: "20 min", type: "Jardín histórico", color: "water", map: "Paleistuin, Prinsessewal, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Royal%20Palace%20Garden%2C%20The%20Hague%20%282015%29%2001.jpg",
    facts: [
      "La Paleistuin es el jardín público situado detrás del Palacio Noordeinde, el palacio de trabajo del rey. Sus orígenes se remontan al entorno palaciego de comienzos del siglo XVII.",
      "El jardín está relacionado con el conjunto formado por Noordeinde, las Caballerizas Reales y los Archivos Reales.",
      "Hoy es un parque urbano de acceso público: un espacio cotidiano que conserva la relación física con el mundo de la monarquía."
    ],
    guide: "Es un buen final para la ruta porque cambia completamente el ritmo. Después de política, arte y monumentos, el jardín devuelve la escala humana y permite descansar.",
    curious: "La Paleistuin no es un jardín botánico monumental: su interés está precisamente en ser un pequeño parque público escondido detrás de un palacio real.",
    visit: "Entrada gratuita. El horario de apertura puede variar según la época del año.",
    source: "Den Haag / Paleistuin", sourceUrl: "https://www.denhaag.nl/"
  },
  {
    id: "juliana", time: "18:55", title: "Monumento a la Reina Juliana", area: "Koekamp / Centraal Station",
    duration: "10 min", type: "Monumento", color: "rose", map: "Koningin Julianamonument, Bezuidenhoutseweg, Den Haag, Netherlands",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Beeldengroep%20ter%20herinnering%20van%20Koningin%20Juliana.jpg",
    facts: [
      "El monumento recuerda a la reina Juliana y se encuentra en la zona de Koekamp, junto a Den Haag Centraal.",
      "La obra fue creada por la artista Ingrid Mol y se presentó en 2024, convirtiéndose en una incorporación reciente al paisaje monumental de La Haya.",
      "Su posición junto a una gran entrada de transporte público conecta la memoria de la monarquía con la ciudad contemporánea."
    ],
    guide: "He dejado esta parada para el final porque permite terminar la caminata cerca de la estación. Es una forma sencilla de cerrar el recorrido conectando la historia de la Casa de Orange con la Haya actual.",
    curious: "El monumento fue inaugurado en 2024 por la princesa Beatriz, hija de Juliana.",
    visit: "Parada exterior gratuita.",
    source: "Den Haag / Koningin Julianamonument", sourceUrl: "https://www.denhaag.nl/"
  }
];

const food = [
  {rank:1, name:"El Mamma BBQ", rating:"4,8", price:"10–20 € si eliges hamburguesa o plato sencillo", why:"BBQ y hamburguesas; muy céntrico para una comida contundente.", address:"Grote Marktstraat 15", maps:"El Mamma BBQ, Grote Marktstraat 15, Den Haag"},
  {rank:2, name:"Baladi Manouche", rating:"4,7", price:"8–12 € por plato; muy fácil quedarse por debajo de 20 €", why:"Manakish y street food libanés auténtico; ideal para comer rápido.", address:"Torenstraat 95", maps:"Baladi Manouche, Torenstraat 95, Den Haag"},
  {rank:3, name:"Day Dream Deli", rating:"4,7", price:"aprox. 10–15 €", why:"Hamburguesas y comfort food halal; opción informal cerca de Molenstraat.", address:"Molenstraat 65A", maps:"Day Dream Deli, Molenstraat 65A, Den Haag"},
];

const beer = [
  {name:"Hoppzak", rating:"4,7", address:"Papestraat 26A", why:"Especializado en cerveza; la carta cambia continuamente y se consulta en Untappd. Ideal para probar estilos poco habituales.", maps:"Hoppzak, Papestraat 26A, Den Haag"},
  {name:"Kompaan Binnenhaven", rating:"4,6", address:"Torenstraat 49", why:"Taproom de una de las cerveceras artesanales de La Haya, justo en el centro.", maps:"Kompaan Binnenhaven, Torenstraat 49, Den Haag"},
  {name:"Bierspeciaal Café De Paas", rating:"4,5", address:"Dunne Bierkade 16-A", why:"Café especializado en cerveza junto al canal; una opción con ambiente más local y tradicional.", maps:"Bierspeciaal Café De Paas, Dunne Bierkade 16-A, Den Haag"}
];

const coffee = [
  {name:"DuckRabbit Coffee Brewers", rating:"4,9", address:"Molenstraat 63", why:"Café de especialidad con muy buena valoración; encaja especialmente bien con la ruta del centro.", maps:"DuckRabbit Coffee Brewers, Molenstraat 63, Den Haag"},
  {name:"Ief&Ido Coffee roasting shop/bar", rating:"4,9", address:"Prinsestraat 114", why:"Tostador y coffee bar; buena opción si quieres hablar de café y probar diferentes perfiles.", maps:"Ief&Ido Coffee roasting shop/bar, Prinsestraat 114, Den Haag"},
  {name:"Kaafi", rating:"4,6", address:"Prinsestraat 25", why:"Specialty coffee + brunch; flat white alrededor de 3,90 € y platos de brunch de 14–16 € según el menú consultado.", maps:"Kaafi, Prinsestraat 25, Den Haag"}
];

function speak(text, lang="es-ES") {
  if (!("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang=lang; u.rate=.9; u.pitch=1.02;
  const voices = window.speechSynthesis.getVoices();
  const spanish = voices.filter(v => /^es([-_]|$)/i.test(v.lang));
  const preferred = spanish.find(v => /natural|neural|premium|enhanced|google|microsoft/i.test(v.name)) || spanish.find(v => /es-ES/i.test(v.lang)) || spanish[0];
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u); return true;
}

function mapsSearch(place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
}

function App() {
  const [selected,setSelected]=useState("nieuwe-kerk");
  const [playing,setPlaying]=useState(false);
  const [filter,setFilter]=useState("Todos");
  const [foodTab,setFoodTab]=useState("comer");
  const [page,setPage]=useState("inicio");
  const [mobileMenu,setMobileMenu]=useState(false);
  const goPage = (next) => { setPage(next); setMobileMenu(false); window.scrollTo({top:0,behavior:"smooth"}); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); setPlaying(false); };

  const categories=["Todos","Monumento","Museo","Palacio","Iglesia histórica","Complejo histórico","Edificio histórico","Barrio","Arte urbano","Curiosidad histórica","Jardín histórico"];
  const visible=useMemo(()=>filter==="Todos"?stops:stops.filter(s=>s.type===filter),[filter]);
  const selectedStop=stops.find(s=>s.id===selected) ?? stops[0];

  const toggleAudio=()=>{
    if(!("speechSynthesis" in window)) return;
    if(playing){window.speechSynthesis.cancel();setPlaying(false);return;}
    const text=`${selectedStop.title}. ${selectedStop.facts.join(" ")} ${selectedStop.guide} Dato curioso: ${selectedStop.curious}`;
    speak(text); setPlaying(true); window.speechSynthesis.onend=()=>setPlaying(false);
  };

  const routeStops=stops.filter(s=>s.id!=="lunch");
  const fullRoute=`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent("Slaakstraat, Amsterdam, Netherlands")}&destination=${encodeURIComponent("Slaakstraat, Amsterdam, Netherlands")}&waypoints=${encodeURIComponent(routeStops.map(s=>s.map).join("|"))}&travelmode=transit`;
  const walkRoute=`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(routeStops[0].map)}&destination=${encodeURIComponent(routeStops[routeStops.length-1].map)}&waypoints=${encodeURIComponent(routeStops.slice(1,-1).map(s=>s.map).join("|"))}&travelmode=walking`;

  return <div className="app">
    <header className="hero" id="inicio">
      <nav className="nav">
        <button className="brand navBrand" onClick={()=>goPage("inicio")}>DEN HAAG <span>·</span> guía</button>
        <button className="mobileMenuButton" aria-label={mobileMenu ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileMenu} onClick={()=>setMobileMenu(v=>!v)}>{mobileMenu?<X size={22}/>:<Menu size={22}/>}</button>
        <div className={mobileMenu ? "navLinks open" : "navLinks"}>
          <button className={page==="inicio"?"navActive":""} onClick={()=>goPage("inicio")}>Inicio</button>
          <button className={page==="paradas"?"navActive":""} onClick={()=>goPage("paradas")}>Paradas</button>
          <button className={page==="mapa"?"navActive":""} onClick={()=>goPage("mapa")}>Mapa</button>
          <button className={page==="restauracion"?"navActive":""} onClick={()=>goPage("restauracion")}>Restauración</button>
        </div>
      </nav>
      <div className="heroGrid">
        <div>
          <div className="eyebrow"><CalendarDays size={15}/> GUÍA HISTÓRICA · LA HAYA</div>
          <h1>La Haya,<br/><em>entre reyes y justicia.</em></h1>
          <p className="heroLead">Una guía a pie para entender la ciudad, no solo verla: cómo nació alrededor de un hof medieval, por qué una cigüeña acabó en su escudo, cómo llegó la monarquía y qué papel jugó La Haya durante la ocupación nazi.</p>
          <div className="heroActions"><button className="button primary" onClick={()=>goPage("paradas")}><Route size={17}/> Ver las paradas</button><button className="button ghost" onClick={()=>goPage("mapa")}><MapPin size={17}/> Mapa y transporte</button></div>
        </div>
        <div className="heroCard">
          <div className="cardKicker">EN UNA MIRADA</div><div className="bigNumber">1230</div><div className="bigLabel">el punto de partida de la Hofstad</div>
          <div className="miniRow"><span>15</span><b>paradas</b><span>4</span><b>temas históricos</b></div><div className="line"></div>
          <p>Origen medieval · Casa Real · arte · justicia internacional · memoria de la Segunda Guerra Mundial.</p>
        </div>
      </div>
    </header>

    <div className="breadcrumb"><button onClick={()=>goPage("inicio")}>Inicio</button><span>›</span><span>{({inicio:"La historia de La Haya",paradas:"Paradas de la ruta",mapa:"Mapa y transporte",restauracion:"Restauración"})[page]}</span></div>
    <main className={`page-${page}`}>
      <section className="origin intro">
        <div><span className="sectionNo">01 / INICIO · EL ORIGEN</span><h2>La Haya no nació como una ciudad.</h2>
          <p className="lead">Nació como un <em>hof</em>: una residencia de los condes de Holanda en un paisaje de bosque, dunas y humedales.</p></div>
        <div className="story">
          <p>Hacia <strong>1230</strong>, el conde Floris IV compró un hof en un lugar conocido como <strong>Die Haghe</strong>. Su hijo Guillermo II ya residía allí en 1242, fecha de la primera mención documental conocida del nombre Die Haga. Floris V amplió el complejo y levantó la gran sala que acabaría siendo la Ridderzaal.</p>
          <p>El detalle importante es que La Haya creció alrededor del poder. Los condes llevaron consigo funcionarios, artesanos y personas encargadas de mantener la corte. Así apareció un pueblo que ejercía funciones de ciudad pero que durante siglos <strong>no tuvo murallas ni derechos de ciudad</strong>.</p>
          <p>Por eso el nombre neerlandés <strong>'s-Gravenhage</strong> significa aproximadamente “el seto del conde”. <strong>Den Haag</strong> es la forma cotidiana actual. Con el tiempo la residencia cortesana se convirtió en sede política, real y diplomática.</p>
        </div>
      </section>

      <section className="heritageVisual">
        <div className="imageCard coatCard">
          <img src={IMG.coat} alt="Escudo de armas de La Haya"/>
          <div><span className="captionTag">EL ESCUDO</span><h3>La cigüeña que come una anguila.</h3><p>El escudo oficial muestra una cigüeña de color natural con una anguila negra en el pico, sobre fondo dorado, sostenida por dos leones y coronada. El lema es <strong>Vrede en Recht</strong>: Paz y Justicia.</p></div>
        </div>
        <div className="imageCard">
          <img className="map1570Image" src={IMG.map1570} alt="Plano histórico de La Haya tal como era en 1570" loading="lazy"/>
          <div><span className="captionTag">LA CIUDAD EN 1570</span><h3>Antes de los rascacielos, un pequeño núcleo.</h3><p>Este plano reproduce cómo era La Haya hacia 1570: el Binnenhof, la Grote Kerk, el Hofvijver y grandes espacios verdes. La copia conservada fue pintada por Cornelis Elandts en 1663 a partir de un original anterior.</p></div>
        </div>
      </section>

      <section className="coatStory splitSection">
        <div><span className="sectionNo">02 / ¿POR QUÉ UNA CIGÜEÑA?</span><h2>Un pájaro convertido en símbolo.</h2></div>
        <div>
          <p>La respuesta corta es que <strong>no existe una explicación documental única</strong>. El Archivo Municipal explica que la cigüeña era considerada un ave que traía buena suerte y que ya estaba presente en la zona.</p>
          <p>Hay pruebas de que la ciudad cuidaba cigüeñas mucho antes de que el símbolo quedara fijado. Una cuenta de 1352–1354 menciona dinero para construir nidos junto al castillo del Binnenhof. En 1586, las cuentas municipales registran miles de anguilas destinadas a las cigüeñas y un cuidador específico.</p>
          <p>La representación más antigua conocida del escudo con cigüeña está en una campana de la Grote Kerk fundida en <strong>1541</strong>. El escudo oficial quedó fijado en 1816 y en 1954 se estableció la descripción heráldica actual. El césped verde que aparecía en versiones antiguas desapareció del escudo moderno; curiosamente, el verde y el amarillo son los colores de la bandera de La Haya.</p>
          <div className="quoteBox">“No sabemos por qué fue elegida; probablemente La Haya adoptó una tradición medieval de ciudades que tenían un animal como símbolo.”<small>— síntesis del Haags Gemeentearchief</small></div>
        </div>
      </section>

      <section className="warSection splitSection">
        <div>
          <span className="sectionNo">03 / LA HAYA 1940–1945</span><h2>Resistencia bajo la ocupación nazi.</h2>
          <p>La historia de La Haya durante la Segunda Guerra Mundial no se entiende solo desde los edificios oficiales. La ciudad fue centro administrativo de la ocupación, sufrió deportaciones y también desarrolló redes de resistencia.</p>
          <p>Un ejemplo temprano fue <strong>“Anjerdag”</strong>, el 29 de junio de 1940: muchos habitantes salieron espontáneamente a la calle con claveles para mostrar su rechazo a la ocupación alemana.</p>
          <p>La <strong>Stijkelgroep</strong>, una red de resistencia de La Haya, fue desmantelada en 1941. 47 miembros murieron durante la guerra; un monumento en el cementerio Westduin recuerda al grupo. También puedes conocer historias de ocho personas de la resistencia mediante el proyecto urbano <em>Haags Verzet</em>.</p>
          <p>La memoria de la guerra está repartida por la ciudad: el antiguo Oranjehotel de Scheveningen, monumentos de resistencia y lugares vinculados a la persecución de la población judía forman otra ruta histórica que puedes hacer aparte.</p>
          <div className="detailActions"><a className="smallButton" href="https://denhaag.com/nl/haags-verzet" target="_blank" rel="noreferrer"><Shield size={15}/> Haags Verzet</a><a className="smallButton secondary" href="https://www.4en5mei.nl/oorlogsmonumenten/zoeken/435/den-haag-stijkelmonument" target="_blank" rel="noreferrer">Monumento Stijkelgroep <ExternalLink size={14}/></a></div>
        </div>
        <figure className="warImage"><img src={IMG.stijkel} alt="Monumento de la Stijkelgroep en el cementerio Westduin"/><figcaption>Monumento a la Stijkelgroep en Westduin. El cementerio conserva la memoria de miembros de la resistencia de La Haya.</figcaption></figure>
      </section>

      <section className="royalSection splitSection">
        <div><span className="sectionNo">04 / LA CASA REAL</span><h2>¿Dónde está la familia real?</h2></div>
        <div className="royalCards">
          <div className="royalCard"><Crown/><h3>Palacio Noordeinde</h3><p>Es el <strong>lugar de trabajo del rey</strong>. Las oficinas del rey y la reina Máxima están aquí. Es el palacio que encontrarás en la ruta.</p><button className="inlineLink" onClick={()=>{goPage("paradas")}}>Ir a la parada →</button></div>
          <div className="royalCard"><Crown/><h3>Huis ten Bosch</h3><p>Es la <strong>residencia familiar</strong> donde viven el rey Willem-Alexander y su familia. Está en el Haagse Bos y no forma parte del paseo del centro.</p><a href="https://www.google.com/maps/search/?api=1&query=Huis+ten+Bosch+Palace+The+Hague" target="_blank" rel="noreferrer">Ver en Google Maps →</a></div>
        </div>
      </section>

      <section className="justiceExplainer splitSection">
        <div><span className="sectionNo">04 / LA HAYA JURÍDICA</span><h2>¿Tribunal Supremo europeo? Hay que distinguir tres cosas.</h2></div>
        <div className="story">
          <p><strong>La Haya no alberga un “Tribunal Supremo de Europa”.</strong> Si buscas el máximo tribunal nacional neerlandés, es la <button className="inlineLink" onClick={()=>{goPage("paradas")}}>Hoge Raad</button>, cuya sede actual está en Korte Voorhout.</p>
          <p>Si hablamos de la <strong>Unión Europea</strong>, el Tribunal de Justicia de la Unión Europea tiene su sede en <strong>Luxemburgo</strong>. Y si hablamos de derechos humanos europeos, el Tribunal Europeo de Derechos Humanos está en <strong>Estrasburgo</strong>.</p>
          <p>Lo que convirtió a La Haya en una capital jurídica internacional fue otra historia: las Conferencias de Paz de 1899 y 1907, la creación de la Corte Permanente de Arbitraje y, después, la instalación en el Palacio de la Paz de la Corte Permanente de Justicia Internacional en 1922 y de su sucesora, la Corte Internacional de Justicia, desde 1946.</p>
          <div className="quoteBox">La Haya no es “la capital judicial de Europa” por albergar un único tribunal: lo es por la concentración histórica de instituciones de derecho internacional.</div>
        </div>
      </section>

      <section id="ruta" className="routeSection">
        <aside className="filters"><span className="sectionNo">PARADAS · GUÍA</span><p className="filterIntro">Pulsa una parada para abrir la explicación de guía, datos históricos, curiosidades y precio cuando haya entrada.</p>
          {categories.map(c=><button key={c} className={filter===c?"filter active":"filter"} onClick={()=>setFilter(c)}>{c}<span>{c==="Todos"?stops.length:stops.filter(s=>s.type===c).length}</span></button>)}
        </aside>
        <div className="timeline">
          {visible.map(stop=><article id={`stop-${stop.id}`} key={stop.id} className={`stop ${selected===stop.id?"selected":""}`} onClick={()=>setSelected(stop.id)}>
            <div className={`dot ${stop.color}`}></div><div className="time">{stop.time}</div>
            <div className="stopBody"><div className="stopTop"><div><span className="pill">{stop.type}</span><h3>{stop.title}</h3><div className="meta"><MapPin size={14}/>{stop.area}<span>·</span><Clock3 size={14}/>{stop.duration}</div></div><ChevronDown className="chevron" size={20}/></div>
              {selected===stop.id && <div className="detail">
                <figure className="stopImage"><img src={stop.image || ({Museo:"https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1400&q=85",Palacio:IMG.palace,"Paisaje histórico":"https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=85","Avenida histórica":"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=85",default:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85"})[stop.type] || "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85"} alt={stop.title} loading="lazy"/><figcaption>Imagen de referencia del lugar · puede abrirse el mapa para localizar el punto exacto</figcaption></figure>
                <div className="facts">{stop.facts.map((fact,i)=><p key={i}>{fact}</p>)}</div>
                <div className="guideNote"><History size={17}/><div><strong>Como te lo contaría un guía</strong><br/>{stop.guide}</div></div>
                <div className="curious"><Sparkles size={17}/><div><strong>Dato curioso</strong><br/>{stop.curious}</div></div>
                <div className="visitNote"><Clock3 size={16}/><div><strong>Consejo de visita {stop.price && `· ${stop.price}`}</strong><br/>{stop.visit}</div></div>
                <div className="relatedLinks"><strong>Continúa la historia:</strong> <button onClick={e=>{e.stopPropagation();goPage("inicio")}}>origen de La Haya</button> · <button onClick={e=>{e.stopPropagation();goPage("mapa")}}>mapa y transporte</button> · <button onClick={e=>{e.stopPropagation();goPage("restauracion")}}>comer y tomar café</button><br/><strong>Otras paradas relacionadas:</strong> {stops.filter(other=>other.id!==stop.id && ["binnenhof","mauritshuis","noordeinde","supreme-court","peace","grote-kerk"].includes(other.id)).map((other,i)=><React.Fragment key={other.id}>{i>0?" · ":""}<button onClick={e=>{e.stopPropagation();setSelected(other.id);goPage("paradas")}}>{other.title}</button></React.Fragment>)}</div>
                <div className="detailActions"><a className="smallButton" href={mapsSearch(stop.map)} target="_blank" rel="noreferrer"><MapPin size={15}/> Cómo llegar</a>{stop.sourceUrl&&<a className="smallButton secondary" href={stop.sourceUrl} target="_blank" rel="noreferrer">Fuente oficial <ExternalLink size={14}/></a>}<button className="smallButton audioButton" onClick={e=>{e.stopPropagation();toggleAudio()}}>{playing?<Pause size={15}/>:<AudioLines size={15}/>} {playing?"Parar audio":"Escuchar"}</button></div>
              </div>}
            </div>
          </article>)}
        </div>
      </section>

      <section id="mapa" className="mapSection">
        <div className="mapCopy"><span className="sectionNo">05 / MAPA + TRANSPORTE</span><h2>Desde Slaakstraat hasta La Haya y de vuelta.</h2>
          <p>He dejado Google Maps como navegador de la ruta para que pueda recalcular transporte y horarios en tiempo real. El punto de partida es <strong>Slaakstraat, Ámsterdam</strong>. Salida prevista a las <strong>10:30 en transporte público</strong>; el viaje suele requerir alrededor de una hora, según conexiones. La primera parada está programada sobre las 11:35: comprueba el trayecto en vivo antes de salir.</p>
          <div className="routeBox"><div><Train size={18}/><strong>Ida</strong><span>10:30 · Slaakstraat → Binnenhof / Den Haag Centrum</span></div><div><Route size={18}/><strong>Ruta</strong><span>Recorrido a pie por las paradas culturales (la pausa de comida queda fuera del trazado)</span></div><div><Train size={18}/><strong>Vuelta</strong><span>Centro de La Haya → Slaakstraat, Ámsterdam</span></div></div>
          <div className="heroActions mapActions"><a className="button primary" href={fullRoute} target="_blank" rel="noreferrer"><Route size={17}/> Google Maps · ida + ruta + vuelta</a><a className="button secondaryButton" href={walkRoute} target="_blank" rel="noreferrer"><MapPin size={17}/> Ruta a pie por el centro</a><a className="button secondaryButton" href={GOOGLE_MAPS_LIST_URL} target="_blank" rel="noreferrer"><MapPin size={17}/> Lista guardada</a></div>
          <div className="mapNotice"><strong>Consejo práctico</strong><span>Google Maps recalculará el transporte público según la hora real. Para la caminata central, usa el enlace de ruta a pie; para salir y volver a Ámsterdam, usa el enlace completo.</span></div>
        </div>
        <div className="mapFrame"><iframe title="Mapa de La Haya" src="https://www.google.com/maps?q=Binnenhof%2C%20Den%20Haag%2C%20Netherlands&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
      </section>

      <section id="restauracion" className="foodSection">
        <div className="foodHead"><div><span className="sectionNo">06 / RESTAURACIÓN</span><h2>Comer bien sin convertir la comida en otra visita turística.</h2></div><p>Opciones centradas en el centro de La Haya. El ranking de comida usa valoraciones actuales de Google Maps; los precios son orientativos y se han elegido opciones donde es viable comer por unos 10–20 € por persona.</p></div>
        <div className="foodTabs"><button className={foodTab==="comer"?"active":""} onClick={()=>setFoodTab("comer")}><Utensils size={16}/> Comer · 4,5+</button><button className={foodTab==="cerveza"?"active":""} onClick={()=>setFoodTab("cerveza")}><Beer size={16}/> Cervezas curiosas</button><button className={foodTab==="cafe"?"active":""} onClick={()=>setFoodTab("cafe")}><Coffee size={16}/> Café de especialidad</button></div>

        {foodTab==="comer" && <div className="foodGrid">{food.map(x=><article className="foodCard" key={x.name}><div className="rank">#{x.rank}</div><div className="foodRating">★ {x.rating}</div><h3>{x.name}</h3><p className="foodPrice"><CircleDollarSign size={14}/>{x.price}</p><p>{x.why}</p><span className="address">{x.address}</span><a href={mapsSearch(x.maps)} target="_self" rel="noreferrer">Google Maps <ArrowUpRight size={14}/></a></article>)}</div>}
        {foodTab==="cerveza" && <div className="foodGrid">{beer.map((x,i)=><article className="foodCard beerCard" key={x.name}><div className="rank">#{i+1}</div><div className="foodRating">★ {x.rating}</div><h3>{x.name}</h3><p>{x.why}</p><span className="address">{x.address}</span><a href={mapsSearch(x.maps)} target="_self" rel="noreferrer">Google Maps <ArrowUpRight size={14}/></a></article>)}</div>}
        {foodTab==="cafe" && <div className="foodGrid">{coffee.map((x,i)=><article className="foodCard coffeeCard" key={x.name}><div className="rank">#{i+1}</div><div className="foodRating">★ {x.rating}</div><h3>{x.name}</h3><p>{x.why}</p><span className="address">{x.address}</span><a href={mapsSearch(x.maps)} target="_self" rel="noreferrer">Google Maps <ArrowUpRight size={14}/></a></article>)}</div>}
      </section>

      <section id="audio" className="audioSection"><div className="audioIcon"><AudioLines size={28}/></div><div><span className="sectionNo">07 / AUDIOGUÍA</span><h2>Escucha la historia mientras caminas.</h2><p>La web usa Speech Synthesis del navegador. Selecciona una parada y pulsa «Escuchar» para convertir la ficha en una pequeña audioguía.</p></div><button className="button primary" onClick={toggleAudio}>{playing?<Pause size={17}/>:<Play size={17}/>} {playing?"Parar":`Escuchar: ${selectedStop.title}`}</button></section>

      <section className="sourcesSection"><div><span className="sectionNo">08 / FUENTES Y ACTUALIZACIÓN</span><h2>Una guía que distingue historia de información práctica.</h2></div><div className="sourceList"><a href="https://haagsgemeentearchief.nl/ontdek-de-stad/verhalen-van-de-stad/het-ontstaan-van-den-haag" target="_blank" rel="noreferrer">Haags Gemeentearchief · origen y escudo <ExternalLink size={14}/></a><a href="https://haagshistorischmuseum.nl/collectie/topstukken/plattegrond-van-den-haag-in-1570/" target="_blank" rel="noreferrer">Haags Historisch Museum · mapa de 1570 <ExternalLink size={14}/></a><a href="https://www.royal-house.nl/topics/palaces" target="_blank" rel="noreferrer">Royal House · palacios y residencia real <ExternalLink size={14}/></a><a href="https://www.vredespaleis.nl/visit/visitors-centre-2/?lang=en" target="_blank" rel="noreferrer">Peace Palace · visita y audioguía <ExternalLink size={14}/></a><a href="https://www.hogeraad.nl/over/" target="_blank" rel="noreferrer">Hoge Raad · historia y edificio <ExternalLink size={14}/></a><a href="https://www.icj-cij.org/history" target="_blank" rel="noreferrer">Corte Internacional de Justicia · historia <ExternalLink size={14}/></a><a href="https://eur-lex.europa.eu/eli/treaty/teu_2016/oj" target="_blank" rel="noreferrer">UE · sede del Tribunal de Justicia en Luxemburgo <ExternalLink size={14}/></a></div></section>
    </main>
    <footer><div><strong>LA HAYA · DEN HAAG</strong><br/><span>Guía histórica · actualizada para octubre de 2026</span></div><div>Camina despacio. Mira hacia arriba. Y deja que la ciudad cuente el resto.</div></footer>
  </div>;
}

export default App;
