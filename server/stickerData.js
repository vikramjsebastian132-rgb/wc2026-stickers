'use strict';

// Official Panini WC 2026 sticker checklist
const RAW = `00 Panini Logo FOIL
FWC1 Official Emblem FOIL
FWC2 Official Emblem FOIL
FWC3 Official Mascots FOIL
FWC4 Official Slogan FOIL
FWC5 Official Ball FOIL
FWC6 Canada - Host Countries & Cities FOIL
FWC7 Mexico - Host Countries & Cities FOIL
FWC8 USA - Host Countries & Cities FOIL
FWC9 Italy 1934 - World Cup History FOIL
FWC10 Uruguay 1950 - World Cup History FOIL
FWC11 West Germany 1954 - World Cup History FOIL
FWC12 Brazil 1962 - World Cup History FOIL
FWC13 West Germany 1974 - World Cup History FOIL
FWC14 Argentina 1986 - World Cup History FOIL
FWC15 Brazil 1994 - World Cup History FOIL
FWC16 Brazil 2002 - World Cup History FOIL
FWC17 Italy 2006 - World Cup History FOIL
FWC18 Germany 2014 - World Cup History FOIL
FWC19 Argentina 2022 - World Cup History FOIL
MEX1 Team Logo - Mexico FOIL
MEX2 Luis Malagón - Mexico
MEX3 Johan Vasquez - Mexico
MEX4 Jorge Sánchez - Mexico
MEX5 Cesar Montes - Mexico
MEX6 Jesus Gallardo - Mexico
MEX7 Israel Reyes - Mexico
MEX8 Diego Lainez - Mexico
MEX9 Carlos Rodriguez - Mexico
MEX10 Edson Alvarez - Mexico
MEX11 Orbelin Pineda - Mexico
MEX12 Marcel Ruiz - Mexico
MEX13 Team Photo - Mexico
MEX14 Érick Sánchez - Mexico
MEX15 Hirving Lozano - Mexico
MEX16 Santiago Giménez - Mexico
MEX17 Raúl Jiménez - Mexico
MEX18 Alexis Vega - Mexico
MEX19 Roberto Alvarado - Mexico
MEX20 Cesar Huerta - Mexico
RSA1 Team Logo - South Africa FOIL
RSA2 Ronwen Williams - South Africa
RSA3 Sipho Chaine - South Africa
RSA4 Aubrey Modiba - South Africa
RSA5 Samukele Kabini - South Africa
RSA6 Mbekezeli Mbokazi - South Africa
RSA7 Khulumani Ndamane - South Africa
RSA8 Siyabonga Ngezana - South Africa
RSA9 Khuliso Mudau - South Africa
RSA10 Nkosinathi Sibisi - South Africa
RSA11 Teboho Mokoena - South Africa
RSA12 Thalente Mbatha - South Africa
RSA13 Team Photo - South Africa
RSA14 Bathasi Aubaas - South Africa
RSA15 Yaya Sithole - South Africa
RSA16 Sipho Mbule - South Africa
RSA17 Lyle Foster - South Africa
RSA18 Iqraam Rayners - South Africa
RSA19 Mohau Nkota - South Africa
RSA20 Oswin Appollis - South Africa
KOR1 Team Logo - South Korea FOIL
KOR2 Hyeon-woo Jo - South Korea
KOR3 Seung-Gyu Kim - South Korea
KOR4 Min-jae Kim - South Korea
KOR5 Yu-min Cho - South Korea
KOR6 Young-woo Seol - South Korea
KOR7 Han-beom Lee - South Korea
KOR8 Tae-seok Lee - South Korea
KOR9 Myung-jae Lee - South Korea
KOR10 Jae-sung Lee - South Korea
KOR11 In-beom Hwang - South Korea
KOR12 Kang-in Lee - South Korea
KOR13 Team Photo - South Korea
KOR14 Seung-ho Paik - South Korea
KOR15 Jens Castrop - South Korea
KOR16 Dongg-yeong Lee - South Korea
KOR17 Gue-sung Cho - South Korea
KOR18 Heung-min Son - South Korea
KOR19 Hee-chan Hwang - South Korea
KOR20 Hyeon-Gyu Oh - South Korea
CZE1 Team Logo - Czechia FOIL
CZE2 Matej Kovar - Czechia
CZE3 Jindrich Stanek - Czechia
CZE4 Ladislav Krejci - Czechia
CZE5 Vladimir Coufal - Czechia
CZE6 Jaroslav Zeleny - Czechia
CZE7 Tomas Holes - Czechia
CZE8 David Zima - Czechia
CZE9 Michal Sadilek - Czechia
CZE10 Lukas Provod - Czechia
CZE11 Lukas Cerv - Czechia
CZE12 Tomas Soucek - Czechia
CZE13 Team Photo - Czechia
CZE14 Pavel Sulc - Czechia
CZE15 Matej Vydra - Czechia
CZE16 Vasil Kusej - Czechia
CZE17 Tomas Chory - Czechia
CZE18 Vaclav Cerny - Czechia
CZE19 Adam Hlozek - Czechia
CZE20 Patrik Schick - Czechia
CAN1 Team Logo - Canada FOIL
CAN2 Dayne St.Clair - Canada
CAN3 Alphonso Davies - Canada
CAN4 Alistair Johnston - Canada
CAN5 Samuel Adekugbe - Canada
CAN6 Riche Larvea - Canada
CAN7 Derek Cornelius - Canada
CAN8 Moise Bombito - Canada
CAN9 Kamal Miller - Canada
CAN10 Stephen Eustaquio - Canada
CAN11 Ismael Kone - Canada
CAN12 Jonathan Osorio - Canada
CAN13 Team Photo - Canada
CAN14 Jacob Shaffelburg - Canada
CAN15 Mathieu Choiniere - Canada
CAN16 Niko Sigur - Canada
CAN17 Tajon Buchanan - Canada
CAN18 Liam Millar - Canada
CAN19 Cyle Larin - Canada
CAN20 Jonathan David - Canada
BIH1 Team Logo - Bosnia and Herzegovina FOIL
BIH2 Nikola Vasilj - Bosnia and Herzegovina
BIH3 Amer Dedic - Bosnia and Herzegovina
BIH4 Sead Kolasinac - Bosnia and Herzegovina
BIH5 Tarik Muharemovic - Bosnia and Herzegovina
BIH6 Nihad Mujakic - Bosnia and Herzegovina
BIH7 Nikola Katic - Bosnia and Herzegovina
BIH8 Amir Hadziahmetovic - Bosnia and Herzegovina
BIH9 Benjamin Tahirovic - Bosnia and Herzegovina
BIH10 Armin Gigovic - Bosnia and Herzegovina
BIH11 Ivan Sunjic - Bosnia and Herzegovina
BIH12 Ivan Basic - Bosnia and Herzegovina
BIH13 Team Photo - Bosnia and Herzegovina
BIH14 Dzenis Burnic - Bosnia and Herzegovina
BIH15 Esmir Bajraktarevic - Bosnia and Herzegovina
BIH16 Amar Memic - Bosnia and Herzegovina
BIH17 Ermedin Demirovic - Bosnia and Herzegovina
BIH18 Edin Dzeko - Bosnia and Herzegovina
BIH19 Samed Bazdar - Bosnia and Herzegovina
BIH20 Haris Tabakovic - Bosnia and Herzegovina
QAT1 Team Logo - Qatar FOIL
QAT2 Meshaal Barsham - Qatar
QAT3 Sultan Albrake - Qatar
QAT4 Lucas Mendes - Qatar
QAT5 Homam Ahmed - Qatar
QAT6 Boualem Khoukhi - Qatar
QAT7 Pedro Miguel - Qatar
QAT8 Tarek Salman - Qatar
QAT9 Mohamed Al-Mannai - Qatar
QAT10 Karim Boudiaf - Qatar
QAT11 Assim Madibo - Qatar
QAT12 Ahmed Fatehi - Qatar
QAT13 Team Photo - Qatar
QAT14 Mohammed Waad - Qatar
QAT15 Abdulaziz Hatem - Qatar
QAT16 Hassan Al-Haydos - Qatar
QAT17 Edmilson Junior - Qatar
QAT18 Akram Hassan Afif - Qatar
QAT19 Ahmed Al Ganehi - Qatar
QAT20 Almoez Ali - Qatar
SUI1 Team Logo - Switzerland FOIL
SUI2 Gregor Kobel - Switzerland
SUI3 Yvon Mvogo - Switzerland
SUI4 Manuel Akanji - Switzerland
SUI5 Ricardo Rodriguez - Switzerland
SUI6 Nico Elvedi - Switzerland
SUI7 Aurele Amenda - Switzerland
SUI8 Silvan Widmer - Switzerland
SUI9 Granit Xhaka - Switzerland
SUI10 Denis Zakaria - Switzerland
SUI11 Remo Freuler - Switzerland
SUI12 Fabian Rieder - Switzerland
SUI13 Team Photo - Switzerland
SUI14 Ardon Jashari - Switzerland
SUI15 Johan Manzambi - Switzerland
SUI16 Michel Aebischer - Switzerland
SUI17 Breel Embolo - Switzerland
SUI18 Ruben Vargas - Switzerland
SUI19 Dan Ndoye - Switzerland
SUI20 Zeki Amdouni - Switzerland
BRA1 Team Logo - Brazil FOIL
BRA2 Alisson - Brazil
BRA3 Bento - Brazil
BRA4 Marquinhos - Brazil
BRA5 Eder Militao - Brazil
BRA6 Gabriel Magalhaes - Brazil
BRA7 Danilo - Brazil
BRA8 Wesley - Brazil
BRA9 Lucas Paqueta - Brazil
BRA10 Casemiro - Brazil
BRA11 Bruno Guimaraes - Brazil
BRA12 Luiz Henrique - Brazil
BRA13 Team Photo - Brazil
BRA14 Vinicius Junior - Brazil
BRA15 Rodrygo - Brazil
BRA16 Joao Pedro - Brazil
BRA17 Matheus Cunha - Brazil
BRA18 Gabriel Martinelli - Brazil
BRA19 Raphinha - Brazil
BRA20 Estevao - Brazil
MAR1 Team Logo - Morocco FOIL
MAR2 Yassine Bounou - Morocco
MAR3 Munir El Kajoui - Morocco
MAR4 Achraf Hakimi - Morocco
MAR5 Noussair Mazraoui - Morocco
MAR6 Nayef Aguerd - Morocco
MAR7 Roman Saiss - Morocco
MAR8 Jawad El Yamio - Morocco
MAR9 Adam Masina - Morocco
MAR10 Sofyan Amrabat - Morocco
MAR11 Azzedine Ounahi - Morocco
MAR12 Eliesse Ben Seghir - Morocco
MAR13 Team Photo - Morocco
MAR14 Bilal El Khannouss - Morocco
MAR15 Ismael Saibari - Morocco
MAR16 Youssef En-Nesyri - Morocco
MAR17 Abde Ezzalzouli - Morocco
MAR18 Soufiane Rahimi - Morocco
MAR19 Brahim Diaz - Morocco
MAR20 Ayoub El Kaabi - Morocco
HAI1 Team Logo - Haiti FOIL
HAI2 Johny Placide - Haiti
HAI3 Carlens Arcus - Haiti
HAI4 Martin Experience - Haiti
HAI5 Jean-Kevin Duverne - Haiti
HAI6 Ricardo Ade - Haiti
HAI7 Duke Lacroix - Haiti
HAI8 Garven Metusala - Haiti
HAI9 Hannes Delcroix - Haiti
HAI10 Leverton Pierre - Haiti
HAI11 Danley Jean Jacques - Haiti
HAI12 Jean-Ricner Bellegarde - Haiti
HAI13 Team Photo - Haiti
HAI14 Christopher Attys - Haiti
HAI15 Derrick Etienne Jr - Haiti
HAI16 Josue Casimir - Haiti
HAI17 Ruben Providence - Haiti
HAI18 Duckens Nazon - Haiti
HAI19 Louicius Deedson - Haiti
HAI20 Frantzdy Pierrot - Haiti
SCO1 Team Logo - Scotland FOIL
SCO2 Angus Gunn - Scotland
SCO3 Jack Hendry - Scotland
SCO4 Kieran Tierney - Scotland
SCO5 Aaron Hickey - Scotland
SCO6 Andrew Robertson - Scotland
SCO7 Scott McKenna - Scotland
SCO8 John Souttar - Scotland
SCO9 Anthony Ralston - Scotland
SCO10 Grant Hanley - Scotland
SCO11 Scott McTominay - Scotland
SCO12 Billy Gilmour - Scotland
SCO13 Team Photo - Scotland
SCO14 Lewis Ferguson - Scotland
SCO15 Ryan Christie - Scotland
SCO16 Kenny McLean - Scotland
SCO17 John McGinn - Scotland
SCO18 Lyndon Dykes - Scotland
SCO19 Che Adams - Scotland
SCO20 Ben Gannon-Doak - Scotland
USA1 Team Logo - USA FOIL
USA2 Matt Freese - USA
USA3 Chris Richards - USA
USA4 Tim Ream - USA
USA5 Mark McKenzie - USA
USA6 Alex Freeman - USA
USA7 Antonee Robinson - USA
USA8 Tyler Adams - USA
USA9 Tanner Tessmann - USA
USA10 Weston McKennie - USA
USA11 Christian Roldan - USA
USA12 Timothy Weah - USA
USA13 Team Photo - USA
USA14 Diego Luna - USA
USA15 Malik Tillman - USA
USA16 Christian Pulisic - USA
USA17 Brenden Aaronson - USA
USA18 Ricardo Pepi - USA
USA19 Haji Wright - USA
USA20 Folarin Balogun - USA
PAR1 Team Logo - Paraguay FOIL
PAR2 Roberto Fernandez - Paraguay
PAR3 Orlando Gill - Paraguay
PAR4 Gustavo Gomez - Paraguay
PAR5 Fabian Balbuena - Paraguay
PAR6 Juan Jose Caceres - Paraguay
PAR7 Omar Alderete - Paraguay
PAR8 Junior Alonso - Paraguay
PAR9 Mathias Villasanti - Paraguay
PAR10 Diego Gomez - Paraguay
PAR11 Damian Bobadilla - Paraguay
PAR12 Andres Cubas - Paraguay
PAR13 Team Photo - Paraguay
PAR14 Matias Galarza Fonda - Paraguay
PAR15 Julio Enciso - Paraguay
PAR16 Alejandro Romero Gamarra - Paraguay
PAR17 Miguel Almiron - Paraguay
PAR18 Ramon Sosa - Paraguay
PAR19 Angel Romero - Paraguay
PAR20 Antonio Sanabria - Paraguay
AUS1 Team Logo - Australia FOIL
AUS2 Mathew Ryan - Australia
AUS3 Joe Gauci - Australia
AUS4 Harry Souttar - Australia
AUS5 Alessandro Circati - Australia
AUS6 Jordan Bos - Australia
AUS7 Aziz Behich - Australia
AUS8 Cameron Burgess - Australia
AUS9 Lewis Miller - Australia
AUS10 Milos Degenek - Australia
AUS11 Jackson Irvine - Australia
AUS12 Riley McGree - Australia
AUS13 Team Photo - Australia
AUS14 Aiden ONeill - Australia
AUS15 Connor Metcalfe - Australia
AUS16 Patrick Yazbek - Australia
AUS17 Craig Goodwin - Australia
AUS18 Kusini Vengi - Australia
AUS19 Nestory Irankunda - Australia
AUS20 Mohamed Toure - Australia
TUR1 Team Logo - Turkiye FOIL
TUR2 Ugurcan Cakir - Turkiye
TUR3 Mert Muldur - Turkiye
TUR4 Zeki Celik - Turkiye
TUR5 Abdulkerim Bardakci - Turkiye
TUR6 Caglar Soyuncu - Turkiye
TUR7 Merih Demiral - Turkiye
TUR8 Ferdi Kadioglu - Turkiye
TUR9 Kaan Ayhan - Turkiye
TUR10 Ismail Yuksek - Turkiye
TUR11 Hakan Calhanoglu - Turkiye
TUR12 Orkun Kokcu - Turkiye
TUR13 Team Photo - Turkiye
TUR14 Arda Guler - Turkiye
TUR15 Irfan Can Kahveci - Turkiye
TUR16 Yunus Akgun - Turkiye
TUR17 Can Uzun - Turkiye
TUR18 Baris Alper Yilmaz - Turkiye
TUR19 Kerem Akturkoglu - Turkiye
TUR20 Kenan Yildiz - Turkiye
GER1 Team Logo - Germany FOIL
GER2 Marc-Andre ter Stegen - Germany
GER3 Jonathan Tah - Germany
GER4 David Raum - Germany
GER5 Nico Schlotterbeck - Germany
GER6 Antonio Rudiger - Germany
GER7 Waldemar Anton - Germany
GER8 Ridle Baku - Germany
GER9 Maximilian Mittelstadt - Germany
GER10 Joshua Kimmich - Germany
GER11 Florian Wirtz - Germany
GER12 Felix Nmecha - Germany
GER13 Team Photo - Germany
GER14 Leon Goretzka - Germany
GER15 Jamal Musiala - Germany
GER16 Serge Gnabry - Germany
GER17 Kai Havertz - Germany
GER18 Leroy Sane - Germany
GER19 Karim Adeyemi - Germany
GER20 Nick Woltemade - Germany
CUW1 Team Logo - Curacao FOIL
CUW2 Eloy Room - Curacao
CUW3 Armando Obispo - Curacao
CUW4 Sherel Floranus - Curacao
CUW5 Jurien Gaari - Curacao
CUW6 Joshua Brenet - Curacao
CUW7 Roshon Van Eijma - Curacao
CUW8 Shurandy Sambo - Curacao
CUW9 Livano Comenencia - Curacao
CUW10 Godfried Roemeratoe - Curacao
CUW11 Juninho Bacuna - Curacao
CUW12 Leandro Bacuna - Curacao
CUW13 Team Photo - Curacao
CUW14 Tahith Chong - Curacao
CUW15 Kenji Gorre - Curacao
CUW16 Jearl Margaritha - Curacao
CUW17 Jurgen Locadia - Curacao
CUW18 Jeremy Antonisse - Curacao
CUW19 Gervane Kastaneer - Curacao
CUW20 Sontje Hansen - Curacao
CIV1 Team Logo - Ivory Coast FOIL
CIV2 Yahia Fofana - Ivory Coast
CIV3 Ghislain Konan - Ivory Coast
CIV4 Wilfried Singo - Ivory Coast
CIV5 Odilon Kossounou - Ivory Coast
CIV6 Evan Ndicka - Ivory Coast
CIV7 Willy Boly - Ivory Coast
CIV8 Emmanuel Agbadou - Ivory Coast
CIV9 Ousmane Diomande - Ivory Coast
CIV10 Franck Kessie - Ivory Coast
CIV11 Seko Fofana - Ivory Coast
CIV12 Ibrahim Sangare - Ivory Coast
CIV13 Team Photo - Ivory Coast
CIV14 Jean-Philippe Gbamin - Ivory Coast
CIV15 Amad Diallo - Ivory Coast
CIV16 Sebastien Haller - Ivory Coast
CIV17 Simon Adingra - Ivory Coast
CIV18 Yan Diomande - Ivory Coast
CIV19 Evann Guessand - Ivory Coast
CIV20 Oumar Diakite - Ivory Coast
ECU1 Team Logo - Ecuador FOIL
ECU2 Hernan Galindez - Ecuador
ECU3 Gonzalo Valle - Ecuador
ECU4 Piero Hincapie - Ecuador
ECU5 Pervis Estupinan - Ecuador
ECU6 Willian Pacho - Ecuador
ECU7 Angelo Preciado - Ecuador
ECU8 Joel Ordonez - Ecuador
ECU9 Moises Caicedo - Ecuador
ECU10 Alan Franco - Ecuador
ECU11 Kendry Paez - Ecuador
ECU12 Pedro Vite - Ecuador
ECU13 Team Photo - Ecuador
ECU14 John Veboah - Ecuador
ECU15 Leonardo Campana - Ecuador
ECU16 Gonzalo Plata - Ecuador
ECU17 Nilson Angulo - Ecuador
ECU18 Alan Minda - Ecuador
ECU19 Kevin Rodriguez - Ecuador
ECU20 Enner Valencia - Ecuador
NED1 Team Logo - Netherlands FOIL
NED2 Bart Verbruggen - Netherlands
NED3 Virgil van Dijk - Netherlands
NED4 Micky van de Ven - Netherlands
NED5 Jurrien Timber - Netherlands
NED6 Denzel Dumfries - Netherlands
NED7 Nathan Ake - Netherlands
NED8 Jeremie Frimpong - Netherlands
NED9 Jan Paul van Hecke - Netherlands
NED10 Tijjani Reijnders - Netherlands
NED11 Ryan Gravenberch - Netherlands
NED12 Teun Koopmeiners - Netherlands
NED13 Team Photo - Netherlands
NED14 Frenkie de Jong - Netherlands
NED15 Xavi Simons - Netherlands
NED16 Justin Kluivert - Netherlands
NED17 Memphis Depay - Netherlands
NED18 Donyell Malen - Netherlands
NED19 Wout Weghorst - Netherlands
NED20 Cody Gakpo - Netherlands
JPN1 Team Logo - Japan FOIL
JPN2 Zion Suzuki - Japan
JPN3 Henry Heroki Mochizuki - Japan
JPN4 Ayumu Seko - Japan
JPN5 Junnosuke Suzuki - Japan
JPN6 Shogo Taniguchi - Japan
JPN7 Tsuyoshi Watanabe - Japan
JPN8 Kaishu Sano - Japan
JPN9 Yuki Soma - Japan
JPN10 Ao Tanaka - Japan
JPN11 Daichi Kamada - Japan
JPN12 Takefusa Kubo - Japan
JPN13 Team Photo - Japan
JPN14 Ritsu Doan - Japan
JPN15 Keito Nakamura - Japan
JPN16 Takumi Minamino - Japan
JPN17 Shuto Machino - Japan
JPN18 Junya Ito - Japan
JPN19 Koki Ogawa - Japan
JPN20 Ayase Ueda - Japan
SWE1 Team Logo - Sweden FOIL
SWE2 Victor Johansson - Sweden
SWE3 Isak Hien - Sweden
SWE4 Gabriel Gudmundsson - Sweden
SWE5 Emil Holm - Sweden
SWE6 Victor Nilsson Lindelof - Sweden
SWE7 Gustaf Lagerbielke - Sweden
SWE8 Lucas Bergvall - Sweden
SWE9 Hugo Larsson - Sweden
SWE10 Jesper Karlstrom - Sweden
SWE11 Yasin Ayari - Sweden
SWE12 Mattias Svanberg - Sweden
SWE13 Team Photo - Sweden
SWE14 Daniel Svensson - Sweden
SWE15 Ken Sema - Sweden
SWE16 Roony Bardghji - Sweden
SWE17 Dejan Kulusevski - Sweden
SWE18 Anthony Elanga - Sweden
SWE19 Alexander Isak - Sweden
SWE20 Viktor Gyokeres - Sweden
TUN1 Team Logo - Tunisia FOIL
TUN2 Bechir Ben Said - Tunisia
TUN3 Aymen Dahmen - Tunisia
TUN4 Yan Valery - Tunisia
TUN5 Montassar Talbi - Tunisia
TUN6 Yassine Meriah - Tunisia
TUN7 Ali Abdi - Tunisia
TUN8 Dylan Bronn - Tunisia
TUN9 Ellyes Skhiri - Tunisia
TUN10 Aissa Laidouni - Tunisia
TUN11 Ferjani Sassi - Tunisia
TUN12 Mohamed Ali Ben Romdhane - Tunisia
TUN13 Team Photo - Tunisia
TUN14 Hannibal Mejbri - Tunisia
TUN15 Elias Achouri - Tunisia
TUN16 Elias Saad - Tunisia
TUN17 Hazem Mastouri - Tunisia
TUN18 Ismael Gharbi - Tunisia
TUN19 Sayfallah Ltaief - Tunisia
TUN20 Naim Sliti - Tunisia
BEL1 Team Logo - Belgium FOIL
BEL2 Thibaut Courtois - Belgium
BEL3 Arthur Theate - Belgium
BEL4 Timothy Castagne - Belgium
BEL5 Zeno Debast - Belgium
BEL6 Brandon Mechele - Belgium
BEL7 Maxim De Cuyper - Belgium
BEL8 Thomas Meunier - Belgium
BEL9 Youri Tielemans - Belgium
BEL10 Amadou Onana - Belgium
BEL11 Nicolas Raskin - Belgium
BEL12 Alexis Saelemaekers - Belgium
BEL13 Team Photo - Belgium
BEL14 Hans Vanaken - Belgium
BEL15 Kevin De Bruyne - Belgium
BEL16 Jeremy Doku - Belgium
BEL17 Charles De Ketelaere - Belgium
BEL18 Leandro Trossard - Belgium
BEL19 Lois Openda - Belgium
BEL20 Romelu Lukaku - Belgium
EGY1 Team Logo - Egypt FOIL
EGY2 Mohamed El Shenawy - Egypt
EGY3 Mohamed Hany - Egypt
EGY4 Mohamed Hamdy - Egypt
EGY5 Yasser Ibrahim - Egypt
EGY6 Khaled Sobhi - Egypt
EGY7 Ramy Rabia - Egypt
EGY8 Hossam Abdelmaguid - Egypt
EGY9 Ahmed Fatouh - Egypt
EGY10 Marwan Attia - Egypt
EGY11 Zizo - Egypt
EGY12 Hamdy Fathy - Egypt
EGY13 Team Photo - Egypt
EGY14 Mohamed Lasheen - Egypt
EGY15 Emam Ashour - Egypt
EGY16 Osama Faisal - Egypt
EGY17 Mohamed Salah - Egypt
EGY18 Mostafa Mohamed - Egypt
EGY19 Trezeguet - Egypt
EGY20 Omar Marmoush - Egypt
IRN1 Team Logo - Iran FOIL
IRN2 Alireza Beiranvand - Iran
IRN3 Morteza Pouraliganji - Iran
IRN4 Ehsan Hajsafi - Iran
IRN5 Milad Mohammadi - Iran
IRN6 Shojae Khalilzadeh - Iran
IRN7 Ramin Rezaeian - Iran
IRN8 Hossein Kanaani - Iran
IRN9 Sadegh Moharrami - Iran
IRN10 Saleh Hardani - Iran
IRN11 Saeed Ezatolahi - Iran
IRN12 Saman Ghoddos - Iran
IRN13 Team Photo - Iran
IRN14 Omid Noorafkan - Iran
IRN15 Roozbeh Cheshmi - Iran
IRN16 Mohammad Mohebi - Iran
IRN17 Sardar Azmoun - Iran
IRN18 Mehdi Taremi - Iran
IRN19 Alireza Jahanbakhsh - Iran
IRN20 Ali Gholizadeh - Iran
NZL1 Team Logo - New Zealand FOIL
NZL2 Max Crocombe Payne - New Zealand
NZL3 Alex Paulsen - New Zealand
NZL4 Michael Boxall - New Zealand
NZL5 Liberato Cacace - New Zealand
NZL6 Tim Payne - New Zealand
NZL7 Tyler Bindon - New Zealand
NZL8 Francis de Vries - New Zealand
NZL9 Finn Surman - New Zealand
NZL10 Joe Bell - New Zealand
NZL11 Sarpreet Singh - New Zealand
NZL12 Ryan Thomas - New Zealand
NZL13 Team Photo - New Zealand
NZL14 Matthew Garbett - New Zealand
NZL15 Marko Stamenic - New Zealand
NZL16 Ben Old - New Zealand
NZL17 Chris Wood - New Zealand
NZL18 Elijah Just - New Zealand
NZL19 Callum McCowatt - New Zealand
NZL20 Kosta Barbarouses - New Zealand
ESP1 Team Logo - Spain FOIL
ESP2 Unai Simon - Spain
ESP3 Robin Le Normand - Spain
ESP4 Aymeric Laporte - Spain
ESP5 Dean Huijsen - Spain
ESP6 Pedro Porro - Spain
ESP7 Dani Carvajal - Spain
ESP8 Marc Cucurella - Spain
ESP9 Martin Zubimendi - Spain
ESP10 Rodri - Spain
ESP11 Pedri - Spain
ESP12 Fabian Ruiz - Spain
ESP13 Team Photo - Spain
ESP14 Mikel Merino - Spain
ESP15 Lamine Yamal - Spain
ESP16 Dani Olmo - Spain
ESP17 Nico Williams - Spain
ESP18 Ferran Torres - Spain
ESP19 Alvaro Morata - Spain
ESP20 Mikel Oyarzabal - Spain
CPV1 Team Logo - Cape Verde FOIL
CPV2 Vozinha - Cape Verde
CPV3 Logan Costa - Cape Verde
CPV4 Pico - Cape Verde
CPV5 Diney - Cape Verde
CPV6 Steven Moreira - Cape Verde
CPV7 Wagner Pina - Cape Verde
CPV8 Joao Paulo - Cape Verde
CPV9 Yannick Semedo - Cape Verde
CPV10 Kevin Pina - Cape Verde
CPV11 Patrick Andrade - Cape Verde
CPV12 Jamiro Monteiro - Cape Verde
CPV13 Team Photo - Cape Verde
CPV14 Deroy Duarte - Cape Verde
CPV15 Garry Rodrigues - Cape Verde
CPV16 Jovane Cabral - Cape Verde
CPV17 Ryan Mendes - Cape Verde
CPV18 Dailon Livramento - Cape Verde
CPV19 Willy Semedo - Cape Verde
CPV20 Bebe - Cape Verde
KSA1 Team Logo - Saudi Arabia FOIL
KSA2 Nawaf Alaqidi - Saudi Arabia
KSA3 Abdulrahman Al-Sanbi - Saudi Arabia
KSA4 Saud Abdulhamid - Saudi Arabia
KSA5 Nawaf Bouwashl - Saudi Arabia
KSA6 Jihad Thakri - Saudi Arabia
KSA7 Moteb Al-Harbi - Saudi Arabia
KSA8 Hassan Altambakti - Saudi Arabia
KSA9 Musab Aljuwayr - Saudi Arabia
KSA10 Ziyad Aljohani - Saudi Arabia
KSA11 Abdullah Alkhaibari - Saudi Arabia
KSA12 Nasser Aldawsari - Saudi Arabia
KSA13 Team Photo - Saudi Arabia
KSA14 Saleh Abu Alshamat - Saudi Arabia
KSA15 Marwan Alsahafi - Saudi Arabia
KSA16 Salem Aldawsari - Saudi Arabia
KSA17 Abdulrahman Al-Aboud - Saudi Arabia
KSA18 Feras Akbrikan - Saudi Arabia
KSA19 Saleh Alshehri - Saudi Arabia
KSA20 Abdullah Al-Hamdan - Saudi Arabia
URU1 Team Logo - Uruguay FOIL
URU2 Sergio Rochet - Uruguay
URU3 Santiago Mele - Uruguay
URU4 Ronald Araujo - Uruguay
URU5 Jose Maria Gimenez - Uruguay
URU6 Sebastian Caceres - Uruguay
URU7 Mathias Olivera - Uruguay
URU8 Guillermo Varela - Uruguay
URU9 Nahitan Nandez - Uruguay
URU10 Federico Valverde - Uruguay
URU11 Giorgian De Arrascaeta - Uruguay
URU12 Rodrigo Bentancur - Uruguay
URU13 Team Photo - Uruguay
URU14 Manuel Ugarte - Uruguay
URU15 Nicolas de la Cruz - Uruguay
URU16 Maxi Araujo - Uruguay
URU17 Darwin Nunez - Uruguay
URU18 Federico Vinas - Uruguay
URU19 Rodrigo Aguirre - Uruguay
URU20 Facundo Pellistri - Uruguay
FRA1 Team Logo - France FOIL
FRA2 Mike Maignan - France
FRA3 Theo Hernandez - France
FRA4 William Saliba - France
FRA5 Jules Kounde - France
FRA6 Ibrahima Konate - France
FRA7 Dayot Upamecano - France
FRA8 Lucas Digne - France
FRA9 Aurelien Tchouameni - France
FRA10 Eduardo Camavinga - France
FRA11 Manu Kone - France
FRA12 Adrien Rabiot - France
FRA13 Team Photo - France
FRA14 Michael Olise - France
FRA15 Ousmane Dembele - France
FRA16 Bradley Barcola - France
FRA17 Desire Doue - France
FRA18 Kingsley Coman - France
FRA19 Hugo Ekitike - France
FRA20 Kylian Mbappe - France
SEN1 Team Logo - Senegal FOIL
SEN2 Edouard Mendy - Senegal
SEN3 Yehvann Diouf - Senegal
SEN4 Moussa Niakhate - Senegal
SEN5 Abdoulaye Seck - Senegal
SEN6 Ismail Jakobs - Senegal
SEN7 El Hadji Malick Diouf - Senegal
SEN8 Kalidou Koulibaly - Senegal
SEN9 Idrissa Gana Gueye - Senegal
SEN10 Pape Matar Sarr - Senegal
SEN11 Pape Gueye - Senegal
SEN12 Habib Diarra - Senegal
SEN13 Team Photo - Senegal
SEN14 Lamine Camara - Senegal
SEN15 Sadio Mane - Senegal
SEN16 Ismaila Sarr - Senegal
SEN17 Boulaye Dia - Senegal
SEN18 Iliman Ndiaye - Senegal
SEN19 Nicolas Jackson - Senegal
SEN20 Krepin Diatta - Senegal
IRQ1 Team Logo - Iraq FOIL
IRQ2 Jalal Hassan - Iraq
IRQ3 Rebin Sulaka - Iraq
IRQ4 Hussein Ali - Iraq
IRQ5 Akam Hashem - Iraq
IRQ6 Merchas Doski - Iraq
IRQ7 Zaid Tahseen - Iraq
IRQ8 Manaf Younis - Iraq
IRQ9 Zidane Iqbal - Iraq
IRQ10 Amir Al-Ammari - Iraq
IRQ11 Ibrahim Bavesh - Iraq
IRQ12 Ali Jasim - Iraq
IRQ13 Team Photo - Iraq
IRQ14 Youssef Amyn - Iraq
IRQ15 Aimar Sher - Iraq
IRQ16 Marko Farji - Iraq
IRQ17 Osama Rashid - Iraq
IRQ18 Ali Al-Hamadi - Iraq
IRQ19 Aymen Hussein - Iraq
IRQ20 Mohanad Ali - Iraq
NOR1 Team Logo - Norway FOIL
NOR2 Orjan Nyland - Norway
NOR3 Julian Ryerson - Norway
NOR4 Leo Ostigard - Norway
NOR5 Kristoffer Vassbakk Ajer - Norway
NOR6 Marcus Holmgren Pedersen - Norway
NOR7 David Moller Wolfe - Norway
NOR8 Torbjorn Heggem - Norway
NOR9 Morten Thorsby - Norway
NOR10 Martin Odegaard - Norway
NOR11 Sander Berge - Norway
NOR12 Andreas Schjelderup - Norway
NOR13 Team Photo - Norway
NOR14 Patrick Berg - Norway
NOR15 Erling Haaland - Norway
NOR16 Alexander Sorloth - Norway
NOR17 Aron Donnum - Norway
NOR18 Jorgen Strand Larsen - Norway
NOR19 Antonio Nusa - Norway
NOR20 Oscar Bobb - Norway
ARG1 Team Logo - Argentina FOIL
ARG2 Emiliano Martinez - Argentina
ARG3 Nahuel Molina - Argentina
ARG4 Cristian Romero - Argentina
ARG5 Nicolas Otamendi - Argentina
ARG6 Nicolas Tagliafico - Argentina
ARG7 Leonardo Balerdi - Argentina
ARG8 Enzo Fernandez - Argentina
ARG9 Alexis Mac Allister - Argentina
ARG10 Rodrigo De Paul - Argentina
ARG11 Exequiel Palacios - Argentina
ARG12 Leandro Paredes - Argentina
ARG13 Team Photo - Argentina
ARG14 Nico Paz - Argentina
ARG15 Franco Mastantuono - Argentina
ARG16 Nico Gonzalez - Argentina
ARG17 Lionel Messi - Argentina
ARG18 Lautaro Martinez - Argentina
ARG19 Julian Alvarez - Argentina
ARG20 Giuliano Simeone - Argentina
ALG1 Team Logo - Algeria FOIL
ALG2 Alexis Guendouz - Algeria
ALG3 Ramy Bensebaini - Algeria
ALG4 Youcef Atal - Algeria
ALG5 Rayan Ait-Nouri - Algeria
ALG6 Mohamed Amine Tougai - Algeria
ALG7 Aissa Mandi - Algeria
ALG8 Ismael Bennacer - Algeria
ALG9 Houssem Aquar - Algeria
ALG10 Hicham Boudaoui - Algeria
ALG11 Ramiz Zerrouki - Algeria
ALG12 Nabil Bentalab - Algeria
ALG13 Team Photo - Algeria
ALG14 Fares Chaibi - Algeria
ALG15 Riyad Mahrez - Algeria
ALG16 Said Benrahma - Algeria
ALG17 Anis Hadj Moussa - Algeria
ALG18 Amine Gouiri - Algeria
ALG19 Baghdad Bounedjah - Algeria
ALG20 Mohammed Amoura - Algeria
AUT1 Team Logo - Austria FOIL
AUT2 Alexander Schlager - Austria
AUT3 Patrick Pentz - Austria
AUT4 David Alaba - Austria
AUT5 Kevin Danso - Austria
AUT6 Philipp Lienhart - Austria
AUT7 Stefan Posch - Austria
AUT8 Phillipp Mwene - Austria
AUT9 Alexander Prass - Austria
AUT10 Xaver Schlager - Austria
AUT11 Marcel Sabitzer - Austria
AUT12 Konrad Laimer - Austria
AUT13 Team Photo - Austria
AUT14 Florian Grillitsch - Austria
AUT15 Nicolas Seiwald - Austria
AUT16 Romano Schmid - Austria
AUT17 Patrick Wimmer - Austria
AUT18 Christoph Baumgartner - Austria
AUT19 Michael Gregoritsch - Austria
AUT20 Marko Arnautovic - Austria
JOR1 Team Logo - Jordan FOIL
JOR2 Yazeed Abulaila - Jordan
JOR3 Ihsan Haddad - Jordan
JOR4 Mohammad Abu Hashish - Jordan
JOR5 Yazan Al-Arab - Jordan
JOR6 Abdallah Nasib - Jordan
JOR7 Saleem Obaid - Jordan
JOR8 Mohammad Abualnadi - Jordan
JOR9 Ibrahim Saadeh - Jordan
JOR10 Nizar Al-Rashdan - Jordan
JOR11 Noor Al-Rawabdeh - Jordan
JOR12 Mohannad Abu Taha - Jordan
JOR13 Team Photo - Jordan
JOR14 Amer Jamous - Jordan
JOR15 Musa Al-Taamari - Jordan
JOR16 Yazan Al-Naimat - Jordan
JOR17 Mahmoud Al-Mardi - Jordan
JOR18 Ali Olwan - Jordan
JOR19 Mohammad Abu Zrayq - Jordan
JOR20 Ibrahim Sabra - Jordan
POR1 Team Logo - Portugal FOIL
POR2 Diogo Costa - Portugal
POR3 Jose Sa - Portugal
POR4 Ruben Dias - Portugal
POR5 Joao Cancelo - Portugal
POR6 Diogo Dalot - Portugal
POR7 Nuno Mendes - Portugal
POR8 Goncalo Inacio - Portugal
POR9 Bernardo Silva - Portugal
POR10 Bruno Fernandes - Portugal
POR11 Ruben Neves - Portugal
POR12 Vitinha - Portugal
POR13 Team Photo - Portugal
POR14 Joao Neves - Portugal
POR15 Cristiano Ronaldo - Portugal
POR16 Francisco Trincao - Portugal
POR17 Joao Felix - Portugal
POR18 Goncalo Ramos - Portugal
POR19 Pedro Neto - Portugal
POR20 Rafael Leao - Portugal
COD1 Team Logo - Congo DR FOIL
COD2 Lionel Mpasi - Congo DR
COD3 Aaron Wan-Bissaka - Congo DR
COD4 Axel Tuanzebe - Congo DR
COD5 Arthur Masuaku - Congo DR
COD6 Chancel Mbemba - Congo DR
COD7 Joris Kayembe - Congo DR
COD8 Charles Pickel - Congo DR
COD9 Ngalayel Mukau - Congo DR
COD10 Edo Kayembe - Congo DR
COD11 Samuel Moutoussamy - Congo DR
COD12 Noah Sadiki - Congo DR
COD13 Team Photo - Congo DR
COD14 Theo Bongonda - Congo DR
COD15 Meschak Elia - Congo DR
COD16 Yoane Wissa - Congo DR
COD17 Brian Cipenga - Congo DR
COD18 Fiston Mayele - Congo DR
COD19 Cedric Bakambu - Congo DR
COD20 Nathanael Mbuku - Congo DR
UZB1 Team Logo - Uzbekistan FOIL
UZB2 Utkir Yusupov - Uzbekistan
UZB3 Farrukh Savfiev - Uzbekistan
UZB4 Sherzod Nasrullaev - Uzbekistan
UZB5 Umar Eshmurodov - Uzbekistan
UZB6 Husniddin Aliqulov - Uzbekistan
UZB7 Rustamjon Ashurmatov - Uzbekistan
UZB8 Khojiakbar Alijonov - Uzbekistan
UZB9 Abdukodir Khusanov - Uzbekistan
UZB10 Odiljon Hamrobekov - Uzbekistan
UZB11 Otabek Shukurov - Uzbekistan
UZB12 Jamshid Iskanderov - Uzbekistan
UZB13 Team Photo - Uzbekistan
UZB14 Azizbek Turgunboev - Uzbekistan
UZB15 Khojimat Erkinov - Uzbekistan
UZB16 Eldor Shomurodov - Uzbekistan
UZB17 Oston Urunov - Uzbekistan
UZB18 Jaloliddin Masharipov - Uzbekistan
UZB19 Igor Sergeev - Uzbekistan
UZB20 Abbosbek Fayzullaev - Uzbekistan
COL1 Team Logo - Colombia FOIL
COL2 Camilo Vargas - Colombia
COL3 David Ospina - Colombia
COL4 Davinson Sanchez - Colombia
COL5 Yerry Mina - Colombia
COL6 Daniel Munoz - Colombia
COL7 Johan Mojica - Colombia
COL8 Jhon Lucumi - Colombia
COL9 Santiago Arias - Colombia
COL10 Jefferson Lerma - Colombia
COL11 Kevin Castano - Colombia
COL12 Richard Rios - Colombia
COL13 Team Photo - Colombia
COL14 James Rodriguez - Colombia
COL15 Juan Fernando Quintero - Colombia
COL16 Jorge Carrascal - Colombia
COL17 Jon Arias - Colombia
COL18 Jhon Cordova - Colombia
COL19 Luis Suarez - Colombia
COL20 Luis Diaz - Colombia
ENG1 Team Logo - England FOIL
ENG2 Jordan Pickford - England
ENG3 John Stones - England
ENG4 Marc Guehi - England
ENG5 Ezri Konsa - England
ENG6 Trent Alexander-Arnold - England
ENG7 Reece James - England
ENG8 Dan Burn - England
ENG9 Jordan Henderson - England
ENG10 Declan Rice - England
ENG11 Jude Bellingham - England
ENG12 Cole Palmer - England
ENG13 Team Photo - England
ENG14 Morgan Rogers - England
ENG15 Anthony Gordon - England
ENG16 Phil Foden - England
ENG17 Bukayo Saka - England
ENG18 Harry Kane - England
ENG19 Marcus Rashford - England
ENG20 Ollie Watkins - England
CRO1 Team Logo - Croatia FOIL
CRO2 Dominik Livakovic - Croatia
CRO3 Duje Caleta-Car - Croatia
CRO4 Josko Gvardiol - Croatia
CRO5 Josip Stanisic - Croatia
CRO6 Luka Vuskovic - Croatia
CRO7 Josip Sutalo - Croatia
CRO8 Kristijan Jakic - Croatia
CRO9 Luka Modric - Croatia
CRO10 Mateo Kovacic - Croatia
CRO11 Martin Baturina - Croatia
CRO12 Lovro Majer - Croatia
CRO13 Team Photo - Croatia
CRO14 Mario Pasalic - Croatia
CRO15 Petar Sucic - Croatia
CRO16 Ivan Perisic - Croatia
CRO17 Marco Pasalic - Croatia
CRO18 Ante Budimir - Croatia
CRO19 Andrej Kramaric - Croatia
CRO20 Franjo Ivanovic - Croatia
GHA1 Team Logo - Ghana FOIL
GHA2 Lawrence Ati Zigi - Ghana
GHA3 Tariq Lamptey - Ghana
GHA4 Mohammed Salisu - Ghana
GHA5 Alidu Seidu - Ghana
GHA6 Alexander Djiku - Ghana
GHA7 Gideon Mensah - Ghana
GHA8 Caleb Yirenkyi - Ghana
GHA9 Abdul Issahaku Fatawu - Ghana
GHA10 Thomas Partey - Ghana
GHA11 Salis Abdul Samed - Ghana
GHA12 Kamaldeen Sulemana - Ghana
GHA13 Team Photo - Ghana
GHA14 Mohammed Kudus - Ghana
GHA15 Inaki Williams - Ghana
GHA16 Jordan Ayew - Ghana
GHA17 Andrew Ayew - Ghana
GHA18 Joseph Paintsil - Ghana
GHA19 Osman Bukari - Ghana
GHA20 Antoine Semenyo - Ghana
PAN1 Team Logo - Panama FOIL
PAN2 Orlando Mosquera - Panama
PAN3 Luis Mejia - Panama
PAN4 Fidel Escobar - Panama
PAN5 Andres Andrade - Panama
PAN6 Michael Amir Murillo - Panama
PAN7 Eric Davis - Panama
PAN8 Jose Cordoba - Panama
PAN9 Cesar Blackman - Panama
PAN10 Cristian Martinez - Panama
PAN11 Anibal Godoy - Panama
PAN12 Adalberto Carrasquilla - Panama
PAN13 Team Photo - Panama
PAN14 Edgar Barcenas - Panama
PAN15 Carlos Harvey - Panama
PAN16 Ismael Diaz - Panama
PAN17 Jose Fajardo - Panama
PAN18 Cecilio Waterman - Panama
PAN19 Jose Luiz Rodriguez - Panama
PAN20 Alberto Quintero - Panama`;

// Team name mapping and group info
const TEAM_INFO = {
  FWC: { name:'World Cup 2026',          group:'intro' },
  // Group A
  MEX: { name:'Mexico',                  group:'A' },
  RSA: { name:'South Africa',            group:'A' },
  KOR: { name:'South Korea',             group:'A' },
  CZE: { name:'Czechia',                 group:'A' },
  // Group B
  CAN: { name:'Canada',                  group:'B' },
  BIH: { name:'Bosnia and Herzegovina',  group:'B' },
  QAT: { name:'Qatar',                   group:'B' },
  SUI: { name:'Switzerland',             group:'B' },
  // Group C
  BRA: { name:'Brazil',                  group:'C' },
  MAR: { name:'Morocco',                 group:'C' },
  HAI: { name:'Haiti',                   group:'C' },
  SCO: { name:'Scotland',                group:'C' },
  // Group D
  USA: { name:'USA',                     group:'D' },
  PAR: { name:'Paraguay',                group:'D' },
  AUS: { name:'Australia',               group:'D' },
  TUR: { name:'Turkiye',                 group:'D' },
  // Group E
  GER: { name:'Germany',                 group:'E' },
  CUW: { name:'Curacao',                 group:'E' },
  CIV: { name:'Ivory Coast',             group:'E' },
  ECU: { name:'Ecuador',                 group:'E' },
  // Group F
  NED: { name:'Netherlands',             group:'F' },
  JPN: { name:'Japan',                   group:'F' },
  SWE: { name:'Sweden',                  group:'F' },
  TUN: { name:'Tunisia',                 group:'F' },
  // Group G
  BEL: { name:'Belgium',                 group:'G' },
  EGY: { name:'Egypt',                   group:'G' },
  IRN: { name:'Iran',                    group:'G' },
  NZL: { name:'New Zealand',             group:'G' },
  // Group H
  ESP: { name:'Spain',                   group:'H' },
  CPV: { name:'Cape Verde',              group:'H' },
  KSA: { name:'Saudi Arabia',            group:'H' },
  URU: { name:'Uruguay',                 group:'H' },
  // Group I
  FRA: { name:'France',                  group:'I' },
  SEN: { name:'Senegal',                 group:'I' },
  IRQ: { name:'Iraq',                    group:'I' },
  NOR: { name:'Norway',                  group:'I' },
  // Group J
  ARG: { name:'Argentina',               group:'J' },
  ALG: { name:'Algeria',                 group:'J' },
  AUT: { name:'Austria',                 group:'J' },
  JOR: { name:'Jordan',                  group:'J' },
  // Group K
  POR: { name:'Portugal',                group:'K' },
  COD: { name:'Congo DR',                group:'K' },
  UZB: { name:'Uzbekistan',              group:'K' },
  COL: { name:'Colombia',                group:'K' },
  // Group L
  ENG: { name:'England',                 group:'L' },
  CRO: { name:'Croatia',                 group:'L' },
  GHA: { name:'Ghana',                   group:'L' },
  PAN: { name:'Panama',                  group:'L' },
};

function buildStickers() {
  const stickers = [];
  let num = 1;
  const seen = new Set();

  for (const line of RAW.split('\n')) {
    const l = line.trim();
    if (!l) continue;

    // Parse: CODE+NUM PLAYER - TEAM [FOIL]
    const m = l.match(/^([A-Z]+)(\d+)\s+(.+?)(?:\s+-\s+.+?)?(\s+FOIL)?$/);
    if (!m) continue;

    const code = m[1];
    const stickerNum = m[2];
    const rawDesc = m[3].trim();
    const isFoil = !!m[4];
    const stickerCode = code + stickerNum;

    // Deduplicate (checklist has duplicates)
    if (seen.has(stickerCode)) continue;
    seen.add(stickerCode);

    const info = TEAM_INFO[code] || { name: code, group: 'other' };

    // Extract player name: "Player Name - Team" or just "Description"
    let player = rawDesc;
    const dashIdx = rawDesc.lastIndexOf(' - ');
    if (dashIdx > 0) {
      player = rawDesc.slice(0, dashIdx).trim();
    }

    // Determine type
    let type = 'player';
    if (isFoil && (player.includes('Team Logo') || player.includes('Logo -'))) type = 'foil';
    else if (player.includes('Team Photo')) type = 'squad';
    else if (isFoil) type = 'foil';

    stickers.push({
      number: num++,
      stickerCode,
      team: code,
      teamName: info.name,
      group: info.group,
      player,
      type,
      foil: isFoil,
    });
  }

  return stickers;
}

const TEAMS = Object.entries(TEAM_INFO).map(([code, t]) => ({ code, name: t.name, group: t.group }));

module.exports = { TEAMS, buildStickers };
