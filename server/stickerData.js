'use strict';

const TEAMS = [
  // Group A
  { code:'USA', name:'United States', group:'A', flag:'🇺🇸' },
  { code:'MEX', name:'Mexico',        group:'A', flag:'🇲🇽' },
  { code:'CAN', name:'Canada',        group:'A', flag:'🇨🇦' },
  { code:'URU', name:'Uruguay',       group:'A', flag:'🇺🇾' },
  // Group B
  { code:'ARG', name:'Argentina',     group:'B', flag:'🇦🇷' },
  { code:'CHI', name:'Chile',         group:'B', flag:'🇨🇱' },
  { code:'PER', name:'Peru',          group:'B', flag:'🇵🇪' },
  { code:'ECU', name:'Ecuador',       group:'B', flag:'🇪🇨' },
  // Group C
  { code:'BRA', name:'Brazil',        group:'C', flag:'🇧🇷' },
  { code:'COL', name:'Colombia',      group:'C', flag:'🇨🇴' },
  { code:'VEN', name:'Venezuela',     group:'C', flag:'🇻🇪' },
  { code:'BOL', name:'Bolivia',       group:'C', flag:'🇧🇴' },
  // Group D
  { code:'FRA', name:'France',        group:'D', flag:'🇫🇷' },
  { code:'ENG', name:'England',       group:'D', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code:'GER', name:'Germany',       group:'D', flag:'🇩🇪' },
  { code:'SUI', name:'Switzerland',   group:'D', flag:'🇨🇭' },
  // Group E
  { code:'ESP', name:'Spain',         group:'E', flag:'🇪🇸' },
  { code:'POR', name:'Portugal',      group:'E', flag:'🇵🇹' },
  { code:'CRO', name:'Croatia',       group:'E', flag:'🇭🇷' },
  { code:'ALB', name:'Albania',       group:'E', flag:'🇦🇱' },
  // Group F
  { code:'NED', name:'Netherlands',   group:'F', flag:'🇳🇱' },
  { code:'BEL', name:'Belgium',       group:'F', flag:'🇧🇪' },
  { code:'DEN', name:'Denmark',       group:'F', flag:'🇩🇰' },
  { code:'AUT', name:'Austria',       group:'F', flag:'🇦🇹' },
  // Group G
  { code:'ITA', name:'Italy',         group:'G', flag:'🇮🇹' },
  { code:'TUR', name:'Turkey',        group:'G', flag:'🇹🇷' },
  { code:'UKR', name:'Ukraine',       group:'G', flag:'🇺🇦' },
  { code:'CZE', name:'Czech Republic',group:'G', flag:'🇨🇿' },
  // Group H
  { code:'POL', name:'Poland',        group:'H', flag:'🇵🇱' },
  { code:'ROU', name:'Romania',       group:'H', flag:'🇷🇴' },
  { code:'SVK', name:'Slovakia',      group:'H', flag:'🇸🇰' },
  { code:'SRB', name:'Serbia',        group:'H', flag:'🇷🇸' },
  // Group I
  { code:'SEN', name:'Senegal',       group:'I', flag:'🇸🇳' },
  { code:'MAR', name:'Morocco',       group:'I', flag:'🇲🇦' },
  { code:'EGY', name:'Egypt',         group:'I', flag:'🇪🇬' },
  { code:'TUN', name:'Tunisia',       group:'I', flag:'🇹🇳' },
  // Group J
  { code:'NGA', name:'Nigeria',       group:'J', flag:'🇳🇬' },
  { code:'CMR', name:'Cameroon',      group:'J', flag:'🇨🇲' },
  { code:'CIV', name:"Côte d'Ivoire", group:'J', flag:'🇨🇮' },
  { code:'MLI', name:'Mali',          group:'J', flag:'🇲🇱' },
  // Group K
  { code:'JPN', name:'Japan',         group:'K', flag:'🇯🇵' },
  { code:'KOR', name:'South Korea',   group:'K', flag:'🇰🇷' },
  { code:'IRN', name:'Iran',          group:'K', flag:'🇮🇷' },
  { code:'UZB', name:'Uzbekistan',    group:'K', flag:'🇺🇿' },
  // Group L
  { code:'AUS', name:'Australia',     group:'L', flag:'🇦🇺' },
  { code:'NZL', name:'New Zealand',   group:'L', flag:'🇳🇿' },
  { code:'SAU', name:'Saudi Arabia',  group:'L', flag:'🇸🇦' },
  { code:'QAT', name:'Qatar',         group:'L', flag:'🇶🇦' },
];

// Player name pools per position (reused across teams for demo)
const GKS  = ['Goalkeeper 1', 'Goalkeeper 2'];
const DEFS = ['Defender 1','Defender 2','Defender 3','Defender 4','Defender 5'];
const MIDS = ['Midfielder 1','Midfielder 2','Midfielder 3','Midfielder 4'];
const FWDS = ['Forward 1','Forward 2','Forward 3','Forward 4'];

function buildStickers() {
  const stickers = [];
  let num = 1;

  // ── INTRO SECTION (10 stickers) ──────────────────────────
  const introItems = [
    { name:'Official Logo',     type:'foil'   },
    { name:'Trophy',            type:'foil'   },
    { name:'Host Cities Map',   type:'normal' },
    { name:'LA Stadium',        type:'normal' },
    { name:'New York Stadium',  type:'normal' },
    { name:'Dallas Stadium',    type:'normal' },
    { name:'Miami Stadium',     type:'normal' },
    { name:'Canada Venue',      type:'normal' },
    { name:'Mexico Venue',      type:'normal' },
    { name:'Opening Ceremony',  type:'foil'   },
  ];
  for (const item of introItems) {
    stickers.push({ number: num++, team:'INTRO', teamName:'World Cup 2026', group:'intro', player: item.name, type: item.type, foil: item.type==='foil' });
  }

  // ── TEAM SECTIONS (48 teams × 18 stickers) ───────────────
  for (const team of TEAMS) {
    // 1. Team badge (foil)
    stickers.push({ number: num++, team: team.code, teamName: team.name, group: team.group, player: `${team.name} Badge`, type:'foil', foil:true });
    // 2. Team photo
    stickers.push({ number: num++, team: team.code, teamName: team.name, group: team.group, player: `${team.name} Squad Photo`, type:'squad', foil:false });
    // 3. Team logo (foil)
    stickers.push({ number: num++, team: team.code, teamName: team.name, group: team.group, player: `${team.name} Logo`, type:'foil', foil:true });
    // 4-5: Goalkeepers
    for (const p of GKS) {
      stickers.push({ number: num++, team: team.code, teamName: team.name, group: team.group, player: p, type:'player', foil:false });
    }
    // 6-10: Defenders
    for (const p of DEFS) {
      stickers.push({ number: num++, team: team.code, teamName: team.name, group: team.group, player: p, type:'player', foil:false });
    }
    // 11-14: Midfielders
    for (const p of MIDS) {
      stickers.push({ number: num++, team: team.code, teamName: team.name, group: team.group, player: p, type:'player', foil:false });
    }
    // 15-18: Forwards
    for (const p of FWDS) {
      stickers.push({ number: num++, team: team.code, teamName: team.name, group: team.group, player: p, type:'player', foil:false });
    }
  }

  return stickers;
}

module.exports = { TEAMS, buildStickers };
