const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const fs = require('fs')

const dataDir = path.join(__dirname, '..', 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const adapter = new FileSync(path.join(dataDir, 'wc2026.json'))
const db = low(adapter)
db.defaults({ stickers: [], users: [], collection: [] }).write()

const TEAMS = [
  {code:'USA',name:'United States',group:'A'},{code:'MEX',name:'Mexico',group:'A'},{code:'CAN',name:'Canada',group:'A'},{code:'URU',name:'Uruguay',group:'A'},
  {code:'ARG',name:'Argentina',group:'B'},{code:'CHI',name:'Chile',group:'B'},{code:'PER',name:'Peru',group:'B'},{code:'ECU',name:'Ecuador',group:'B'},
  {code:'BRA',name:'Brazil',group:'C'},{code:'COL',name:'Colombia',group:'C'},{code:'VEN',name:'Venezuela',group:'C'},{code:'BOL',name:'Bolivia',group:'C'},
  {code:'FRA',name:'France',group:'D'},{code:'ENG',name:'England',group:'D'},{code:'GER',name:'Germany',group:'D'},{code:'SUI',name:'Switzerland',group:'D'},
  {code:'ESP',name:'Spain',group:'E'},{code:'POR',name:'Portugal',group:'E'},{code:'CRO',name:'Croatia',group:'E'},{code:'ALB',name:'Albania',group:'E'},
  {code:'NED',name:'Netherlands',group:'F'},{code:'BEL',name:'Belgium',group:'F'},{code:'DEN',name:'Denmark',group:'F'},{code:'AUT',name:'Austria',group:'F'},
  {code:'ITA',name:'Italy',group:'G'},{code:'TUR',name:'Turkey',group:'G'},{code:'UKR',name:'Ukraine',group:'G'},{code:'CZE',name:'Czech Republic',group:'G'},
  {code:'POL',name:'Poland',group:'H'},{code:'ROU',name:'Romania',group:'H'},{code:'SVK',name:'Slovakia',group:'H'},{code:'SRB',name:'Serbia',group:'H'},
  {code:'SEN',name:'Senegal',group:'I'},{code:'MAR',name:'Morocco',group:'I'},{code:'EGY',name:'Egypt',group:'I'},{code:'TUN',name:'Tunisia',group:'I'},
  {code:'NGA',name:'Nigeria',group:'J'},{code:'CMR',name:'Cameroon',group:'J'},{code:'CIV',name:"Cote d'Ivoire",group:'J'},{code:'MLI',name:'Mali',group:'J'},
  {code:'JPN',name:'Japan',group:'K'},{code:'KOR',name:'South Korea',group:'K'},{code:'IRN',name:'Iran',group:'K'},{code:'UZB',name:'Uzbekistan',group:'K'},
  {code:'AUS',name:'Australia',group:'L'},{code:'NZL',name:'New Zealand',group:'L'},{code:'SAU',name:'Saudi Arabia',group:'L'},{code:'QAT',name:'Qatar',group:'L'},
]

const PLAYERS = {
  USA:['Turner','Dest','Ream','Richards','Robinson','Adams','McKennie','Musah','Pulisic','Weah','Ferreira'],
  MEX:['Ochoa','Sanchez','Moreno','Vasquez','Gallardo','Herrera','Alvarez','Lozano','Jimenez','Martin','Rodriguez'],
  CAN:['Borjan','Johnston','Miller','Vitoria','Laryea','Eustaquio','Osorio','Davies','David','Buchanan','Cavallini'],
  URU:['Rochet','Nandez','Godin','Gimenez','Olivera','Bentancur','Valverde','De Arrascaeta','Nunez','Suarez','Cavani'],
  ARG:['Martinez','Molina','Romero','Otamendi','Acuna','De Paul','Enzo','Mac Allister','Di Maria','Alvarez','Messi'],
  CHI:['Bravo','Isla','Maripan','Medel','Mena','Aranguiz','Vidal','Valdes','Sanchez','Vargas','Brereton'],
  PER:['Gallese','Advincula','Araujo','Zambrano','Trauco','Tapia','Cartagena','Cueva','Flores','Lapadula','Guerrero'],
  ECU:['Dominguez','Preciado','Torres','Hincapie','Estupinan','Caicedo','Gruezo','Plata','Sarmiento','Valencia','Enner'],
  BRA:['Alisson','Danilo','Marquinhos','Silva','Telles','Casemiro','Fabinho','Paqueta','Raphinha','Jesus','Neymar'],
  COL:['Vargas','Arias','Sanchez','Mina','Mojica','Lerma','Barrios','James','Cuadrado','Borre','Falcao'],
  VEN:['Farinez','Rosales','Villanueva','Ferraresi','Chancellor','Rincon','Herrera','Soteldo','Bello','Murillo','Rondon'],
  BOL:['Lampe','Jusino','Haquin','Sagredo','Suarez','Saucedo','Ramallo','Arce','Algaranaz','Moreno','Marcelo'],
  FRA:['Lloris','Pavard','Varane','Upamecano','Hernandez','Tchouameni','Rabiot','Griezmann','Dembele','Mbappe','Giroud'],
  ENG:['Pickford','Walker','Maguire','Stones','Shaw','Rice','Bellingham','Saka','Foden','Kane','Sterling'],
  GER:['Neuer','Kimmich','Rudiger','Schlotterbeck','Raum','Goretzka','Kroos','Muller','Gnabry','Havertz','Werner'],
  SUI:['Sommer','Widmer','Akanji','Elvedi','Rodriguez','Freuler','Xhaka','Shaqiri','Embolo','Seferovic','Vargas'],
  ESP:['Unai','Carvajal','Pau','Laporte','Alba','Busquets','Pedri','Gavi','Asensio','Morata','Torres'],
  POR:['Patricio','Cancelo','Pepe','Dias','Guerreiro','Carvalho','Moutinho','Bruno','Bernardo','Felix','Ronaldo'],
  CRO:['Livakovic','Juranovic','Lovren','Gvardiol','Sosa','Brozovic','Modric','Kovacic','Kramaric','Perisic','Rebic'],
  ALB:['Berisha','Hysaj','Djimsiti','Ajeti','Lenjani','Bare','Abrashi','Gjasula','Manaj','Uzuni','Broja'],
  NED:['Flekken','Dumfries','De Ligt','Van Dijk','Blind','De Jong','Koopmeiners','Gakpo','Depay','Bergwijn','Weghorst'],
  BEL:['Courtois','Castagne','Alderweireld','Vertonghen','Theate','Witsel','Tielemans','De Bruyne','Mertens','Lukaku','Hazard'],
  DEN:['Schmeichel','Christensen','Kjaer','Vestergaard','Maehle','Hojbjerg','Delaney','Eriksen','Damsgaard','Braithwaite','Cornelius'],
  AUT:['Pentz','Lainer','Dragovic','Hinteregger','Alaba','Grillitsch','Schlager','Sabitzer','Baumgartner','Arnautovic','Gregoritsch'],
  ITA:['Donnarumma','Di Lorenzo','Bonucci','Bastoni','Emerson','Barella','Jorginho','Verratti','Chiesa','Pellegrini','Immobile'],
  TUR:['Cakir','Celik','Soyuncu','Demiral','Muldur','Tufan','Yokuslu','Calhanoglu','Under','Tosun','Yilmaz'],
  UKR:['Lunin','Karavaev','Zabarny','Matviyenko','Mykolenko','Stepanenko','Shaparenko','Zinchenko','Yarmolenko','Mudryk','Yaremchuk'],
  CZE:['Vaclik','Coufal','Celustka','Kalas','Novak','Soucek','Kral','Masopust','Jankto','Schick','Hlozek'],
  POL:['Szczesny','Cash','Glik','Bednarek','Bereszynski','Krychowiak','Bielik','Zielinski','Szymanski','Lewandowski','Milik'],
  ROU:['Nita','Ratiu','Burca','Dragusin','Bancu','Marin','Olaru','Stanciu','Alibec','Hagi','Puscas'],
  SVK:['Dubravka','Pekarik','Skriniar','Vavro','Hancko','Lobotka','Kucka','Haraslin','Duda','Bozenik','Mak'],
  SRB:['Rajkovic','Milenkovic','Pavlovic','Veljkovic','Zivkovic','Lukic','Gudelj','Tadic','Milinkovic','Vlahovic','Jovic'],
  SEN:['Mendy','Sabaly','Koulibaly','Diallo','Ciss','Gueye','Kouyate','Sarr','Mane','Diatta','Dia'],
  MAR:['Bono','Hakimi','Aguerd','Dari','Mazraoui','Ounahi','Amrabat','Ziyech','Boufal','En-Nesyri','Hamdallah'],
  EGY:['El-Shenawy','Akram','Hegazi','El-Gamal','Kahraba','Elneny','Hamdi','Trezeguet','Salah','El-Shaarawy','Mostafa'],
  TUN:['Dahmen','Bronn','Meriah','Talbi','Abdi','Skhiri','Laidouni','Khazri','Msakni','Sliti','Jebali'],
  NGA:['Uzoho','Aina','Ekong','Troost-Ekong','Balogun','Ndidi','Iwobi','Lookman','Moses','Osimhen','Chukwueze'],
  CMR:['Onana','Fai','Ngadeu','Castelletto','Tolo','Anguissa','Oum Gouet','Mbeumo','Toko Ekambi','Choupo-Moting','Aboubakar'],
  CIV:['Sangare','Aurier','Deli','Bailly','Konan','Kessie','Seri','Pepe','Gradel','Zaha','Haller'],
  MLI:['Diarra','Kouyate','Sacko','Coulibaly','Traore','Diallo','Kone','Djenepo','Doumbia','Traore2','Niakate'],
  JPN:['Gonda','Sakai','Tanaka','Itakura','Nagatomo','Endo','Morita','Doan','Kubo','Minamino','Maeda'],
  KOR:['Kim SG','Moon','Kim JM','Kim YG','Hong','Jung','Hwang IB','Lee KC','Son','Hwang HC','Cho'],
  IRN:['Beiranvand','Moharrami','Hosseini','Pouraliganji','Mohammadi','Ezatolahi','Noorollahi','Gholizadeh','Jahanbakhsh','Ansarifard','Taremi'],
  UZB:['Nishonov','Ashurmatov','Kholmatov','Jaloliddinov','Masharipov','Shomurodov','Shodiyev','Tursunov','Makhmudov','Abdullaev','Ergashev'],
  AUS:['Ryan','Degenek','Souttar','Rowles','Atkinson','Mooy','Irvine','Rogic','Leckie','Hrustic','Maclaren'],
  NZL:['Sail','Surman','Boxall','Waine','Just','Goss','De Vries','Cacace','Wood','Payne','Semenyo'],
  SAU:['Al-Owais','Al-Ghannam','Al-Amri','Al-Bulayhi','Al-Shahrani','Al-Malki','Al-Dawsari','Al-Shehri','Al-Abid','Bahebri','Maran'],
  QAT:['Al-Sheeb','Pedro','Hassan','Khoukhi','Salman','Boudiaf','Hatem','Muntari','Afif','Al-Haidos','Al-Rawi'],
}

let stickerNum = 1
const stickers = []

const introItems = [
  {type:'logo',is_foil:true,description:'Official Tournament Logo'},
  {type:'logo',is_foil:true,description:'FIFA World Cup Trophy'},
  {type:'logo',is_foil:false,description:'USA Host City - New York'},
  {type:'logo',is_foil:false,description:'USA Host City - Los Angeles'},
  {type:'logo',is_foil:false,description:'USA Host City - Miami'},
  {type:'logo',is_foil:false,description:'Mexico Host City - Mexico City'},
  {type:'logo',is_foil:false,description:'Canada Host City - Toronto'},
  {type:'stadium',is_foil:false,description:'MetLife Stadium'},
  {type:'stadium',is_foil:false,description:'SoFi Stadium'},
  {type:'stadium',is_foil:true,description:'Hard Rock Stadium'},
]
for (const s of introItems) {
  stickers.push({id:stickerNum,number:stickerNum,section:'INTRO',team:null,player_name:null,...s})
  stickerNum++
}

for (const team of TEAMS) {
  const players = PLAYERS[team.code] || []
  const items = [
    {player_name:null,type:'badge',is_foil:true,description:`${team.name} Badge`},
    {player_name:null,type:'squad',is_foil:true,description:`${team.name} Squad Photo`},
    {player_name:null,type:'logo',is_foil:false,description:`${team.name} Logo`},
    {player_name:null,type:'kit',is_foil:false,description:`${team.name} Home Kit`},
    ...players.slice(0,11).map(p=>({player_name:p,type:'player',is_foil:false,description:`${team.name} - ${p}`})),
    {player_name:players[10]||'Star',type:'player',is_foil:true,description:`${team.name} Star`},
    {player_name:players[9]||'Captain',type:'player',is_foil:true,description:`${team.name} Captain`},
    {player_name:null,type:'group',is_foil:false,description:`Group ${team.group} Badge`},
  ]
  for (const s of items) {
    stickers.push({id:stickerNum,number:stickerNum,section:`GROUP_${team.group}`,team:team.code,...s})
    stickerNum++
  }
}

db.set('stickers', stickers).write()
console.log(`Inserted ${stickers.length} stickers`)

const demoUser = {id:1,username:'demo',color:'#e11d48',created_at:new Date().toISOString()}
db.set('users', [demoUser]).write()

const total = stickers.length
const shuffled = [...stickers].sort(()=>Math.random()-0.5)
const ownedCount = Math.floor(total * 0.25)
const dupeCount = Math.floor(total * 0.05)
const collection = []
shuffled.slice(0, ownedCount).forEach(s => {
  collection.push({id:collection.length+1,user_id:1,sticker_id:s.id,status:'owned',quantity:1,updated_at:new Date().toISOString()})
})
shuffled.slice(ownedCount, ownedCount+dupeCount).forEach(s => {
  collection.push({id:collection.length+1,user_id:1,sticker_id:s.id,status:'duplicate',quantity:2,updated_at:new Date().toISOString()})
})
db.set('collection', collection).write()

console.log(`Demo user: ${ownedCount} owned + ${dupeCount} duplicates (~30%)`)
console.log(`Total stickers: ${total}`)
console.log(`Database ready at data/wc2026.json`)
