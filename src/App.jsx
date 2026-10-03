import React, { useMemo, useState } from "react";
import {
  ArrowUpRight, AudioLines, CalendarDays, ChevronDown, Clock3,
  ExternalLink, MapPin, Pause, Play, Route, Sparkles, Utensils,
  Train, Coffee, Beer, History, Crown, Shield, CircleDollarSign, Menu, X
} from "lucide-react";

const GOOGLE_MAPS_LIST_URL = "https://maps.app.goo.gl/cNTVF1s5MeNAzCoMA?g_st=i";

const IMG = {
  coat: "https://commons.wikimedia.org/wiki/Special:FilePath/Den_Haag_wapen.svg",
  map1570: "https://commons.wikimedia.org/wiki/Special:FilePath/Plattegrond%20van%20Den%20Haag%2C%201570%20Aenwysinge%20van%20s%27%20Hage%2C%20als%20die%20was%20anno%201570%20Haga-Comitis%20in%20Hollandia%201570%20%28titel%20op%20object%29%2C%20RP-P-AO-12-4.jpg",
  binnenhofNow: "https://commons.wikimedia.org/wiki/Special:FilePath/Binnenhof%20Den%20Haag.jpg",
  binnenhofOld: "https://commons.wikimedia.org/wiki/Special:FilePath/Binnenhof%2C%20The%20Hague%201868.jpg",
  stijkel: "https://stichtingnationaleherdenkingsgravenhage.nl/wp-content/uploads/2018/11/Stijkelgroep1.jpg",
  palace: "https://commons.wikimedia.org/wiki/Special:FilePath/Paleis%20Noordeinde.jpg"
};

const stops = [
  {
    id: "binnenhof", time: "11:35", title: "Binnenhof & Ridderzaal", area: "Centro histórico",
    duration: "45 min", type: "Monumento", color: "sage", map: "Binnenhof, Den Haag, Netherlands",
    image: IMG.binnenhofNow,
    facts: [
      "La historia urbana de La Haya arranca aquí: alrededor de 1230 el conde Floris IV compró un hof en la zona de Die Haghe. Su hijo Guillermo II y después Floris V lo ampliaron hasta convertirlo en residencia de los condes de Holanda.",
      "La Ridderzaal, terminada a finales del siglo XIII, era la gran sala ceremonial de la corte. Hoy es el escenario del discurso del trono durante Prinsjesdag.",
      "La ausencia de murallas medievales explica una rareza de La Haya: durante siglos fue un pueblo con funciones de ciudad, pero sin los derechos urbanos y defensas que tenían muchas ciudades neerlandesas.",
      "El Binnenhof está actualmente en una gran renovación. Eso hace especialmente interesante comparar el lugar actual con los dibujos y mapas históricos."
    ],
    guide: "Párate junto al Hofvijver y mira el conjunto como lo habría visto un visitante medieval: no había una gran ciudad alrededor, sino el hof del conde, agua, caminos y campo. La política llegó antes que la gran ciudad.",
    curious: "El Binnenhof es uno de los complejos parlamentarios históricos más antiguos de Europa todavía vinculados a la vida política.",
    visit: "Para esta ruta recomiendo disfrutarlo por fuera y desde el Hofvijver. El acceso interior depende de las obras y de visitas programadas.",
    source: "Haags Gemeentearchief", sourceUrl: "https://haagsgemeentearchief.nl/ontdek-de-stad/verhalen-van-de-stad/het-ontstaan-van-den-haag"
  },
  {
    id: "hofvijver", time: "12:25", title: "Hofvijver & Lange Vijverberg", area: "Junto al Binnenhof",
    duration: "25 min", type: "Paisaje histórico", color: "water", map: "Hofvijver, Den Haag, Netherlands",
    facts: [
      "El Hofvijver está unido al origen del hof de los condes. Desde aquí se entiende por qué el complejo del Binnenhof se instaló en este paisaje de agua, dunas y bosques.",
      "En las representaciones históricas el estanque aparece como parte del paisaje cortesano, no como un simple elemento ornamental.",
      "La perspectiva desde Lange Vijverberg reúne en pocos metros el Binnenhof, la torre Maurits y el Mauritshuis."
    ],
    guide: "Este es el punto donde la ciudad se explica sola. A tu espalda queda la ciudad moderna; delante, el estanque que acompañó al poder desde la Edad Media.",
    curious: "En las imágenes del siglo XVI ya aparece una actividad intensa alrededor del estanque: barcos, caballos, vendedores y vida urbana.",
    visit: "Parada exterior gratuita.",
    source: "Haagse Kaart / Haags Historisch Museum", sourceUrl: "https://www.haagsekaart.nl/"
  },
  {
    id: "mauritshuis", time: "12:50", title: "Mauritshuis", area: "Plein / Hofvijver",
    duration: "1 h 30 min", type: "Museo", color: "ochre", map: "Mauritshuis, Plein 29, Den Haag, Netherlands",
    facts: [
      "El edificio se construyó entre 1633 y 1644 para Johan Maurits de Nassau-Siegen y es uno de los ejemplos más refinados del clasicismo neerlandés.",
      "Desde 1822 funciona como museo y conserva una colección concentrada de maestros neerlandeses y flamencos.",
      "Aquí se encuentra La joven de la perla de Vermeer, además de obras de Rembrandt, Fabritius, Hals y otros grandes nombres.",
      "La colección permite ver cómo el gusto artístico de la República neerlandesa convirtió escenas domésticas, paisajes y retratos en grandes temas culturales."
    ],
    guide: "Entra pensando en una casa de coleccionista más que en un museo moderno. Las salas son parte de la experiencia: estás viendo arte dentro de una residencia aristocrática del siglo XVII.",
    curious: "En 2026 el Mauritshuis mantiene una tarifa especial de 4 € para visitantes residentes en la UE entre las 16:00 y las 18:00.",
    visit: "Adultos €21. Combo Mauritshuis + Galería Príncipe Guillermo V: €24. Martes-domingo 10:00–18:00. El 4 de octubre de 2026 La joven de la perla vuelve a estar disponible según el calendario oficial.",
    price: "€21 adulto · €24 combo",
    source: "Mauritshuis", sourceUrl: "https://www.mauritshuis.nl/en/visit"
  },
  {
    id: "prince-william", time: "14:20", title: "Galería Príncipe Guillermo V", area: "Buitenhof",
    duration: "30 min", type: "Museo", color: "rose", map: "Prince William V Gallery, Den Haag, Netherlands",
    facts: [
      "La galería fue creada en 1774 para hacer pública la colección de Guillermo V de Orange-Nassau.",
      "Se presenta como el primer museo de los Países Bajos.",
      "Su interior conserva la estética de una galería del siglo XVIII: las pinturas cubren las paredes casi de suelo a techo."
    ],
    guide: "Aquí cambia la sensación: vienes de la pintura neerlandesa del Siglo de Oro y entras en la cultura cortesana del XVIII. Mira cómo la forma de colgar las obras también cuenta una historia.",
    curious: "Es pequeña y está a pocos pasos del Mauritshuis; el combo permite visitarlas con una sola entrada.",
    visit: "Martes-domingo 12:00–17:00. Adultos €8,50; gratis hasta 18 años. Combo con Mauritshuis: €24.",
    price: "€8,50 adulto · €24 combo",
    source: "Mauritshuis", sourceUrl: "https://www.mauritshuis.nl/en/visit"
  },
  {
    id: "lunch", time: "14:55", title: "Parada para comer · Plein / Noordeinde", area: "Centro",
    duration: "60 min", type: "Comida", color: "cream", map: "Plein, Den Haag, Netherlands",
    facts: [
      "Plein fue originalmente un espacio relacionado con los jardines del Binnenhof y hoy funciona como una de las plazas más animadas del centro.",
      "Desde aquí puedes desviarte muy poco hacia Noordeinde, Prinsestraat o Molenstraat para comer barato.",
      "En la sección Restauración de esta guía encontrarás opciones de 4,5 estrellas o más y precios orientativos de 10–20 € por persona."
    ],
    guide: "Es una buena pausa para bajar el ritmo. La ciudad cortesana queda detrás y delante empieza el barrio de calles comerciales, cafés y pequeños restaurantes.",
    curious: "La ruta evita volver sobre tus pasos: después de comer avanzamos hacia el barrio real de Noordeinde.",
    visit: "Reserva aproximadamente una hora. En domingo comprueba el horario del local elegido."
  },
  {
    id: "noordeinde", time: "15:55", title: "Palacio Noordeinde & Jardín del Palacio", area: "Noordeinde",
    duration: "25 min", type: "Palacio", color: "blue", map: "Noordeinde Palace, Noordeinde 68, Den Haag, Netherlands",
    image: IMG.palace,
    facts: [
      "Noordeinde es el lugar de trabajo del rey Willem-Alexander; allí están también las oficinas de la reina Máxima y gran parte del personal de la Casa Real.",
      "El origen del palacio está en una gran casa señorial transformada en 1533. La relación con la Casa de Orange comenzó en 1591.",
      "El palacio sufrió un incendio en 1948. Tras restauraciones, volvió a convertirse en un centro de trabajo de la monarquía.",
      "El Jardín del Palacio, detrás del edificio, es un parque público y permite experimentar el contraste entre residencia real y espacio cotidiano.",
      "La bandera que importa aquí no es simplemente la tricolor neerlandesa: cuando el rey está en los Países Bajos, se iza el estandarte real, una bandera dividida en cuatro cuarteles azul Nassau y naranja, con el escudo real coronado y los cuernos azules de Orange. Por eso verla ondear no confirma necesariamente que el rey esté trabajando dentro de Noordeinde; indica que está en el país."
    ],
    guide: "Fíjate en la bandera, pero con un matiz importante: el estandarte real ondea en Noordeinde y en Huis ten Bosch cuando el rey se encuentra en los Países Bajos. No es un indicador fiable de que esté trabajando justo en ese palacio. El estandarte tiene cuatro cuarteles en azul Nassau y naranja, el escudo real coronado y los cuernos de Orange. El palacio no es la residencia familiar: esa función corresponde a Huis ten Bosch.",
    curious: "El estandarte real se iza tanto en Noordeinde como en Huis ten Bosch cuando el rey está en los Países Bajos; no significa necesariamente que esté dentro de ese edificio en ese momento.",
    visit: "Exterior y Jardín del Palacio. Noordeinde no está abierto normalmente al público; las aperturas interiores se limitan a jornadas especiales.",
    source: "Royal House of the Netherlands", sourceUrl: "https://www.royal-house.nl/topics/palaces"
  },
  {
    id: "lange-voorhout", time: "16:25", title: "Lange Voorhout", area: "Museumkwartier",
    duration: "25 min", type: "Avenida histórica", color: "green", map: "Lange Voorhout, Den Haag, Netherlands",
    facts: [
      "Su trazado se desarrolló entre los siglos XIV y XV y quedó ligado a la expansión del barrio cortesano.",
      "En 1536 Carlos V ordenó plantar cuatro hileras de tilos, creando la avenida arbolada que reconocemos hoy.",
      "Durante la Edad de Oro fue lugar de paseo y encuentro de la élite de La Haya; actualmente conecta varios de los principales espacios culturales."
    ],
    guide: "Camina despacio bajo los árboles. Esta avenida funciona como un palimpsesto: debajo del paisaje elegante todavía se intuye la ciudad de cortesanos, carruajes y embajadas.",
    curious: "La arena de conchas utilizada antiguamente ayudaba a que los carruajes pudieran circular sin hundirse tanto en el barro.",
    visit: "Paseo exterior gratuito.",
    source: "DenHaag.com", sourceUrl: "https://denhaag.com/en/lange-voorhout"
  },
  {
    id: "escher", time: "16:45", title: "Escher in Het Paleis", area: "Lange Voorhout",
    duration: "1 h", type: "Museo / palacio", color: "ink", map: "Escher in Het Paleis, Lange Voorhout 74, Den Haag, Netherlands",
    facts: [
      "El edificio fue un palacio y la reina Emma lo compró en 1896; hoy sus salas contienen más de 120 obras de M.C. Escher.",
      "La colección muestra cómo Escher convirtió escaleras, reflejos, animales y formas geométricas en problemas visuales.",
      "La monumental Metamorphosis III recorre una transformación continua de formas y ocupa una parte destacada de la experiencia."
    ],
    guide: "No lo visites solo como un museo de grabados: fíjate en el propio palacio y en cómo las ilusiones de Escher juegan con la arquitectura que tienes alrededor.",
    curious: "La exposición incluye experiencias sobre percepción, reflexión y perspectiva que ayudan a entender cómo funcionan sus ilusiones.",
    visit: "Martes-domingo 11:00–17:00. Entrada adulto 2026: €14,50; estudiante €13,50; 7–12 años €8.",
    price: "€14,50 adulto",
    source: "Escher in Het Paleis", sourceUrl: "https://escherinhetpaleis.nl/es/visitar/entradas"
  },
  {
    id: "panorama", time: "17:45", title: "Panorama Mesdag", area: "Zeestraat",
    duration: "55 min", type: "Museo", color: "sand", map: "Panorama Mesdag, Zeestraat 65, Den Haag, Netherlands",
    facts: [
      "El Panorama de Scheveningen se terminó en 1881 y conserva una vista circular del antiguo pueblo pesquero y sus dunas.",
      "El lienzo mide unos 1.680 m² y el edificio está diseñado para que la perspectiva parezca continuar más allá del borde de la pintura.",
      "Hendrik Willem Mesdag lo pintó en unos cuatro meses con ayuda de otros artistas, entre ellos George Hendrik Breitner y Sientje Mesdag-van Houten."
    ],
    guide: "Sube a la plataforma central y busca primero el horizonte. Después baja la mirada: arena real, objetos y pintura se mezclan para que el cerebro deje de distinguir dónde termina el museo.",
    curious: "Es una cápsula de tiempo: puedes comparar la Scheveningen pintada en 1881 con la ciudad costera que verías hoy.",
    visit: "Martes-domingo 10:00–17:00. Entrada adulto 2026: €17,50; hasta 18 años gratis.",
    price: "€17,50 adulto",
    source: "Museum Panorama Mesdag", sourceUrl: "https://panorama-mesdag.nl/bezoek/"
  },
  {
    id: "peace", time: "18:30", title: "Palacio de la Paz", area: "Carnegieplein",
    duration: "45 min", type: "Monumento internacional", color: "sky", map: "Peace Palace, Carnegieplein 2, Den Haag, Netherlands",
    facts: [
      "El Palacio de la Paz abrió en 1913, financiado en gran parte por Andrew Carnegie, y se convirtió en símbolo de la vocación internacional de La Haya.",
      "Alberga la Corte Internacional de Justicia y la Corte Permanente de Arbitraje.",
      "El Visitors Centre explica la historia del edificio y de las instituciones mediante una audioguía de unos 30 minutos.",
      "La visita al palacio y a los jardines solo es posible mediante una visita guiada; el Visitors Centre es de acceso gratuito."
    ],
    guide: "La Haya se entiende aquí como algo más que una capital política: desde principios del siglo XX la ciudad se convirtió también en escenario de la justicia y el derecho internacionales.",
    curious: "El Camino Mundial de la Paz reúne piedras procedentes de países de todo el mundo, creando un recorrido simbólico alrededor del complejo.",
    visit: "Visitors Centre: domingo 12:00–17:00, entrada y audioguía gratuitas. Las visitas guiadas al palacio/jardines requieren reserva y tienen tarifas propias.",
    price: "Visitors Centre: gratis",
    source: "Peace Palace", sourceUrl: "https://www.vredespaleis.nl/visit/visitors-centre-2/?lang=en"
  },
  {
    id: "grote-kerk", time: "19:15", title: "Grote Kerk & Haagse Toren", area: "Torenstraat",
    duration: "45–90 min", type: "Iglesia / mirador", color: "purple", map: "Grote Kerk, Rond de Grote Kerk 12, Den Haag, Netherlands",
    facts: [
      "La Grote Kerk está entre los edificios históricos esenciales de La Haya y su historia se remonta al desarrollo medieval del pueblo.",
      "La torre hexagonal actual se levantó alrededor de 1420 y alcanza unos 92,5 metros.",
      "La Casa de Orange mantiene una relación histórica con la iglesia: varios miembros fueron bautizados allí.",
      "El interior conserva elementos como la pila, la predicación renacentista y escudos relacionados con la historia política y nobiliaria de la ciudad."
    ],
    guide: "Si el horario te lo permite, mira la torre desde la plaza antes de entrar. Sus seis lados hacen que parezca distinta según desde qué calle llegues.",
    curious: "La subida requiere 288 escalones y ofrece una vista panorámica; para esta ruta conviene reservarla en una franja específica y no dejarla para el final.",
    visit: "La parada de las 17:30 está planteada como exterior. Si quieres subir a la torre, consulta la franja del día y sustituye otra visita; el precio publicado puede variar según la visita.",
    source: "Grote Kerk / DenHaag.com", sourceUrl: "https://denhaag.com/en/big-church"
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
  const [selected,setSelected]=useState("binnenhof");
  const [playing,setPlaying]=useState(false);
  const [filter,setFilter]=useState("Todos");
  const [foodTab,setFoodTab]=useState("comer");
  const [page,setPage]=useState("inicio");
  const [mobileMenu,setMobileMenu]=useState(false);
  const goPage = (next) => { setPage(next); setMobileMenu(false); window.scrollTo({top:0,behavior:"smooth"}); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); setPlaying(false); };

  const categories=["Todos","Monumento","Museo","Palacio","Avenida histórica","Monumento internacional","Iglesia / mirador"];
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
          <div className="heroActions"><a className="button primary" href="#ruta"><Route size={17}/> Ver las paradas</a><a className="button ghost" href="#mapa"><MapPin size={17}/> Mapa y transporte</a></div>
        </div>
        <div className="heroCard">
          <div className="cardKicker">EN UNA MIRADA</div><div className="bigNumber">1230</div><div className="bigLabel">el punto de partida de la Hofstad</div>
          <div className="miniRow"><span>11</span><b>paradas</b><span>4</span><b>temas históricos</b></div><div className="line"></div>
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
          <div className="royalCard"><Crown/><h3>Palacio Noordeinde</h3><p>Es el <strong>lugar de trabajo del rey</strong>. Las oficinas del rey y la reina Máxima están aquí. Es el palacio que encontrarás en la ruta.</p><a href="#stop-noordeinde">Ir a la parada →</a></div>
          <div className="royalCard"><Crown/><h3>Huis ten Bosch</h3><p>Es la <strong>residencia familiar</strong> donde viven el rey Willem-Alexander y su familia. Está en el Haagse Bos y no forma parte del paseo del centro.</p><a href="https://www.google.com/maps/search/?api=1&query=Huis+ten+Bosch+Palace+The+Hague" target="_blank" rel="noreferrer">Ver en Google Maps →</a></div>
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
                <div className="relatedLinks"><strong>Continúa la historia:</strong> <button onClick={e=>{e.stopPropagation();goPage("inicio")}}>origen de La Haya</button> · <button onClick={e=>{e.stopPropagation();goPage("mapa")}}>mapa y transporte</button> · <button onClick={e=>{e.stopPropagation();goPage("restauracion")}}>comer y tomar café</button><br/><strong>Otras paradas relacionadas:</strong> {stops.filter(other=>other.id!==stop.id && ["binnenhof","noordeinde","peace","grote-kerk"].includes(other.id)).map((other,i)=><React.Fragment key={other.id}>{i>0?" · ":""}<button onClick={e=>{e.stopPropagation();setSelected(other.id);goPage("paradas")}}>{other.title}</button></React.Fragment>)}</div>
                <div className="detailActions"><a className="smallButton" href={mapsSearch(stop.map)} target="_blank" rel="noreferrer"><MapPin size={15}/> Cómo llegar</a>{stop.sourceUrl&&<a className="smallButton secondary" href={stop.sourceUrl} target="_blank" rel="noreferrer">Fuente oficial <ExternalLink size={14}/></a>}<button className="smallButton audioButton" onClick={e=>{e.stopPropagation();toggleAudio()}}>{playing?<Pause size={15}/>:<AudioLines size={15}/>} {playing?"Parar audio":"Escuchar"}</button></div>
              </div>}
            </div>
          </article>)}
        </div>
      </section>

      <section id="mapa" className="mapSection">
        <div className="mapCopy"><span className="sectionNo">05 / MAPA + TRANSPORTE</span><h2>Desde Slaakstraat hasta La Haya y de vuelta.</h2>
          <p>He dejado Google Maps como navegador de la ruta para que pueda recalcular transporte y horarios en tiempo real. El punto de partida es <strong>Slaakstraat, Ámsterdam</strong>. Salida prevista a las <strong>10:30 en transporte público</strong>; el viaje suele requerir alrededor de una hora, según conexiones. La primera parada está programada sobre las 11:35: comprueba el trayecto en vivo antes de salir.</p>
          <div className="routeBox"><div><Train size={18}/><strong>Ida</strong><span>10:30 · Slaakstraat → Binnenhof / Den Haag Centrum</span></div><div><Route size={18}/><strong>Ruta</strong><span>Recorrido a pie por las 10 paradas culturales (la pausa de comida queda fuera del trazado)</span></div><div><Train size={18}/><strong>Vuelta</strong><span>Centro de La Haya → Slaakstraat, Ámsterdam</span></div></div>
          <div className="heroActions mapActions"><a className="button primary" href={fullRoute} target="_blank" rel="noreferrer"><Route size={17}/> Google Maps · ida + ruta + vuelta</a><a className="button secondaryButton" href={walkRoute} target="_blank" rel="noreferrer"><MapPin size={17}/> Ruta a pie por el centro</a><a className="button secondaryButton" href={GOOGLE_MAPS_LIST_URL} target="_blank" rel="noreferrer"><MapPin size={17}/> Lista guardada</a></div>
          <div className="mapNotice"><strong>Consejo práctico</strong><span>Google Maps recalculará el transporte público según la hora real. Para la caminata central, usa el enlace de ruta a pie; para salir y volver a Ámsterdam, usa el enlace completo.</span></div>
        </div>
        <div className="mapFrame"><iframe title="Mapa de La Haya" src="https://www.google.com/maps?q=Binnenhof%2C%20Den%20Haag%2C%20Netherlands&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
      </section>

      <section id="restauracion" className="foodSection">
        <div className="foodHead"><div><span className="sectionNo">06 / RESTAURACIÓN</span><h2>Comer bien sin convertir la comida en otra visita turística.</h2></div><p>Opciones centradas en el centro de La Haya. El ranking de comida usa valoraciones actuales de Google Maps; los precios son orientativos y se han elegido opciones donde es viable comer por unos 10–20 € por persona.</p></div>
        <div className="foodTabs"><button className={foodTab==="comer"?"active":""} onClick={()=>setFoodTab("comer")}><Utensils size={16}/> Comer · 4,5+</button><button className={foodTab==="cerveza"?"active":""} onClick={()=>setFoodTab("cerveza")}><Beer size={16}/> Cervezas curiosas</button><button className={foodTab==="cafe"?"active":""} onClick={()=>setFoodTab("cafe")}><Coffee size={16}/> Café de especialidad</button></div>

        {foodTab==="comer" && <div className="foodGrid">{food.map(x=><article className="foodCard" key={x.name}><div className="rank">#{x.rank}</div><div className="foodRating">★ {x.rating}</div><h3>{x.name}</h3><p className="foodPrice"><CircleDollarSign size={14}/>{x.price}</p><p>{x.why}</p><span className="address">{x.address}</span><a href={mapsSearch(x.maps)} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={14}/></a></article>)}</div>}
        {foodTab==="cerveza" && <div className="foodGrid">{beer.map((x,i)=><article className="foodCard beerCard" key={x.name}><div className="rank">#{i+1}</div><div className="foodRating">★ {x.rating}</div><h3>{x.name}</h3><p>{x.why}</p><span className="address">{x.address}</span><a href={mapsSearch(x.maps)} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={14}/></a></article>)}</div>}
        {foodTab==="cafe" && <div className="foodGrid">{coffee.map((x,i)=><article className="foodCard coffeeCard" key={x.name}><div className="rank">#{i+1}</div><div className="foodRating">★ {x.rating}</div><h3>{x.name}</h3><p>{x.why}</p><span className="address">{x.address}</span><a href={mapsSearch(x.maps)} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={14}/></a></article>)}</div>}
      </section>

      <section id="audio" className="audioSection"><div className="audioIcon"><AudioLines size={28}/></div><div><span className="sectionNo">07 / AUDIOGUÍA</span><h2>Escucha la historia mientras caminas.</h2><p>La web usa Speech Synthesis del navegador. Selecciona una parada y pulsa «Escuchar» para convertir la ficha en una pequeña audioguía.</p></div><button className="button primary" onClick={toggleAudio}>{playing?<Pause size={17}/>:<Play size={17}/>} {playing?"Parar":`Escuchar: ${selectedStop.title}`}</button></section>

      <section className="sourcesSection"><div><span className="sectionNo">08 / FUENTES Y ACTUALIZACIÓN</span><h2>Una guía que distingue historia de información práctica.</h2></div><div className="sourceList"><a href="https://haagsgemeentearchief.nl/ontdek-de-stad/verhalen-van-de-stad/het-ontstaan-van-den-haag" target="_blank" rel="noreferrer">Haags Gemeentearchief · origen y escudo <ExternalLink size={14}/></a><a href="https://haagshistorischmuseum.nl/collectie/topstukken/plattegrond-van-den-haag-in-1570/" target="_blank" rel="noreferrer">Haags Historisch Museum · mapa de 1570 <ExternalLink size={14}/></a><a href="https://www.royal-house.nl/topics/palaces" target="_blank" rel="noreferrer">Royal House · palacios y residencia real <ExternalLink size={14}/></a><a href="https://www.vredespaleis.nl/visit/visitors-centre-2/?lang=en" target="_blank" rel="noreferrer">Peace Palace · visita y audioguía <ExternalLink size={14}/></a></div></section>
    </main>
    <footer><div><strong>LA HAYA · DEN HAAG</strong><br/><span>Guía histórica · actualizada para octubre de 2026</span></div><div>Camina despacio. Mira hacia arriba. Y deja que la ciudad cuente el resto.</div></footer>
  </div>;
}

export default App;
