'use strict';

// Real/expected 2026 World Cup squads (as of May 2026)
// 3 GK, 8 DEF, 6 MID, 5 FWD = 22 players + badge + squad photo = 24 stickers per team
// Plus 10 intro stickers = 1162 total

const TEAM_SQUADS = {
  // ── GROUP A ───────────────────────────────────────────────
  USA: {
    name:'United States', group:'A', flag:'🇺🇸',
    gk:['Matt Turner','Patrick Schulte','Ethan Horvath'],
    def:['Sergiño Dest','Joe Scally','Tim Ream','Chris Richards','Antonee Robinson','Miles Robinson','Walker Zimmermann','DeJuan Jones'],
    mid:['Weston McKennie','Tyler Adams','Yunus Musah','Luca de la Torre','Gio Reyna','Malik Tillman'],
    fwd:['Christian Pulisic','Folarin Balogun','Ricardo Pepi','Josh Sargent','Timothy Weah'],
  },
  MEX: {
    name:'Mexico', group:'A', flag:'🇲🇽',
    gk:['Guillermo Ochoa','Luis Malagón','Rodolfo Cota'],
    def:['Jorge Sánchez','Jesús Gallardo','César Montes','Johan Vásquez','Edson Álvarez','Gerardo Arteaga','Néstor Araujo','Kevin Álvarez'],
    mid:['Héctor Herrera','Carlos Rodríguez','Orbelín Pineda','Luis Chávez','Roberto Alvarado','Érick Gutiérrez'],
    fwd:['Hirving Lozano','Henry Martín','Raúl Jiménez','Alexis Vega','Santiago Giménez'],
  },
  CAN: {
    name:'Canada', group:'A', flag:'🇨🇦',
    gk:['Milan Borjan','Dayne St. Clair','James Pantemis'],
    def:['Richie Laryea','Alistair Johnston','Steven Vitória','Kamal Miller','Sam Adekugbe','Derek Cornelius','Doneil Henry','Liam Fraser'],
    mid:['Atiba Hutchinson','Stephen Eustáquio','Jonathan Osorio','Mark-Anthony Kaye','Ismael Koné','David Wotherspoon'],
    fwd:['Alphonso Davies','Jonathan David','Cyle Larin','Tajon Buchanan','Lucas Cavallini'],
  },
  URU: {
    name:'Uruguay', group:'A', flag:'🇺🇾',
    gk:['Sergio Rochet','Fernando Muslera','Santiago Mele'],
    def:['Nahitan Nández','José María Giménez','Diego Godín','Martín Cáceres','Mathías Olivera','Ronald Araújo','Sebastián Coates','Matías Viña'],
    mid:['Federico Valverde','Rodrigo Bentancur','Manuel Ugarte','Matías Vecino','Nicolás De La Cruz','Facundo Pellistri'],
    fwd:['Darwin Núñez','Luis Suárez','Edinson Cavani','Maximiliano Gómez','Facundo Torres'],
  },
  // ── GROUP B ───────────────────────────────────────────────
  ARG: {
    name:'Argentina', group:'B', flag:'🇦🇷',
    gk:['Emiliano Martínez','Geronimo Rulli','Franco Armani'],
    def:['Nahuel Molina','Nicolás Otamendi','Cristian Romero','Marcos Acuña','Lisandro Martínez','Germán Pezzella','Gonzalo Montiel','Nicolás Tagliafico'],
    mid:['Rodrigo De Paul','Leandro Paredes','Enzo Fernández','Alexis Mac Allister','Giovanni Lo Celso','Exequiel Palacios'],
    fwd:['Lionel Messi','Julián Álvarez','Lautaro Martínez','Ángel Di María','Paulo Dybala'],
  },
  CHI: {
    name:'Chile', group:'B', flag:'🇨🇱',
    gk:['Claudio Bravo','Gabriel Arias','Christofer Toselli'],
    def:['Mauricio Isla','Gary Medel','Francisco Sierralta','Guillermo Maripán','Eugenio Mena','Paulo Díaz','Benjamín Kuscevic','Sebastián Vegas'],
    mid:['Arturo Vidal','Charles Aránguiz','Erick Pulgar','Rodrigo Echeverría','Marcelino Núñez','Diego Valdés'],
    fwd:['Alexis Sánchez','Ben Brereton Díaz','Eduardo Vargas','Víctor Dávila','Darío Osorio'],
  },
  PER: {
    name:'Peru', group:'B', flag:'🇵🇪',
    gk:['Pedro Gallese','Carlos Cáceda','Ángelo Campos'],
    def:['Luis Advíncula','Alexander Callens','Carlos Zambrano','Miguel Araujo','Marcos López','Anderson Santamaría','Aldo Corzo','Oliver Sonne'],
    mid:['Renato Tapia','Yoshimar Yotún','Wilder Cartagena','Christian Cueva','Piero Quispe','Horacio Calcaterra'],
    fwd:['Gianluca Lapadula','Edison Flores','Alex Valera','André Carrillo','Paolo Guerrero'],
  },
  ECU: {
    name:'Ecuador', group:'B', flag:'🇪🇨',
    gk:['Hernán Galíndez','Alexander Domínguez','Moisés Ramírez'],
    def:['Angelo Preciado','Piero Hincapié','Robert Arboleda','Felix Torres','Pervis Estupiñán','Xavier Arreaga','Diego Palacios','Byron Castillo'],
    mid:['Moisés Caicedo','Carlos Gruezo','Jhegson Méndez','Ángel Mena','Jeremy Sarmiento','Gonzalo Plata'],
    fwd:['Enner Valencia','Michael Estrada','Leonardo Campana','Jordy Caicedo','Djorkaeff Reasco'],
  },
  // ── GROUP C ───────────────────────────────────────────────
  BRA: {
    name:'Brazil', group:'C', flag:'🇧🇷',
    gk:['Alisson','Ederson','Weverton'],
    def:['Danilo','Éder Militão','Marquinhos','Thiago Silva','Alex Sandro','Bremer','Guilherme Arana','Renan Lodi'],
    mid:['Casemiro','Lucas Paquetá','Bruno Guimarães','Gerson','Richarlison','Raphinha'],
    fwd:['Vinícius Jr.','Neymar','Gabriel Jesus','Rodrygo','Pedro'],
  },
  COL: {
    name:'Colombia', group:'C', flag:'🇨🇴',
    gk:['David Ospina','Camilo Vargas','Álvaro Montero'],
    def:['Daniel Muñoz','Davinson Sánchez','Yerry Mina','William Tesillo','Johan Mojica','Stefan Medina','Jhon Lucumí','Carlos Cuesta'],
    mid:['James Rodríguez','Wilmar Barrios','Mateus Uribe','Juan Cuadrado','Sebastián Villareal','Richard Ríos'],
    fwd:['Luis Díaz','Rafael Santos Borré','Radamel Falcao','Cucho Hernández','Jhon Córdoba'],
  },
  VEN: {
    name:'Venezuela', group:'C', flag:'🇻🇪',
    gk:['Wuilker Faríñez','Rafael Romo','Adrián Nazaret'],
    def:['Ronald Hernández','Mikel Villanueva','Yordan Osorio','Jhon Chancellor','Freddy Vestia','Alexander González','Rolf Feltscher','Miguel Navarro'],
    mid:['Tomás Rincón','Jefferson Savarino','Yangel Herrera','Sergio Córdova','Júnior Moreno','Yeferson Soteldo'],
    fwd:['Salomón Rondón','Josef Martínez','Darwin Machís','Jhonder Cádiz','Eric Ramírez'],
  },
  BOL: {
    name:'Bolivia', group:'C', flag:'🇧🇴',
    gk:['Carlos Lampe','Rubén Cordano','Guillermo Viscarra'],
    def:['Luis Haquin','José María Carrasco','Adrián Jusino','Jesús Sagredo','Erwin Saavedra','Diego Wayar','Roberto Carlos Fernández','Pablo Vaca'],
    mid:['Ramiro Vaca','Leonel Justiniano','Jeyson Chura','Fernando Saucedo','Henry Vaca','Víctor Ábrego'],
    fwd:['Marcelo Martins','Rodrigo Ramallo','Bruno Miranda','Juan Carlos Arce','Carmelo Algarañaz'],
  },
  // ── GROUP D ───────────────────────────────────────────────
  FRA: {
    name:'France', group:'D', flag:'🇫🇷',
    gk:['Hugo Lloris','Mike Maignan','Alphonse Areola'],
    def:['Benjamin Pavard','Raphaël Varane','Dayot Upamecano','Lucas Hernandez','Theo Hernandez','Jules Koundé','William Saliba','Ibrahima Konaté'],
    mid:['N\'Golo Kanté','Aurélien Tchouaméni','Adrien Rabiot','Eduardo Camavinga','Matteo Guendouzi','Youssouf Fofana'],
    fwd:['Kylian Mbappé','Antoine Griezmann','Olivier Giroud','Ousmane Dembélé','Marcus Thuram'],
  },
  ENG: {
    name:'England', group:'D', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    gk:['Jordan Pickford','Aaron Ramsdale','Dean Henderson'],
    def:['Reece James','Harry Maguire','John Stones','Luke Shaw','Kyle Walker','Trent Alexander-Arnold','Marc Guehi','Ben White'],
    mid:['Declan Rice','Jude Bellingham','Jordan Henderson','Kalvin Phillips','Conor Gallagher','Phil Foden'],
    fwd:['Harry Kane','Marcus Rashford','Raheem Sterling','Bukayo Saka','Jack Grealish'],
  },
  GER: {
    name:'Germany', group:'D', flag:'🇩🇪',
    gk:['Manuel Neuer','Marc-André ter Stegen','Bernd Leno'],
    def:['Joshua Kimmich','Antonio Rüdiger','Matthias Ginter','David Raum','Thilo Kehrer','Nico Schlotterbeck','Benjamin Henrichs','Robin Gosens'],
    mid:['Leon Goretzka','İlkay Gündoğan','Toni Kroos','Jamal Musiala','Leroy Sané','Florian Wirtz'],
    fwd:['Thomas Müller','Kai Havertz','Serge Gnabry','Niclas Füllkrug','Karim Adeyemi'],
  },
  SUI: {
    name:'Switzerland', group:'D', flag:'🇨🇭',
    gk:['Yann Sommer','Jonas Omlin','Gregor Kobel'],
    def:['Silvan Widmer','Manuel Akanji','Fabian Schär','Ricardo Rodriguez','Kevin Mbabu','Nico Elvedi','Eray Cömert','Ulisses Garcia'],
    mid:['Granit Xhaka','Remo Freuler','Denis Zakaria','Xherdan Shaqiri','Michel Aebischer','Ruben Vargas'],
    fwd:['Breel Embolo','Haris Seferovic','Noah Okafor','Zeki Amdouni','Dan Ndoye'],
  },
  // ── GROUP E ───────────────────────────────────────────────
  ESP: {
    name:'Spain', group:'E', flag:'🇪🇸',
    gk:['Unai Simón','David Raya','Robert Sánchez'],
    def:['Dani Carvajal','Aymeric Laporte','Pau Torres','Jordi Alba','César Azpilicueta','Robin Le Normand','Alejandro Balde','Nacho Fernández'],
    mid:['Pedri','Gavi','Sergio Busquets','Rodri','Fabián Ruiz','Marcos Llorente'],
    fwd:['Álvaro Morata','Ferran Torres','Marco Asensio','Lamine Yamal','Nico Williams'],
  },
  POR: {
    name:'Portugal', group:'E', flag:'🇵🇹',
    gk:['Rui Patrício','Diogo Costa','José Sá'],
    def:['João Cancelo','Rúben Dias','Pepe','Nuno Mendes','Danilo Pereira','Diogo Dalot','António Silva','Gonçalo Inácio'],
    mid:['Bruno Fernandes','João Moutinho','Bernardo Silva','Vitinha','Matheus Nunes','Rúben Neves'],
    fwd:['Cristiano Ronaldo','Diogo Jota','Gonçalo Ramos','Rafael Leão','João Félix'],
  },
  CRO: {
    name:'Croatia', group:'E', flag:'🇭🇷',
    gk:['Dominik Livaković','Ivo Grbić','Ivica Ivušić'],
    def:['Josip Juranović','Dejan Lovren','Domagoj Vida','Borna Sosa','Joško Gvardiol','Josip Šutalo','Martin Erlić','Borna Barišić'],
    mid:['Luka Modrić','Ivan Perišić','Marcelo Brozović','Mateo Kovačić','Mario Pašalić','Nikola Vlašić'],
    fwd:['Andrej Kramarić','Bruno Petković','Marko Livaja','Ivan Bukić','Antonio Čolak'],
  },
  ALB: {
    name:'Albania', group:'E', flag:'🇦🇱',
    gk:['Thomas Strakosha','Etrit Berisha','Elhan Kastrati'],
    def:['Berat Djimsiti','Marash Kumbulla','Elseid Hysaj','Ardian Ismajli','Ervin Zulli','Naser Aliji','Enea Mihaj','Frederic Veseli'],
    mid:['Klaus Gjasula','Qazim Laçi','Ylber Ramadani','Kristjan Asllani','Sokol Çikalleshi','Nedim Bajrami'],
    fwd:['Armando Broja','Myrto Uzuni','Keidi Bare','Taulant Xhaka','Mirlind Daku'],
  },
  // ── GROUP F ───────────────────────────────────────────────
  NED: {
    name:'Netherlands', group:'F', flag:'🇳🇱',
    gk:['Jasper Cillessen','Remko Pasveer','Mark Flekken'],
    def:['Denzel Dumfries','Virgil van Dijk','Stefan de Vrij','Daley Blind','Jurrien Timber','Matthijs de Ligt','Nathan Aké','Tyrell Malacia'],
    mid:['Frenkie de Jong','Georginio Wijnaldum','Davy Klaassen','Teun Koopmeiners','Tijjani Reijnders','Xavi Simons'],
    fwd:['Memphis Depay','Steven Bergwijn','Donyell Malen','Cody Gakpo','Wout Weghorst'],
  },
  BEL: {
    name:'Belgium', group:'F', flag:'🇧🇪',
    gk:['Thibaut Courtois','Simon Mignolet','Matz Sels'],
    def:['Thomas Meunier','Toby Alderweireld','Jan Vertonghen','Yannick Carrasco','Timothy Castagne','Wout Faes','Arthur Theate','Zeno Debast'],
    mid:['Kevin De Bruyne','Axel Witsel','Youri Tielemans','Leandro Trossard','Amadou Onana','Charles De Ketelaere'],
    fwd:['Romelu Lukaku','Eden Hazard','Dries Mertens','Lois Openda','Johan Bakayoko'],
  },
  DEN: {
    name:'Denmark', group:'F', flag:'🇩🇰',
    gk:['Kasper Schmeichel','Oliver Christensen','Frederik Rønnow'],
    def:['Daniel Wass','Andreas Christensen','Simon Kjær','Joakim Mæhle','Alexander Bah','Victor Nelsson','Joachim Andersen','Lars Knudsen'],
    mid:['Christian Eriksen','Pierre-Emile Højbjerg','Thomas Delaney','Mathias Jensen','Rasmus Kristensen','Morten Hjulmand'],
    fwd:['Rasmus Højlund','Martin Braithwaite','Kasper Dolberg','Andreas Skov Olsen','Mikkel Damsgaard'],
  },
  AUT: {
    name:'Austria', group:'F', flag:'🇦🇹',
    gk:['Daniel Bachmann','Heinz Lindner','Patrick Pentz'],
    def:['Stefan Lainer','David Alaba','Aleksandar Dragović','Philipp Mwene','Phillipp Lienhart','Marco Friedl','Stefan Posch','Maximilian Wöber'],
    mid:['Florian Grillitsch','Konrad Laimer','Marcel Sabitzer','Nicolas Seiwald','Xaver Schlager','Christoph Baumgartner'],
    fwd:['Marko Arnautovic','Michael Gregoritsch','Sasa Kalajdzic','Patrick Wimmer','Romano Schmid'],
  },
  // ── GROUP G ───────────────────────────────────────────────
  ITA: {
    name:'Italy', group:'G', flag:'🇮🇹',
    gk:['Gianluigi Donnarumma','Alex Meret','Guglielmo Vicario'],
    def:['Giovanni Di Lorenzo','Leonardo Bonucci','Giorgio Chiellini','Leonardo Spinazzola','Alessandro Bastoni','Francesco Acerbi','Matteo Darmian','Federico Dimarco'],
    mid:['Jorginho','Marco Verratti','Nicolo Barella','Sandro Tonali','Davide Frattesi','Lorenzo Pellegrini'],
    fwd:['Ciro Immobile','Federico Chiesa','Lorenzo Insigne','Giacomo Raspadori','Mateo Retegui'],
  },
  TUR: {
    name:'Turkey', group:'G', flag:'🇹🇷',
    gk:['Mert Günok','Uğurcan Çakır','Altay Bayındır'],
    def:['Zeki Çelik','Merih Demiral','Samet Akaydin','Ferdi Kadıoğlu','Mert Müldür','Çağlar Söyüncü','Ridvan Yilmaz','Abdülkerim Bardakçı'],
    mid:['Hakan Çalhanoğlu','Salih Özcan','İsmail Yüksek','Kaan Ayhan','Arda Güler','Barış Alper Yılmaz'],
    fwd:['Burak Yılmaz','Cenk Tosun','Kenan Yıldız','Yusuf Yazıcı','Baris Yilmaz'],
  },
  UKR: {
    name:'Ukraine', group:'G', flag:'🇺🇦',
    gk:['Andriy Lunin','Heorhiy Bushchan','Anatoliy Trubin'],
    def:['Oleksandr Karavayev','Mykola Matviyenko','Taras Stepanenko','Vitaly Mykolenko','Ilya Zabarnyi','Vitaliy Buyalskyi','Eduard Sobol','Oleksandr Tymchyk'],
    mid:['Ruslan Malinovskyi','Oleksandr Zinchenko','Mykhailo Mudryk','Georgiy Sudakov','Viktor Tsygankov','Artem Dovbyk'],
    fwd:['Roman Yaremchuk','Oleksandr Zubkov','Vladyslav Supriaha','Danylo Sikan','Heorhiy Tsitaishvili'],
  },
  CZE: {
    name:'Czech Republic', group:'G', flag:'🇨🇿',
    gk:['Jiří Staněk','Tomáš Vaclík','Jindřich Staněk'],
    def:['Vladimir Coufal','Ondrej Celustka','Jakub Brabec','Jan Boril','Tomáš Kalas','David Zima','Ladislav Krejci','Lukáš Masopust'],
    mid:['Tomáš Souček','Alex Král','Vladimír Darida','Lukáš Provod','Antonín Barák','Matěj Jurásek'],
    fwd:['Patrik Schick','Adam Hložek','Ondrej Lingr','Jan Kuchta','Tomáš Chorý'],
  },
  // ── GROUP H ───────────────────────────────────────────────
  POL: {
    name:'Poland', group:'H', flag:'🇵🇱',
    gk:['Wojciech Szczęsny','Łukasz Fabiański','Bartłomiej Drągowski'],
    def:['Matty Cash','Kamil Glik','Jan Bednarek','Arkadiusz Reca','Bartosz Bereszyński','Jakub Kiwior','Robert Gumny','Nicola Zalewski'],
    mid:['Grzegorz Krychowiak','Mateusz Klich','Piotr Zieliński','Jakub Moder','Sebastian Szymański','Damian Szymański'],
    fwd:['Robert Lewandowski','Arkadiusz Milik','Krzysztof Piątek','Karol Świderski','Kamil Grosicki'],
  },
  ROU: {
    name:'Romania', group:'H', flag:'🇷🇴',
    gk:['Florin Niță','Horațiu Moldovan','Ștefan Târnovanu'],
    def:['Andrei Rațiu','Radu Drăgușin','Bogdan Racovițan','Nicușor Bancu','Adrian Rus','Ionuț Nedelcearu','Cristian Manea','Virgil Ghiță'],
    mid:['Nicolae Stanciu','Răzvan Marin','Marius Marin','Florinel Coman','Deian Sorescu','Adrian Șut'],
    fwd:['George Pușcaș','Denis Drăguș','Denis Alibec','Valentin Mihăilă','Octavian Popescu'],
  },
  SVK: {
    name:'Slovakia', group:'H', flag:'🇸🇰',
    gk:['Martin Dúbravka','Marek Rodák','Adrián Chovan'],
    def:['Peter Pekarík','Milan Škriniar','Denis Vavro','Tomáš Hubočan','Norbert Gyömbér','Ľubomír Šatka','Martin Valjent','Dávid Hancko'],
    mid:['Marek Hamšík','Juraj Kucka','Stanislav Lobotka','Ondrej Duda','Lukáš Haraslín','Robert Mak'],
    fwd:['Robert Boženík','Ivan Schranz','Dávid Strelec','Tomáš Suslov','Róbert Polievka'],
  },
  SRB: {
    name:'Serbia', group:'H', flag:'🇷🇸',
    gk:['Vanja Milinković-Savić','Predrag Rajković','Marko Dmitrović'],
    def:['Nikola Milenkovic','Strahinja Pavlovic','Stefan Mitrovic','Aleksa Terzic','Filip Mladenovic','Milos Veljkovic','Srdjan Babic','Strahinja Erakovic'],
    mid:['Sergej Milinkovic-Savic','Nemanja Maksimovic','Nemanja Gudelj','Saša Lukić','Filip Kostic','Ivan Ilic'],
    fwd:['Aleksandar Mitrovic','Dušan Vlahovic','Luka Jovic','Filip Đuricic','Andrija Zivkovic'],
  },
  // ── GROUP I ───────────────────────────────────────────────
  SEN: {
    name:'Senegal', group:'I', flag:'🇸🇳',
    gk:['Édouard Mendy','Alfred Gomis','Seny Dieng'],
    def:['Bouna Sarr','Kalidou Koulibaly','Abdou Diallo','Saliou Ciss','Fodé Ballo-Touré','Ibrahima Mbaye','Formose Mendy','Pape Abou Cissé'],
    mid:['Idrissa Gueye','Cheikhou Kouyaté','Nampalys Mendy','Pape Gueye','Pape Matar Sarr','Lamine Camara'],
    fwd:['Sadio Mané','Ismaïla Sarr','Boulaye Dia','Habib Diallo','Nicolas Jackson'],
  },
  MAR: {
    name:'Morocco', group:'I', flag:'🇲🇦',
    gk:['Yassine Bounou','Ahmed Reda Tagnaouti','Munir Mohamedi'],
    def:['Achraf Hakimi','Romain Saiss','Nayef Aguerd','Noussair Mazraoui','Yahia Attiyat Allah','Jawad El Yamiq','Badr Benoun','Adam Masina'],
    mid:['Azzedine Ounahi','Sofyan Amrabat','Selim Amallah','Bilal El Khannouss','Ilias Chair','Abde Ezzalzouli'],
    fwd:['Youssef En-Nesyri','Hakim Ziyech','Sofiane Boufal','Zakaria Aboukhlal','Anass Zaroury'],
  },
  EGY: {
    name:'Egypt', group:'I', flag:'🇪🇬',
    gk:['Mohamed El-Shenawy','Mohamed Sobhi','Mohamed Abu-Gabal'],
    def:['Ahmed Hegazi','Omar Kamal','Mahmoud Hamdy','Mohamed Abdel-Moneim','Ayman Ashraf','Ali Gabr','Ahmed Fatouh','Akram Tawfik'],
    mid:['Tarek Hamed','Amr El Solia','Hamdi Fathi','Mohamed Elneny','Emam Ashour','Ahmed Sayed Zizo'],
    fwd:['Mohamed Salah','Omar Marmoush','Mostafa Mohamed','Trezeguet','Mohamed Sherif'],
  },
  TUN: {
    name:'Tunisia', group:'I', flag:'🇹🇳',
    gk:['Aymen Dahmen','Bechir Ben Said','Mouez Hassen'],
    def:['Ali Maaloul','Yassine Meriah','Dylan Bronn','Montassar Talbi','Mohamed Dräger','Wajdi Kechrida','Nader Ghandri','Bilel Ifa'],
    mid:['Anis Ben Slimane','Ellyes Skhiri','Hamza Mathlouthi','Hannibal Mejbri','Ferjani Sassi','Mohamed Ben Romdhane'],
    fwd:['Wahbi Khazri','Youssef Msakni','Seifeddine Jaziri','Naim Sliti','Taha Yassine Khenissi'],
  },
  // ── GROUP J ───────────────────────────────────────────────
  NGA: {
    name:'Nigeria', group:'J', flag:'🇳🇬',
    gk:['Francis Uzoho','Maduka Okoye','John Noble'],
    def:['Ola Aina','William Troost-Ekong','Leon Balogun','Zaidu Sanusi','Semi Ajayi','Chidozie Awaziem','Calvin Bassey','Bright Osayi-Samuel'],
    mid:['Wilfred Ndidi','Alex Iwobi','Joe Aribo','Frank Onyeka','Fisayo Dele-Bashiru','Raphael Onyedika'],
    fwd:['Victor Osimhen','Kelechi Iheanacho','Samuel Chukwueze','Emmanuel Dennis','Taiwo Awoniyi'],
  },
  CMR: {
    name:'Cameroon', group:'J', flag:'🇨🇲',
    gk:['André Onana','Devis Epassy','Simon Ngapandouetnbu'],
    def:['Collins Fai','Michaël Ngadeu-Ngadjui','Jean-Charles Castelletto','Nouhou Tolo','Harold Moukoudi','Christopher Wooh','Enzo Tchato','Georges Mandjeck'],
    mid:['André-Frank Zambo Anguissa','Pierre Kunde','Martin Hongla','Samuel Gouet','Olivier Ntcham','Gaël Ondoua'],
    fwd:['Vincent Aboubakar','Karl Toko Ekambi','Stéphane Bahoken','Bryan Mbeumo','Ignatius Ganago'],
  },
  CIV: {
    name:"Côte d'Ivoire", group:'J', flag:'🇨🇮',
    gk:['Yahia Fofana','Badra Ali Sangaré','Sylvain Gbohouo'],
    def:['Serge Aurier','Wilfried Singo','Eric Bailly','Simon Deli','Ghislain Konan','Odilon Kossounou','Wonlo Coulibaly','Issiaka Ouédraogo'],
    mid:['Franck Kessié','Jean Michaël Seri','Ibrahim Sangaré','Soualiho Meité','Seko Fofana','Cheick Tioté'],
    fwd:['Sébastien Haller','Nicolas Pépé','Wilfried Zaha','Jonathan Kodjia','Simon Adingra'],
  },
  MLI: {
    name:'Mali', group:'J', flag:'🇲🇱',
    gk:['Djigui Diarra','Ibrahim Mounkoro','Boubacar Kouyaté'],
    def:['Hamari Traoré','Molla Wagué','Ousmane Coulibaly','Falaye Sacko','Boubacar Kouyaté','Ibrahim Coulibaly','Mamadou Fofana','Sékou Koïta'],
    mid:['Adama Traoré','Diadie Samassekou','Mohamed Camara','Aliou Dieng','Lassana Coulibaly','Moussa Doumbia'],
    fwd:['Moussa Marega','El Bilal Touré','Ibrahima Koné','Kamory Doumbia','Amadou Haidara'],
  },
  // ── GROUP K ───────────────────────────────────────────────
  JPN: {
    name:'Japan', group:'K', flag:'🇯🇵',
    gk:['Shuichi Gonda','Daniel Schmidt','Zion Suzuki'],
    def:['Hiroki Sakai','Maya Yoshida','Ko Itakura','Yuto Nagatomo','Shogo Taniguchi','Miki Yamane','Ryusei Saito','Junya Ito'],
    mid:['Hidemasa Morita','Wataru Endo','Ritsu Doan','Daichi Kamada','Takuma Asano','Ao Tanaka'],
    fwd:['Takumi Minamino','Ayase Ueda','Kaoru Mitoma','Shuto Machino','Keito Nakamura'],
  },
  KOR: {
    name:'South Korea', group:'K', flag:'🇰🇷',
    gk:['Kim Seung-gyu','Jo Hyeon-woo','Song Bum-keun'],
    def:['Kim Moon-hwan','Kim Min-jae','Jung Seung-hyun','Kim Jin-su','Lee Ki-je','Park Yong-woo','Lee Jae-sung','Kwon Kyung-won'],
    mid:['Hwang In-beom','Lee Kang-in','Son Jun-ho','Jung Woo-young','Paik Seung-ho','Kim Ju-sung'],
    fwd:['Son Heung-min','Hwang Hee-chan','Cho Gue-sung','Oh Hyeon-gyu','Hwang Ui-jo'],
  },
  IRN: {
    name:'Iran', group:'K', flag:'🇮🇷',
    gk:['Alireza Beiranvand','Hossein Hosseini','Payam Niazmand'],
    def:['Shoja Khalilzadeh','Morteza Pouraliganji','Majid Hosseini','Ehsan Hajsafi','Sadegh Moharrami','Ramin Rezaeian','Mohammad Hosseini','Milad Mohammadi'],
    mid:['Alireza Jahanbakhsh','Saeid Ezatolahi','Ali Gholizadeh','Ahmad Nourollahi','Mehdi Torabi','Saman Ghoddos'],
    fwd:['Sardar Azmoun','Mehdi Taremi','Karim Ansarifard','Allahyar Sayyadmanesh','Ali Karimi'],
  },
  UZB: {
    name:'Uzbekistan', group:'K', flag:'🇺🇿',
    gk:['Utkir Yusupov','Eldor Shomurodov','Otabek Shukurov'],
    def:['Husayn Norchaev','Sanjar Tursunov','Khojiakbar Alijonov','Sherzod Nasrullayev','Islom Tukhtahujaev','Akbar Tursunmurodov','Dilshod Yusupov','Jasur Yakhshiboyev'],
    mid:['Jaloliddin Masharipov','Bobur Abdikholiqov','Otabek Shukurov','Dostonbek Khamdamov','Abbosjon Muhammadjonov','Eldor Shomurodov'],
    fwd:['Sardor Rashidov','Umid Hasanov','Ilkhom Hamroyev','Muhammadqodir Hamroyev','Javokhir Sidiqov'],
  },
  // ── GROUP L ───────────────────────────────────────────────
  AUS: {
    name:'Australia', group:'L', flag:'🇦🇺',
    gk:['Mathew Ryan','Danny Vukovic','Joe Gauci'],
    def:['Nathaniel Atkinson','Harry Souttar','Kye Rowles','Milos Degenek','Aziz Behich','Fran Karacic','Joel King','James Jeggo'],
    mid:['Aaron Mooy','Jackson Irvine','Riley McGree','Bailey Wright','Ajdin Hrustic','Cameron Devlin'],
    fwd:['Mathew Leckie','Mitchell Duke','Jamie Maclaren','Marco Tilio','Craig Goodwin'],
  },
  NZL: {
    name:'New Zealand', group:'L', flag:'🇳🇿',
    gk:['Stefan Marinovic','Max Crocombe','Michael Woud'],
    def:['Winston Reid','Bill Tuiloma','Michael Boxall','Liberato Cacace','Nando Pijnaker','Alex Greive','Louis Fenton','Callan Elliot'],
    mid:['Ryan Thomas','Clayton Lewis','Joe Bell','Elijah Just','Marko Stamenic','Callum McCowatt'],
    fwd:['Chris Wood','Wynton Rufer','Matthew Garbett','Dane Ingham','Ben Old'],
  },
  SAU: {
    name:'Saudi Arabia', group:'L', flag:'🇸🇦',
    gk:['Mohammed Al-Owais','Mohammed Al-Rubaie','Nawaf Al-Aqidi'],
    def:['Sultan Al-Ghannam','Ali Al-Bulayhi','Abdulelah Al-Amri','Hassan Al-Tambakti','Saud Abdulhamid','Yahya Al-Ghamdi','Abdullah Madu','Nawaf Al-Abed'],
    mid:['Salem Al-Dawsari','Abdulellah Al-Malki','Riyadh Sharahili','Mohamed Kanno','Sami Al-Najei','Ali Al-Hassan'],
    fwd:['Saleh Al-Shehri','Firas Al-Buraikan','Abdullah Al-Hamdan','Hattan Bahebri','Musab Al-Juwayr'],
  },
  QAT: {
    name:'Qatar', group:'L', flag:'🇶🇦',
    gk:['Meshaal Barsham','Yousef Hassan','Mohammed Al Bakri'],
    def:['Pedro Miguel','Bassam Al-Rawi','Khoukhi Boualem','Homam Ahmed','Musab Kheder','Abdelkarim Hassan','Tarek Salman','Omar Abdulrahman'],
    mid:['Karim Boudiaf','Abdulaziz Hatem','Assim Madibo','Mohammed Waad','Akram Afif','Hassan Al-Haydos'],
    fwd:['Almoez Ali','Ismaeel Mohammad','Khalid Muneer','Ahmed Alaaeldin','Yusuf Abdurisag'],
  },
};

const INTRO_STICKERS = [
  {name:'Official Tournament Logo', type:'foil'},
  {name:'FIFA World Cup Trophy',    type:'foil'},
  {name:'Host Nations Map',         type:'normal'},
  {name:'Estadio Azteca',           type:'normal'},
  {name:'SoFi Stadium',             type:'normal'},
  {name:'MetLife Stadium',          type:'normal'},
  {name:'AT&T Stadium',             type:'normal'},
  {name:'BC Place Stadium',         type:'normal'},
  {name:"Mexico City's Azteca",     type:'normal'},
  {name:'Opening Ceremony',         type:'foil'},
];

function buildStickers() {
  const stickers = [];
  let num = 1;

  // Intro stickers
  for (const item of INTRO_STICKERS) {
    stickers.push({
      number: num++, team:'INTRO', teamName:'World Cup 2026',
      group:'intro', player: item.name, type: item.type, foil: item.type==='foil'
    });
  }

  // Team stickers: badge (foil) + squad photo + GKs + DEFs + MIDs + FWDs = 22 players + 2 = 24 per team
  for (const [code, t] of Object.entries(TEAM_SQUADS)) {
    // 1. Foil badge
    stickers.push({ number:num++, team:code, teamName:t.name, group:t.group, player:`${t.name} Badge`, type:'foil', foil:true });
    // 2. Squad photo
    stickers.push({ number:num++, team:code, teamName:t.name, group:t.group, player:`${t.name} Squad`, type:'squad', foil:false });
    // Players
    const players = [...t.gk, ...t.def, ...t.mid, ...t.fwd];
    for (const p of players) {
      stickers.push({ number:num++, team:code, teamName:t.name, group:t.group, player:p, type:'player', foil:false });
    }
  }

  return stickers;
}

const TEAMS = Object.entries(TEAM_SQUADS).map(([code, t]) => ({
  code, name: t.name, group: t.group, flag: t.flag
}));

module.exports = { TEAMS, buildStickers };
