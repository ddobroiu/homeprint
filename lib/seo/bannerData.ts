// lib/seo/bannerData.ts
import type { LandingInfo } from "../landingData";


export const BANNER_SEO_DATA: Record<string, LandingInfo> = {
  // --- IMOBILIARE (Cuvinte cheie de top) ---
  "de-vanzare": {
    key: "de-vanzare",
    title: "Banner DE VÂNZARE — Vizibilitate Maximă",
    shortDescription: "Bannerul clasic 'DE VÂNZARE', cu literă mare și spațiu generos pentru numărul de telefon — gata de montat pe gard, balcon sau fațadă.",
    seoTitle: "Banner De Vânzare | Apartamente & Terenuri",
    seoDescription: "Banner De Vânzare personalizat, PVC rezistent la ploaie și soare, cu tiv și capse incluse. Comandă azi, livrare rapidă.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Vinde rapid proprietatea</h2><p>Un banner "DE VÂNZARE" bine făcut este de multe ori primul contact pe care un cumpărător îl are cu proprietatea ta, așa că merită tratat ca atare. Recomandăm PVC 440g/m² cu tiv cusut și capse din 50 în 50 cm, rezistent la vânt și ploaie indiferent dacă îl montezi pe gard, balcon sau fațadă. Cel mai important detaliu rămâne numărul de telefon: scrie-l cu cifre de minimum 15-20 cm, ca să poată fi citit dintr-o mașină aflată în mers. Dacă vinzi și un teren alăturat sau ai mai multe proprietăți, poți comanda mai multe exemplare direct din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "de-inchiriat": {
    key: "de-inchiriat",
    title: "Banner DE ÎNCHIRIAT — Găsește Chiriași",
    shortDescription: "Banner 'DE ÎNCHIRIAT' vizibil de la distanță, potrivit pentru apartamente, garsoniere sau spații comerciale aflate la stradă.",
    seoTitle: "Banner De Închiriat | Imobiliare",
    seoDescription: "Banner De Închiriat rezistent la intemperii, cu text mare pentru vizibilitate din trafic. Livrare rapidă oriunde în țară.",
    images: ["/products/banner/de-inchiriat.jpg"],
    contentHtml: `<h2>Închiriază rapid spațiul</h2><p>Banner-ul "DE ÎNCHIRIAT" funcționează cel mai bine când e montat exact acolo unde chiriașii potențiali se uită automat — pe balcon, în geam sau pe gard. Pentru expunere îndelungată recomandăm PVC 440g/m² cu capse metalice, care rezistă câțiva ani afară fără să se decoloreze sau să se rupă din vânt. Adaugă suprafața (mp), numărul de camere și telefonul cu cifre mari, ca cititul să nu ceară efort din mers sau din mașină. Comanda se face în câteva minute din <a href="/configurator/banner">configuratorul de bannere</a>, unde alegi dimensiunea potrivită ferestrei sau balconului tău.</p>`
  },
  "vand-teren": {
    key: "vand-teren",
    title: "Banner VÂND TEREN — Semnalizare Loturi",
    shortDescription: "Banner specific pentru terenuri intravilane sau extravilane, cu suprafață mare pentru citire de la distanță.",
    seoTitle: "Banner Vand Teren | Intravilan & Extravilan",
    seoDescription: "Bannere mari pentru vânzare terenuri, montabile pe țăruși sau gard. Rezistență UV și la vânt garantată de material.",
    images: ["/products/banner/teren-de-vanzare.jpg"],
    contentHtml: `<h2>Semnalizează terenul direct la locație</h2><p>Cine caută un teren de vânzare vizitează de regulă zona personal, așa că un banner montat direct pe parcelă convertește mult mai bine decât un anunț online. Pentru terenurile extravilane, unde vântul bate liber, recomandăm mesh perforat sau PVC cu ochiuri de aerisire suplimentare, ca pânza să nu se rupă din rafale. Include suprafața în mp, categoria de folosință (intravilan/extravilan, arabil/construcții) și un număr de telefon vizibil de la marginea drumului. Poți alege un format lat, tip 3x1m sau 4x1m, direct din <a href="/configurator/banner">configuratorul de bannere</a>, montabil ușor pe țăruși sau structură de lemn.</p>`
  },
  "spatiu-comercial": {
    key: "spatiu-comercial",
    title: "Banner SPAȚIU COMERCIAL — Vânzare/Închiriere",
    shortDescription: "Banner pentru vitrine de spații comerciale libere, cu mesaj clar 'De Închiriat' sau 'De Vânzare' și date de contact.",
    seoTitle: "Banner Spatiu Comercial | Vitrine & Fatade",
    seoDescription: "Banner pentru spații comerciale libere, print la rezoluție mare pentru impact vizual din trafic pietonal și auto.",
    images: ["/products/banner/spatiu-de-inchiriat.jpg"],
    contentHtml: `<h2>Valorifică spațiul comercial</h2><p>Un spațiu comercial liber, marcat doar cu o hârtie lipită pe geam, transmite exact opusul a ceea ce vrei — un banner profesional arată că proprietatea e gestionată serios. Pentru vitrine recomandăm print pe folie perforată (one way vision) dacă vrei să păstrezi vizibilitatea din interior, sau PVC clasic dacă montezi pe fațadă. Include suprafața, activitatea permisă (comercial, HoReCa, birou) și telefonul cu font îngroșat. Configurează dimensiunea exactă a vitrinei tale în <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "dezvoltator-imobiliar": {
    key: "dezvoltator-imobiliar",
    title: "Bannere Dezvoltatori Imobiliari — Ansambluri Rezidențiale",
    shortDescription: "Mesh-uri de fațadă și bannere gigant pentru șantiere și ansambluri rezidențiale în construcție, cu randări fotorealiste.",
    seoTitle: "Print Outdoor Dezvoltatori Imobiliari | Mesh & Banner",
    seoDescription: "Soluții outdoor pentru dezvoltatori: mesh fațadă, banner de gard, panouri de investiție. Format mare, print rezistent.",
    images: ["/products/banner/Vila-de-vanzare.jpg"],
    contentHtml: `<h2>Branding de șantier</h2><p>Pe durata construcției, șantierul tău este cea mai vizibilă reclamă pe care o ai, așa că merită tratat ca un panou publicitar, nu doar ca o zonă îngrădită. Mesh-ul de fațadă (270-300g/m²) lasă vântul să treacă prin material, deci poate fi montat pe schele sau plase de protecție fără riscul să se rupă la rafale. Randările fotorealiste ale ansamblului finalizat, alături de stadiul lucrărilor și datele de contact ale echipei de vânzări, transformă trecătorii curioși în leaduri reale. Pentru gard recomandăm PVC 440g/m² cu tiv și capse, iar pentru suprafețe mari discutăm direct dimensiunile și grafica personalizată.</p>`
  },


  // --- AUTO & MOTO ---
  "service-auto": {
    key: "service-auto",
    title: "Banner Service Auto — Mecanică & Diagnoză",
    shortDescription: "Banner pentru service auto, cu serviciile principale listate clar — mecanică, electrică, diagnoză computerizată.",
    seoTitle: "Banner Service Auto | Reclama Atelier Mecanic",
    seoDescription: "Banner service auto rezistent la ulei și exterior. Atrage clienți direct din trafic. Livrare rapidă.",
    images: ["/products/banner/service-auto.jpg"],
    contentHtml: `<h2>Vizibilitate pentru service-ul tău</h2><p>Șoferii care caută un service de încredere decid de multe ori pe loc, când văd un banner clar montat la stradă, așa că listarea serviciilor principale — mecanică, electrică, tinichigerie, diagnoză — contează mai mult decât un slogan generic. Materialul contează la fel de mult: un PVC 440g/m² rezistă la stropii de ulei, praful din curte și expunerea directă la soare fără să se decoloreze în câteva luni. Adaugă programul de funcționare și numărul de telefon cu cifre mari, vizibile din mers. Poți configura banner-ul potrivit pentru gardul sau fațada atelierului direct din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "vulcanizare": {
    key: "vulcanizare",
    title: "Banner Vulcanizare — Schimb Anvelope",
    shortDescription: "Banner 'VULCANIZARE', 'SCHIMB ROȚI', 'ECHILIBRARE', pregătit pentru sezonul de vârf.",
    seoTitle: "Banner Vulcanizare & Roti | Semnalistica Auto",
    seoDescription: "Banner vulcanizare vizibil de la mare distanță. Pregătește-te de sezon din timp. Livrare rapidă.",
    images: ["/products/banner/Vulcanizare.jpg"],
    contentHtml: `<h2>Nu rata sezonul de schimb anvelope</h2><p>În lunile de vârf, vulcanizările câștigă clienți mai ales din trafic, deci vizibilitatea de la distanță contează cel mai mult — literă mare, contrast puternic (galben-negru sau roșu-alb) și mesajul "DESCHIS" bine văzut. Pentru montaj rapid sezonier recomandăm capse întărite din 50 în 50 cm, ca banner-ul să reziste la demontat și remontat de câteva ori pe an fără să se rupă la colțuri. Menționează și serviciile conexe — echilibrare, geometrie, depozitare anvelope — pentru a crește valoarea medie a comenzii. Comandă din timp din <a href="/configurator/banner">configuratorul de bannere</a>, ca să fii pregătit înainte de vârful de sezon.</p>`
  },
  "itp": {
    key: "itp",
    title: "Banner Stație ITP — Inspecție Tehnică",
    shortDescription: "Banner pentru stații ITP, cu mesaj clar 'ITP Fără Programare' sau 'ITP Rapid' și program de lucru vizibil.",
    seoTitle: "Banner ITP | Reclama Statie Inspectie Tehnica",
    seoDescription: "Banner ITP autorizat, text mare și clar pentru șoferi. Rezistent la exterior tot anul.",
    images: ["/products/banner/service-auto.jpg"],
    contentHtml: `<h2>Atrage clienți la ITP</h2><p>Șoferii caută de obicei o stație ITP în ultimul moment, deci un banner citibil rapid, din mers, face diferența între o mașină care oprește și una care trece mai departe. Recomandăm literă groasă, fără fonturi decorative, plus mențiuni clare precum "Fără Programare" sau "ITP Rapid" dacă acestea sunt reale avantaje ale stației tale. Materialul PVC 440g/m² rezistă anotimp după anotimp, montat pe gard sau pe structura stației, fără să se decoloreze la soare. Poți configura dimensiunea și textul direct în <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "spalatorie-auto": {
    key: "spalatorie-auto",
    title: "Banner Spălătorie Auto — Self Wash & Detailing",
    shortDescription: "Banner rezistent la apă pentru spălătorii, cu prețuri și program de funcționare afișate clar.",
    seoTitle: "Banner Spalatorie Auto | Self Service",
    seoDescription: "Bannere outdoor pentru spălătorii auto, rezistente la umezeală și stropi. Vizibilitate din trafic.",
    images: ["/products/banner/spalatorie-haine.jpg"], // Fallback image
    contentHtml: `<h2>Semnalizare pentru spălătoria ta</h2><p>O spălătorie auto trăiește din traficul care trece prin apropiere, deci un banner cu prețurile principale afișate clar — spălare exterior, interior, pachet complet — scurtează decizia clientului înainte să ajungă la intrare. Materialul trebuie să facă față stropilor de apă, spumei și umezelii constante fără să se dezlipească sau să pălească, motiv pentru care recomandăm PVC laminat cu cerneluri UV rezistente. Menționează și facilitățile suplimentare, cum ar fi jetoanele self-service sau aspiratorul, dacă acestea sunt un avantaj real. Configurează dimensiunea potrivită locației tale din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "piese-auto": {
    key: "piese-auto",
    title: "Banner Piese Auto — Magazin & Dezmembrări",
    shortDescription: "Banner pentru magazine de piese auto sau dezmembrări, cu categoriile principale de produse afișate clar.",
    seoTitle: "Banner Piese Auto & Dezmembrari",
    seoDescription: "Banner piese auto pentru magazin sau dezmembrări, rezistent outdoor, vizibil din trafic.",
    images: ["/products/banner/PIESE-AUTO.jpg"],
    contentHtml: `<h2>Piese auto disponibile imediat</h2><p>Clienții care caută piese auto vor de obicei confirmarea rapidă că le găsesc "aici", deci un banner cu mărcile sau categoriile principale — piese noi, piese dezmembrări, comandă rapidă — scurtează drumul de la trecător la client. Pentru un depozit sau curte exterioară, PVC 440g/m² cu capse întărite rezistă bine la manevrarea frecventă și la expunerea directă la soare. Dacă lucrezi și cu comenzi la cerere, menționează asta explicit — mulți clienți nu știu că poți aduce o piesă rară în câteva zile. Comandă banner-ul din <a href="/configurator/banner">configuratorul de bannere</a> în formatul potrivit gardului sau clădirii.</p>`
  },
  "tractari-auto": {
    key: "tractari-auto",
    title: "Banner Tractări Auto — Non Stop",
    shortDescription: "Banner simplu și eficient pentru servicii de tractare non-stop, cu numărul de telefon în prim-plan.",
    seoTitle: "Banner Tractari Auto Non Stop",
    seoDescription: "Banner tractări auto non-stop, text mare pentru citire rapidă zi și noapte. Livrare rapidă.",
    images: ["/products/banner/service-auto.jpg"],
    contentHtml: `<h2>Servicii de urgență, vizibile instant</h2><p>La un banner de tractări, mai puțin înseamnă mai mult: cuvântul "TRACTĂRI" și numărul de telefon, scrise mare, fac treaba mai bine decât orice text explicativ, pentru că decizia clientului se ia în câteva secunde, adesea din mașină. Pentru sediul firmei sau parcarea platformelor, recomandăm un banner rezistent la intemperii, montat astfel încât să fie vizibil și noaptea dacă ai iluminat zona. Menționează "NON-STOP" doar dacă serviciul chiar este disponibil 24/7, ca să nu pierzi credibilitate la primul apel ratat. Configurează rapid dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- CONSTRUCȚII & MESERIAȘI ---
  "constructii": {
    key: "constructii",
    title: "Banner Construcții — Echipă & Servicii",
    shortDescription: "Banner pentru firme de construcții, cu serviciile principale listate — case la roșu, la cheie, renovări, acoperișuri.",
    seoTitle: "Banner Firma Constructii & Renovari",
    seoDescription: "Banner de gard pentru șantiere sau sedii de firme din construcții. Rezistent la vânt și intemperii.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Arată ce poți construi</h2><p>Un banner montat pe gardul șantierului sau la sediul firmei funcționează ca o carte de vizită permanentă pentru toți cei care trec prin zonă, deci listarea clară a serviciilor — la roșu, la cheie, renovări, instalații, acoperișuri — ajută vizitatorul să înțeleagă imediat ce oferi. Pentru expunere pe termen lung pe gard de șantier, recomandăm PVC 440g/m² sau mesh perforat dacă zona e expusă la vânt puternic, ca pânza să nu se rupă din rafale. Include telefonul și, dacă ai, anul înființării firmei sau portofoliul de proiecte finalizate, pentru credibilitate suplimentară. Configurează formatul potrivit gardului tău din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "santier-in-lucru": {
    key: "santier-in-lucru",
    title: "Panou/Banner Șantier în Lucru — Avertizare",
    shortDescription: "Semnalizare obligatorie de protecția muncii — 'Atenție cad obiecte', 'Acces Interzis', 'Purtați cască'.",
    seoTitle: "Banner Santier in Lucru | Protectia Muncii",
    seoDescription: "Bannere de avertizare pentru șantiere, rezistente la intemperii, obligatorii pentru protecția muncii.",
    images: ["/products/banner/nu-blocati.jpg"],
    contentHtml: `<h2>Siguranța pe primul loc</h2><p>Panourile de avertizare la un șantier nu sunt doar o formalitate — delimitează clar zona periculoasă și reduc riscul de accidente pentru trecători și lucrători deopotrivă. Pentru acest tip de semnalizare recomandăm culori de avertizare standard (galben-negru sau roșu-alb) și pictograme mari, ușor de recunoscut chiar și de la distanță sau din mers. Materialul trebuie să reziste la praf, vânt și ploaie pe toată durata lucrărilor, așa că PVC 440g/m² cu capse întărite este alegerea potrivită pentru montaj pe gard sau structuri metalice. Poți combina mai multe mesaje pe același gard — comandă seturi complete din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "materiale-constructii": {
    key: "materiale-constructii",
    title: "Banner Depozit Materiale Construcții",
    shortDescription: "Banner pentru depozite de materiale — ciment, fier, lemn, cu servicii precum transport gratuit.",
    seoTitle: "Banner Depozit Materiale Constructii",
    seoDescription: "Bannere mari pentru depozite de materiale de construcții. Listează produsele principale.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Totul pentru casa ta, la un singur depozit</h2><p>Constructorii și beneficiarii care trec cu mașina pe lângă un depozit iau decizia de a opri în funcție de ce văd în câteva secunde, deci un banner cu produsele principale — ciment, fier beton, lemn, cărămidă — și un beneficiu concret, cum ar fi transportul gratuit, chiar contează. Pentru un depozit exterior, PVC 440g/m² rezistă bine la praf și la manevrarea utilajelor din apropiere, iar capsele întărite țin banner-ul fixat chiar și la vânt puternic. Actualizează periodic prețurile sau ofertele afișate, ca informația să rămână relevantă. Configurează dimensiunea potrivită gardului depozitului din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "amenajari-interioare": {
    key: "amenajari-interioare",
    title: "Banner Amenajări Interioare — Design & Finisaje",
    shortDescription: "Banner pentru firme de design interior, gresie, faianță și parchet, cu imagini reale din portofoliu.",
    seoTitle: "Banner Amenajari Interioare & Design",
    seoDescription: "Banner pentru showroom-uri de amenajări interioare. Print la rezoluție mare pentru imagini de calitate.",
    images: ["/products/banner/MAGAZIN-DECORATIUNI.jpg"],
    contentHtml: `<h2>Inspiră clienții înainte să intre pe ușă</h2><p>La amenajări interioare, decizia clientului pornește aproape mereu de la o imagine — un interior renovat, o combinație de gresie și faianță, un living amenajat — deci un banner cu fotografii reale din portofoliu convinge mai mult decât orice text. Recomandăm print de rezoluție mare, ca detaliile texturilor și culorilor să rămână clare chiar și de la câțiva metri distanță. Pentru vitrina unui showroom poți alege și folie perforată, care păstrează vizibilitatea din interior către stradă. Configurează dimensiunea potrivită vitrinei sau fațadei din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- HORECA (Hoteluri, Restaurante, Cafenele) ---
  "restaurant": {
    key: "restaurant",
    title: "Banner Restaurant — Meniul Zilei & Evenimente",
    shortDescription: "Banner apetisant pentru restaurante — meniul zilei, program de livrări, evenimente private.",
    seoTitle: "Banner Restaurant & Terasa | Outdoor Horeca",
    seoDescription: "Printuri culinare de înaltă rezoluție pentru restaurante, rezistente la exterior. Comandă rapid online.",
    images: ["/products/banner/RESTAURANT.jpg"],
    contentHtml: `<h2>Gustul care atrage clienți</h2><p>La un restaurant, o fotografie bună cu mâncare convinge mai repede decât orice descriere, deci merită să investești în imagini de calitate reală, nu în poze generice care nu seamănă cu ce servești efectiv. Pentru terase și fațade, PVC 440g/m² cu print UV rezistă la soare fără să-și piardă culorile pe parcursul sezonului cald. Include mesajele care contează în decizia clientului — livrare, meniul zilei, evenimente private — și un contact vizibil de la stradă. Configurează formatul potrivit terasei sau intrării din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "pizzerie": {
    key: "pizzerie",
    title: "Banner Pizzerie — Oferta 1+1 & Livrare",
    shortDescription: "Banner pentru pizzerii — pizza pe vatră, livrare gratuită, oferte family, vizibil din trafic pietonal și auto.",
    seoTitle: "Banner Pizzerie | Livrare Pizza",
    seoDescription: "Banner pizzerie pentru creșterea comenzilor de livrare. Vizibil în cartier, rezistent la exterior.",
    images: ["/products/banner/PIZZERIE.jpg"],
    contentHtml: `<h2>Cea mai bună pizza din cartier</h2><p>O pizzerie de cartier trăiește din comenzi repetate, deci un banner care afișează clar oferta principală — pizza pe vatră, livrare gratuită, oferte family — și numărul de telefon aduce clienți fideli mai repede decât reclama online. Recomandăm print pe PVC 440g/m² cu o imagine apetisantă a produsului vedetă, plus text mare pentru număr, vizibil și noaptea dacă zona e luminată. Actualizează banner-ul la fiecare campanie majoră, ca oferta afișată să rămână mereu valabilă. Configurează rapid dimensiunea potrivită vitrinei tale din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "fast-food": {
    key: "fast-food",
    title: "Banner Fast Food — Shaorma & Burger",
    shortDescription: "Banner stradal pentru fast-food, cu culori vii și imagini reale ale produselor pentru trafic pietonal intens.",
    seoTitle: "Banner Fast Food & Shaormerie",
    seoDescription: "Bannere fast-food luminoase și clare pentru atragerea clienților din trafic pietonal. Livrare rapidă.",
    images: ["/products/banner/FastFood.jpg"],
    contentHtml: `<h2>Mâncare rapidă, decizie rapidă</h2><p>Într-o zonă cu trafic pietonal intens, ai câteva secunde să convingi un trecător flămând să intre, deci culorile vii, o poză reală a produsului și un preț clar bat orice mesaj lung sau text stufos. Pentru locațiile stradale recomandăm un banner cu contrast puternic, montat la înălțimea privirii, nu sus pe fațadă unde se pierde din atenție. Materialul PVC 440g/m² rezistă bine la manevrarea și demontarea frecventă, dacă schimbi oferta des. Configurează formatul potrivit vitrinei sau standului din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "cafenea": {
    key: "cafenea",
    title: "Banner Cafenea & Coffe To Go",
    shortDescription: "Banner elegant pentru cafenele — 'Coffee To Go', specialty coffee, cu design modern și minimalist.",
    seoTitle: "Banner Cafenea & Coffe Shop",
    seoDescription: "Banner cafenea cu design modern și atractiv. Semnalizează locația ta de cafea de calitate.",
    images: ["/products/banner/TERASA.jpg"],
    contentHtml: `<h2>Semnalizează cafeaua bună din zonă</h2><p>La o cafenea, imaginea contează la fel de mult ca mesajul — un design curat, minimalist, cu tipografie elegantă comunică "specialty coffee" mai bine decât un banner supraîncărcat de text. Recomandăm print pe PVC mat sau satinat, care reduce reflexiile puternice pe soare și păstrează un aspect premium. Include mesajul cheie — "Coffee To Go", ora de deschidere, sau conexiune wifi dacă e un avantaj real pentru clienți. Configurează dimensiunea potrivită vitrinei din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "nunti-botezuri": {
    key: "nunti-botezuri",
    title: "Banner Organizare Evenimente — Săli & Corturi",
    shortDescription: "Banner pentru săli de evenimente — organizăm nunți, botezuri, mese festive, cu capacitatea sălii evidențiată.",
    seoTitle: "Banner Sala Evenimente & Nunti",
    seoDescription: "Banner pentru săli de evenimente. Promovează capacitatea și facilitățile pentru sezonul de nunți.",
    images: ["/products/banner/RESTAURANT.jpg"],
    contentHtml: `<h2>Locația ideală pentru evenimentul lor</h2><p>Cuplurile care caută o sală de evenimente compară de obicei mai multe opțiuni în aceeași zi, deci un banner vizibil de la stradă, cu capacitatea sălii și tipurile de evenimente organizate, îi poate opri exact la locația ta. Menționează concret ce oferi — nunți, botezuri, mese festive, corturi — și numărul de invitați pe care îl poți găzdui, pentru că această cifră influențează direct decizia. Pentru fațada sau gardul sălii recomandăm PVC 440g/m² rezistent la intemperii, montat astfel încât să rămână vizibil în tot sezonul. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "cazare": {
    key: "cazare",
    title: "Banner Cazare / Pensiune / Hotel",
    shortDescription: "Banner 'CAZARE', 'CAMERE LIBERE', esențial în zone turistice cu trafic de mașini.",
    seoTitle: "Banner Cazare & Pensiuni | Turism",
    seoDescription: "Banner cazare pentru pensiuni în zone turistice. Atrage turiștii direct de la stradă.",
    images: ["/products/banner/Vila-de-inchiriat.jpg"],
    contentHtml: `<h2>Prima impresie pentru turiștii de pe drum</h2><p>În zonele turistice, mulți oaspeți decid unde se cazează chiar în timp ce conduc, căutând un banner "CAZARE" sau "CAMERE LIBERE" vizibil de la drum, deci poziționarea și mărimea textului contează cel puțin la fel de mult ca designul. Recomandăm PVC 440g/m² rezistent la soare și ploaie, pentru că un banner de intrare rămâne montat sezoane întregi fără întreținere. Include facilitățile cheie — parcare, mic dejun inclus, vedere la munte/mare — și numărul de telefon pentru rezervări directe, fără comision de platformă. Configurează formatul potrivit porții sau fațadei pensiunii din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- BEAUTY & MEDICAL ---
  "salon-infrumusetare": {
    key: "salon-infrumusetare",
    title: "Banner Salon Înfrumusețare — Coafor & Cosmetică",
    shortDescription: "Banner elegant pentru saloane, cu serviciile principale — tuns, vopsit, manichiură — afișate clar.",
    seoTitle: "Banner Salon Infrumusetare & Coafor",
    seoDescription: "Bannere outdoor pentru saloane de beauty, design atrăgător pentru clientela din cartier.",
    images: ["/products/banner/barbershop.jpg"], // Fallback visual
    contentHtml: `<h2>Frumusețe și stil, la vedere</h2><p>Un salon nou sau relocat are nevoie de vizibilitate imediată în cartier, iar un banner elegant, cu paleta de culori a brandului tău și serviciile principale listate, aduce clientele care altfel nu ar fi știut că exiști. Recomandăm print de calitate pe PVC satinat, care redă bine tonurile pastel și imaginile din portofoliu fără să pară ieftin. Include programările — "fără programare" sau "programare telefonică" — pentru că acesta e adesea un criteriu de decizie. Configurează dimensiunea potrivită vitrinei salonului din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "frizerie": {
    key: "frizerie",
    title: "Banner Frizerie / Barber Shop",
    shortDescription: "Banner masculin, stil Barber Shop — tuns, barbă, fără programare, cu design puternic și contrastant.",
    seoTitle: "Banner Frizerie & Barber Shop",
    seoDescription: "Semnalistică pentru frizerii și barber shop-uri, stil clasic sau modern, vizibilă din stradă.",
    images: ["/products/banner/barbershop.jpg"],
    contentHtml: `<h2>Stil masculin, semnalizat clar</h2><p>Barber shop-urile funcționează bine cu un banner cu identitate vizuală puternică — contrast alb-negru sau roșu clasic, tipografie robustă — care comunică din prima privire genul de serviciu oferit. Menționează dacă lucrezi fără programare, pentru că mulți clienți masculini preferă să vină direct fără să sune înainte. Materialul PVC 440g/m² rezistă bine expus la soare direct pe fațadă, fără să-și piardă contrastul în timp. Configurează dimensiunea potrivită vitrinei din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "stomatologie": {
    key: "stomatologie",
    title: "Banner Cabinet Stomatologic — Urgențe Dentare",
    shortDescription: "Banner curat, profesional pentru cabinete stomatologice — implanturi, radiologie, urgențe dentare.",
    seoTitle: "Banner Cabinet Stomatologic & Dentist",
    seoDescription: "Banner profesional pentru clinici stomatologice. Inspiră încredere pacienților noi din zonă.",
    images: ["/products/banner/Cabinet-Stomatologic.jpg"],
    contentHtml: `<h2>Zâmbetul tău contează</h2><p>Un cabinet stomatologic câștigă încrederea pacienților noi printr-o imagine curată și profesională, deci un banner cu design minimalist, culori medicale (alb, albastru) și fără elemente stridente transmite exact senzația de siguranță pe care o caută pacienții. Menționează serviciile de bază — implanturi, radiologie, urgențe — pentru că acestea sunt criteriile principale de căutare. Pentru o clinică nouă sau relocată, un banner vizibil la intrare, montat pe câteva luni, aduce pacienți din zonă care altfel nu ar fi știut de deschidere. Configurează formatul potrivit fațadei cabinetului din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "farmacie": {
    key: "farmacie",
    title: "Banner Farmacie / Plafar",
    shortDescription: "Banner cu cruce verde sau design specific farmaceutic, ideal pentru semnalizare 'Non-Stop'.",
    seoTitle: "Banner Farmacie & Plafar | Semnalistica Medicala",
    seoDescription: "Semnalizează farmacia ta pentru vizibilitate stradală maximă, zi și noapte.",
    images: ["/products/banner/servicii-medicale.jpg"],
    contentHtml: `<h2>Sănătate aproape de tine</h2><p>Farmaciile noi sau relocate au nevoie ca oamenii din zonă să știe imediat unde s-a mutat sau deschis punctul de lucru, iar un banner cu crucea verde clasică rezolvă asta instant, fără ambiguitate. Dacă lucrezi non-stop sau ai program prelungit, scrie asta clar — este un criteriu important pentru clienți, mai ales seara. Materialul trebuie să reziste la expunere continuă, ani la rând, așa că PVC 440g/m² cu cerneluri UV rezistente e alegerea potrivită. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "veterinar": {
    key: "veterinar",
    title: "Banner Cabinet Veterinar & Pet Shop",
    shortDescription: "Banner cu animale pentru cabinete veterinare și pet shop-uri — urgențe, hrană pentru animale, consultații.",
    seoTitle: "Banner Cabinet Veterinar | Pet Shop",
    seoDescription: "Atrage iubitorii de animale la cabinetul tău veterinar cu un banner clar și prietenos.",
    images: ["/products/banner/PET-SHOP.jpg"],
    contentHtml: `<h2>Grijă pentru prietenii necuvântători</h2><p>Stăpânii de animale caută liniștea că au un cabinet veterinar de încredere aproape de casă, deci un banner prietenos, cu imagini reale de animale și mesajul "Urgențe" bine vizibil, funcționează ca reper local pentru situații neplanificate. Menționează și serviciile conexe — hrană, accesorii, tunsoare — dacă operezi și ca pet shop, pentru a crește valoarea vizitei medii. Pentru vitrina cabinetului, un banner PVC cu imagini colorate atrage atenția fără să pară agresiv. Configurează formatul potrivit din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- RETAIL & MAGAZINE ---
  "magazin-alimentar": {
    key: "magazin-alimentar",
    title: "Banner Magazin Alimentar / Mixt",
    shortDescription: "Banner pentru magazine alimentare de cartier — 'Deschis', 'Pâine Proaspătă', 'Legume Fructe'.",
    seoTitle: "Banner Magazin Alimentar & Supermarket",
    seoDescription: "Crește vânzările magazinului de cartier cu oferte vizibile pe un banner rezistent la exterior.",
    images: ["/products/banner/magazin-alimentar.jpg"],
    contentHtml: `<h2>Produse proaspete, anunțate zilnic</h2><p>Magazinele de cartier concurează cu marile lanțuri prin proximitate și prospețime, deci un banner care anunță clar "Pâine Proaspătă" sau "Legume Fructe" convinge un trecător să intre mai repede decât un simplu nume de firmă. Recomandăm text mare, contrast puternic și, dacă se poate, o oră de aprovizionare zilnică menționată — clienții apreciază predictibilitatea. Materialul PVC 440g/m² rezistă bine montat pe fațadă sau lângă vitrină, indiferent de anotimp. Configurează dimensiunea potrivită din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "haine": {
    key: "haine",
    title: "Banner Magazin Haine & Încălțăminte",
    shortDescription: "Banner fashion pentru magazine de haine și încălțăminte — noua colecție, haine copii, outlet.",
    seoTitle: "Banner Magazin Haine & Fashion",
    seoDescription: "Promovează magazinul de haine cu un banner care evidențiază noile colecții sau reducerile.",
    images: ["/products/banner/MAGAZIN-INCALTAMINTE.jpg"],
    contentHtml: `<h2>Stil și eleganță, la vedere</h2><p>Un magazin de haine atrage cel mai bine cu imagini de lifestyle, nu doar cu text — o fotografie bună cu produsul purtat convinge mai mult decât orice descriere. Alege print de rezoluție mare, ca detaliile materialelor și culorile să rămână fidele originalului, mai ales dacă promovezi o colecție nouă. Menționează clar dacă e vorba de "Outlet" sau "Reduceri", pentru că acestea sunt cuvinte care opresc trecătorii instant. Configurează formatul potrivit vitrinei din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "second-hand": {
    key: "second-hand",
    title: "Banner Magazin Second Hand / Outlet",
    shortDescription: "Banner pentru magazine second hand — marfă nouă, prețuri mici, haine la kilogram.",
    seoTitle: "Banner Second Hand & Outlet",
    seoDescription: "Semnalizează ziua cu marfă nouă și reducerile din magazinul second hand.",
    images: ["/products/banner/MAGAZIN-SECOND-HAND.jpg"],
    contentHtml: `<h2>Calitate la prețuri mici</h2><p>Clienții fideli ai magazinelor second hand urmăresc de obicei "ziua de marfă nouă", deci un banner care anunță clar acest program aduce trafic constant, mai ales dacă e actualizat la fiecare livrare. Menționează și modelul de preț — "la kilogram", "preț fix" — pentru că mulți clienți decid dacă intră tocmai pe baza acestui detaliu. Pentru vitrină sau fațadă, PVC 440g/m² cu text mare rezistă bine la expunere continuă. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "florarie": {
    key: "florarie",
    title: "Banner Florărie — Buchete & Aranjamente",
    shortDescription: "Banner colorat pentru florării — buchete, lumânări, aranjamente pentru evenimente.",
    seoTitle: "Banner Florarie & Aranjamente Florale",
    seoDescription: "Atrage atenția cu imagini florale vibrante pe un banner rezistent la exterior.",
    images: ["/products/banner/CADOURI-PERSONALIZATE.jpg"], // Fallback
    contentHtml: `<h2>Emoție prin culoare</h2><p>O florărie vinde în bună parte prin impuls, deci un banner cu imagini vibrante de buchete sau aranjamente oprește privirea unui trecător grăbit mai eficient decât orice text. Recomandăm print de calitate cu culori saturate, care redau fidel nuanțele florilor reale, nu doar niște desene generice. Menționează serviciile pentru evenimente — nunți, funeralii, aranjamente corporate — dacă acestea reprezintă o parte relevantă din activitate. Configurează formatul potrivit vitrinei din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- SERVICII DIVERSE ---
  "reparatii-telefoane": {
    key: "reparatii-telefoane",
    title: "Banner Service GSM / Reparații Telefoane",
    shortDescription: "Banner pentru service GSM — schimb display, accesorii, reparații rapide pe loc.",
    seoTitle: "Banner Service GSM & Reparatii Telefoane",
    seoDescription: "Semnalizează service-ul GSM cu un banner clar, vizibil într-o zonă aglomerată.",
    images: ["/products/banner/REPARAM-TELEFOANE.jpg"],
    contentHtml: `<h2>Reparații rapide, pe loc</h2><p>Un telefon spart e o urgență pentru majoritatea clienților, deci un banner cu "Schimb Display" sau "Reparații pe Loc" scris mare aduce trafic direct de la trecătorii care caută soluție imediată, nu programare peste o săptămână. Menționează timpul de reparație dacă e scurt — "în 30 de minute" este un argument puternic pentru un service GSM. Pentru vitrina micilor ateliere, un banner PVC cu text mare rezistă bine expus tot anul. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "amanet": {
    key: "amanet",
    title: "Banner Amanet / Exchange",
    shortDescription: "Banner pentru case de amanet — aur, schimb valutar, program non-stop, culori de vizibilitate maximă.",
    seoTitle: "Banner Amanet & Schimb Valutar",
    seoDescription: "Culori galbene specifice pentru vizibilitate maximă a caselor de amanet, rezistente la exterior.",
    images: ["/products/banner/IN-STOC.jpg"], // Fallback generic
    contentHtml: `<h2>Servicii financiare rapide</h2><p>Casele de amanet folosesc de obicei galben intens pentru semnalistică, iar acest contrast puternic e recunoscut instant din trafic — merită păstrat, nu reinventat, pentru că funcționează exact așa cum se așteaptă clienții. Listează clar serviciile — amanet, aur, schimb valutar — și programul, mai ales dacă lucrezi non-stop, pentru că mulți clienți vin în afara programului obișnuit. Materialul PVC 440g/m² rezistă bine la expunere continuă, indiferent de anotimp. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "croitorie": {
    key: "croitorie",
    title: "Banner Croitorie & Retușuri",
    shortDescription: "Banner pentru ateliere de croitorie — croitorie rapidă, scurtat pantaloni, confecționat perdele.",
    seoTitle: "Banner Croitorie & Retusuri Haine",
    seoDescription: "Promovează atelierul de croitorie din cartier cu un banner clar și practic.",
    images: ["/products/banner/CROITORIE-RETUSARI.jpg"],
    contentHtml: `<h2>Haine pe măsura ta</h2><p>Croitoriile de cartier câștigă clienți mai ales prin proximitate — oamenii vor un atelier aproape de casă pentru un retuș rapid, deci un banner vizibil de la stradă, cu serviciile principale listate, aduce clienți constant. Menționează timpii de execuție dacă sunt scurți, pentru retușuri simple precum scurtat pantaloni, pentru că viteza contează în decizia clientului. Pentru vitrina micilor ateliere, un banner simplu, cu text clar, funcționează mai bine decât un design încărcat. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "chei": {
    key: "chei",
    title: "Banner Copiat Chei & Yale",
    shortDescription: "Banner pentru ateliere de copiat chei — chei auto, carcase, ascuțit cuțite.",
    seoTitle: "Banner Copiat Chei & Lacatus",
    seoDescription: "Semnalizare pentru ateliere mici de copiat chei, vizibilă din stradă.",
    images: ["/products/banner/CIZMARIE.jpg"], // Fallback similar craft
    contentHtml: `<h2>Chei duplicate pe loc</h2><p>Un atelier de copiat chei e adesea o afacere mică, ascunsă între alte magazine, deci un banner care iese în evidență clar din peisajul stradal aduce clienți care altfel ar trece pe lângă fără să observe. Menționează serviciile suplimentare — chei auto cu cip, carcase, ascuțit cuțite — pentru că extind gama de clienți potențiali. Materialul PVC rezistă bine chiar și pe o vitrină mică, expus direct la soare. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- EVENIMENTE & SĂRBĂTORI ---
  "la-multi-ani": {
    key: "la-multi-ani",
    title: "Banner La Mulți Ani — Aniversări & Petreceri",
    shortDescription: "Banner festiv personalizat cu nume și fotografie pentru zile de naștere și aniversări.",
    seoTitle: "Banner La Multi Ani Personalizat | Aniversare",
    seoDescription: "Surprinde sărbătoritul cu un banner uriaș 'La Mulți Ani', personalizat cu nume și poză.",
    images: ["/products/banner/la-multi-ani.jpg"],
    contentHtml: `<h2>O surpriză de neuitat</h2><p>Un banner personalizat cu numele și fotografia sărbătoritului transformă o petrecere obișnuită într-un moment memorabil, mai ales dacă e montat ca prim lucru pe care oaspeții îl văd la intrare. Pentru petreceri interioare poți alege un material mai subțire și ușor, iar pentru curte sau grădină recomandăm PVC rezistent la vânt, mai ales dacă evenimentul se ține afară. Trimite-ne o fotografie de bună calitate — rezultatul final depinde direct de rezoluția imaginii originale. Personalizează textul și dimensiunea în <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "botez": {
    key: "botez",
    title: "Banner Botez — Bun Venit & Decor",
    shortDescription: "Banner 'Bine ați venit la Botezul meu' personalizat cu fotografia bebelușului, pentru decor de sală.",
    seoTitle: "Banner Botez Personalizat | Decor Sala",
    seoDescription: "Decor personalizat pentru sala de botez, cu tematici diverse — culori pastel, teme pentru copii.",
    images: ["/products/banner/CADOURI-PERSONALIZATE.jpg"],
    contentHtml: `<h2>Primul eveniment important</h2><p>Un banner de bun venit personalizat cu poza bebelușului și numele lui creează un decor de sală memorabil, potrivit ca fundal pentru pozele invitaților la intrare sau lângă masa cadourilor. Alege culori pastel sau tematica preferată — poți include și data evenimentului pentru un plus de personalizare. Pentru un rezultat clar, trimite-ne o fotografie cât mai bine luminată; noi ajustăm restul la print. Configurează dimensiunea potrivită sălii din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "nunta": {
    key: "nunta",
    title: "Banner Nuntă — Welcome & Photo Corner",
    shortDescription: "Banner elegant pentru nuntă — 'Casa de Piatră' sau fundal personalizat pentru photo corner.",
    seoTitle: "Banner Nunta & Photo Corner",
    seoDescription: "Bannere elegante pentru nunți, personalizate cu numele mirilor și data evenimentului.",
    images: ["/products/banner/vrei-sa-fii-sotia-mea.jpg"],
    contentHtml: `<h2>Eleganță și amintiri</h2><p>Un photo corner bine făcut devine unul dintre cele mai fotografiate colțuri ale nunții, deci merită un banner cu design elegant, numele mirilor și data evenimentului, potrivit stilului general al petrecerii. Pentru locații interioare recomandăm print mat, care evită reflexiile în poze la lumină de bliț sau spoturi. Dacă evenimentul are loc afară, alege PVC rezistent la vânt, montat pe o structură stabilă. Personalizează textul și designul în <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "black-friday": {
    key: "black-friday",
    title: "Banner Black Friday — Reduceri Explozive",
    shortDescription: "Banner negru-roșu pentru campanii de Black Friday, cu reducerile afișate clar și vizibil.",
    seoTitle: "Banner Black Friday | Afise Reduceri",
    seoDescription: "Pregătește magazinul pentru cele mai mari reduceri din an cu un banner Black Friday impactant.",
    images: ["/products/banner/BLACK-FRIDAY.jpg"],
    contentHtml: `<h2>Cele mai mari reduceri, comunicate clar</h2><p>În perioada Black Friday, clienții scanează rapid vitrinele în căutarea celui mai bun procent, deci un banner cu cifra reducerii scrisă mare — "-50%", "-70%" — oprește privirea mult mai eficient decât textul descriptiv. Contrastul negru-roșu funcționează bine pentru că e deja asociat de public cu perioada de reduceri. Comandă din timp, cu cel puțin o săptămână înainte de eveniment, ca să eviți graba de ultim moment specifică acestei perioade. Configurează rapid banner-ul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "sarbatori": {
    key: "sarbatori",
    title: "Banner Sărbători — Crăciun & Paște",
    shortDescription: "Banner decorativ 'Sărbători Fericite' pentru firme, magazine și instituții, potrivit de Crăciun sau Paște.",
    seoTitle: "Banner Sarbatori Fericite | Craciun & Paste",
    seoDescription: "Bannere stradale cu urări de sărbători pentru firme și instituții publice.",
    images: ["/products/banner/WINTER-SALE.jpg"],
    contentHtml: `<h2>Atmosferă de sărbătoare</h2><p>Un banner cu urări de sărbători decorează fațada și transmite grijă pentru clienți sau cetățeni, fiind potrivit atât pentru vitrine de magazin cât și pentru clădiri instituționale. Alege o paletă de culori specifică sezonului — roșu-auriu pentru Crăciun, pastel pentru Paște — pentru un aspect coerent cu decorul din jur. Materialul PVC rezistă bine la vremea specifică sezonului rece sau la ploile de primăvară. Configurează designul potrivit din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- INSTITUȚII & COMUNITATE ---
  "primarie": {
    key: "primarie",
    title: "Banner Primărie — Informări & Evenimente",
    shortDescription: "Bannere pentru primării — informări publice, 'Zilele Comunei', proiecte de investiții în derulare.",
    seoTitle: "Banner Primarie & Institutii Publice",
    seoDescription: "Print outdoor pentru instituții publice — bannere stradale transversale sau panouri informative.",
    images: ["/products/banner/produs-in-romania.jpg"],
    contentHtml: `<h2>Comunicare directă cu cetățenii</h2><p>Un banner instituțional bine plasat — la intrarea în primărie, pe un panou stradal sau transversal — ajunge la mai mulți cetățeni decât o postare pe rețele sociale, mai ales în comunitățile unde nu toată lumea e activă online. Pentru evenimente locale ("Zilele Comunei") sau anunțuri despre proiecte de investiții, recomandăm text clar, oficial, ușor de citit chiar și de la distanță. Materialul PVC 440g/m² rezistă bine la intemperii pe toată durata expunerii, indiferent de anotimp. Configurează formatul potrivit locației din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "biserica": {
    key: "biserica",
    title: "Banner Biserică — Hram & Sărbători",
    shortDescription: "Banner pentru biserici — hramul bisericii, sărbători religioase, mesaje pentru comunitate.",
    seoTitle: "Banner Biserica & Parohie | Religios",
    seoDescription: "Bannere rezistente pentru lăcașuri de cult, potrivite pentru hram și sărbători religioase.",
    images: ["/products/banner/la-multi-ani.jpg"],
    contentHtml: `<h2>Mesaje pentru comunitate</h2><p>Un banner cu hramul bisericii sau o urare de sărbătoare la intrarea în curtea lăcașului de cult transmite un mesaj de bun venit pentru enoriași și vizitatori deopotrivă. Alege un design sobru, respectuos cu specificul evenimentului — hram, Paște, Crăciun — și text lizibil de la distanță pentru cei care trec pe stradă. Materialul rezistă bine la expunere îndelungată, potrivit pentru montaj sezonier repetat an de an. Configurează designul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "scoala": {
    key: "scoala",
    title: "Banner Școală & Grădiniță — Înscrieri",
    shortDescription: "Banner pentru școli și grădinițe — înscrieri deschise, bun venit, evenimente și serbări.",
    seoTitle: "Banner Scoala & Gradinita | Inscrieri",
    seoDescription: "Promovează oferta educațională a școlii sau grădiniței cu un banner clar și vizibil pentru părinți.",
    images: ["/products/banner/RECRUTAM-PERSONAL.jpg"], // Fallback contextual
    contentHtml: `<h2>Educație de calitate, anunțată clar</h2><p>Perioada de înscrieri e fereastra de timp în care părinții iau decizii, deci un banner cu "Înscrieri Deschise" montat vizibil la poarta școlii sau grădiniței aduce vizite din zonă, mai ales de la familii care nu au căutat activ online. Include perioada exactă de înscriere și un contact pentru informații, ca decizia să nu rămână la nivel de intenție. Pentru un aspect prietenos, poți folosi culori vii, potrivite pentru instituții de educație. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- AGRICULTURĂ ---
  "agricol": {
    key: "agricol",
    title: "Banner Agricol — Produse & Utilaje",
    shortDescription: "Banner pentru fermieri și producători locali — vând cereale, fân, utilaje agricole.",
    seoTitle: "Banner Agricol & Produse Locale",
    seoDescription: "Bannere pentru fermieri și producători locali, vizibile de la marginea drumului.",
    images: ["/products/banner/FRUCTE-SI-LEGUME.jpg"],
    contentHtml: `<h2>Susține producătorii locali</h2><p>Vânzarea directă de la poartă funcționează cel mai bine când cumpărătorii care trec cu mașina văd clar ce ai de vânzare, deci un banner mare, montat la marginea drumului sau pe gard, aduce clienți fără intermediari. Pentru terenuri sau ferme expuse la vânt, mesh perforat rezistă mai bine decât PVC-ul clasic, pentru că lasă aerul să treacă prin material. Include produsul principal — cereale, fân, legume — și cantitățile disponibile, dacă vinzi en-gros. Configurează formatul potrivit din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "apicol": {
    key: "apicol",
    title: "Banner Miere de Albine & Produse Apicole",
    shortDescription: "Banner pentru miere naturală și produse apicole — polen, propolis, ceară de albine.",
    seoTitle: "Banner Miere & Apicultor",
    seoDescription: "Semnalizează stupina sau punctul de vânzare miere cu un banner clar și de încredere.",
    images: ["/products/banner/Produse-bio-eco.jpg"],
    contentHtml: `<h2>Miere 100% naturală, vândută direct</h2><p>Clienții care caută miere naturală apreciază proveniența directă de la stupină, deci un banner care marchează clar punctul de vânzare — cu produsele disponibile: miere, polen, propolis — construiește încredere din prima privire. Menționează dacă vinzi și produse sezoniere sau soiuri specifice de miere, pentru că acestea atrag cumpărători dispuși să facă un drum special. Materialul PVC rezistă bine montat la marginea drumului sau la poarta stupinei, expus tot anul. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- ALTELE ---
  "angajam": {
    key: "angajam",
    title: "Banner ANGAJĂM — Recrutare Personal",
    shortDescription: "Cel mai eficient mod de a găsi personal local — 'Angajăm Vânzătoare', 'Șofer', 'Personal Necalificat'.",
    seoTitle: "Banner Angajam Personal | Recrutare",
    seoDescription: "Găsește angajați rapid cu un banner 'ANGAJĂM' montat la intrarea afacerii tale.",
    images: ["/products/banner/ANGAJAM-PERSONAL.jpg"],
    contentHtml: `<h2>Recrutare directă, din zona ta</h2><p>Oamenii care locuiesc aproape de locul de muncă rămân angajați mai mult timp, deci un banner "ANGAJĂM" montat la intrarea magazinului sau firmei ajunge exact la publicul potrivit — cei care trec zilnic prin fața ta. Specifică postul căutat și, dacă poți, un beneficiu concret — program flexibil, salariu de la — pentru că textul generic "Angajăm Personal" atrage mult mai puține candidaturi decât unul specific. Materialul PVC rezistă bine montat câteva luni, până găsești persoana potrivită. Configurează textul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "deschidere": {
    key: "deschidere",
    title: "Banner DESCHIDERE — Open Soon",
    shortDescription: "Banner 'Deschidem în Curând' sau 'Marea Deschidere', pentru a crea așteptare înainte de lansare.",
    seoTitle: "Banner Deschidere Magazin | Grand Opening",
    seoDescription: "Creează suspans înainte de lansarea magazinului cu un banner de deschidere vizibil din stradă.",
    images: ["/products/banner/DESCHIS-ACUM.jpg"],
    contentHtml: `<h2>Lansare cu impact vizual</h2><p>Un banner "Deschidem în Curând" montat cu câteva săptămâni înainte de lansare construiește curiozitate în zonă și pregătește deja un flux de clienți pentru prima zi de funcționare. În ziua deschiderii, schimbă mesajul pe "Marea Deschidere" sau adaugă o ofertă specială de lansare, pentru a transforma curiozitatea în vizite reale. Materialul PVC 440g/m² rezistă bine montat pe fațadă sau gard pe toată perioada premergătoare. Configurează ambele variante din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- AFACERI ȘI PROMOȚII ---
  "discount": {
    key: "discount",
    title: "Banner DISCOUNT — Reduceri Mari",
    shortDescription: "Banner pentru reduceri mari — '50% Reducere', solduri, promoții cu perioadă limitată.",
    seoTitle: "Banner Discount | Reduceri & Promotii",
    seoDescription: "Atrage clienți cu oferte de reducere vizibile pe un banner clar și impactant.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Reduceri comunicate clar</h2><p>Un banner de discount funcționează cel mai bine când cifra reducerii e primul lucru pe care îl vezi, nu ultimul, deci recomandăm procentul scris mare, urmat de categoria de produse și perioada de valabilitate. Reducerile fără termen limită pierd din urgență — menționează explicit "până pe..." sau "stoc limitat" pentru a grăbi decizia clientului. Materialul PVC rezistă bine pentru campanii care durează câteva săptămâni, expus pe vitrină sau fațadă.</p><ul><li>Procentul de reducere, scris mare</li><li>Categoria de produse vizate</li><li>Perioada de valabilitate</li><li>Contact pentru detalii</li></ul>`
  },
  "promotie": {
    key: "promotie",
    title: "Banner Promoție — Ofertă Specială",
    shortDescription: "Banner pentru campanii promoționale și lansări de produse noi, cu ofertă clar comunicată.",
    seoTitle: "Banner Promotie | Campanii Marketing",
    seoDescription: "Lansează promoția cu impact vizual maxim pe un banner clar și convingător.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Ofertă comunicată direct</h2><p>O promoție funcționează doar dacă mesajul e clar din prima privire — produsul, prețul promoțional și perioada de valabilitate trebuie să fie vizibile fără efort, altfel trecătorul continuă drumul fără să se oprească. Recomandăm o singură ofertă principală pe banner, nu mai multe mesaje amestecate, pentru claritate maximă. Materialul PVC 440g/m² rezistă bine pe durata campaniei, indiferent de sezon.</p><ul><li>Produsul vedetă al promoției</li><li>Preț promoțional, scris mare</li><li>Stoc limitat, dacă e cazul</li><li>Data de expirare a ofertei</li></ul>`
  },
  "publicitate": {
    key: "publicitate",
    title: "Banner Publicitate — Branding Exterior",
    shortDescription: "Banner de branding exterior pentru firme, produse sau servicii — logo, mesaj cheie, contact.",
    seoTitle: "Banner Publicitate | Reclama Outdoor",
    seoDescription: "Crește vizibilitatea brandului tău cu bannere profesionale de publicitate outdoor.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Brand puternic, mesaj clar</h2><p>Publicitatea outdoor construiește recunoaștere de brand în timp, deci consistența contează: aceleași culori, același logo și un mesaj scurt, repetat pe toate materialele tale, în loc de un design diferit de fiecare dată. Alege un singur apel la acțiune clar — vizitează site-ul, sună acum, vino în magazin — pentru că prea multe mesaje pe același banner reduc impactul fiecăruia. Materialul și cernelurile UV rezistente păstrează culorile brandului fidele pe termen lung.</p><ul><li>Logo și slogan vizibile</li><li>Un singur mesaj cheie</li><li>Contact și website</li><li>Apel la acțiune clar</li></ul>`
  },
  "firma": {
    key: "firma",
    title: "Banner Firmă — Prezentare Companie",
    shortDescription: "Banner de prezentare pentru firme — logo, servicii principale și date de contact.",
    seoTitle: "Banner Firma | Prezentare Companie",
    seoDescription: "Prezintă firma ta cu un banner reprezentativ la sediu sau punct de lucru.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Compania ta, prezentată clar</h2><p>Un banner la intrarea sediului sau punctului de lucru funcționează ca primă impresie pentru orice vizitator sau client nou, deci merită să reflecte identitatea vizuală reală a firmei — logo, culori, font — nu un design generic. Listează serviciile principale pe scurt, ca vizitatorul să înțeleagă imediat ce faci, fără să caute pe telefon. Materialul PVC 440g/m² rezistă bine pentru afișare permanentă la sediu.</p><ul><li>Logo și identitate vizuală</li><li>Serviciile principale oferite</li><li>Date de contact complete</li><li>Program de lucru</li></ul>`
  },
  "startup": {
    key: "startup",
    title: "Banner Startup — Inovare și Creștere",
    shortDescription: "Banner pentru startup-uri și afaceri noi, potrivit pentru evenimente de lansare sau prezentări.",
    seoTitle: "Banner Startup | Afaceri Inovatoare",
    seoDescription: "Anunță lansarea startup-ului tău cu un banner de prezentare clar și profesional.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Prezentare clară pentru afacerea ta nouă</h2><p>Pentru un startup la început de drum, un banner de prezentare la evenimente, târguri sau la sediu comunică rapid ce problemă rezolvi și pentru cine, fără să ai nevoie de o prezentare orală lungă. Recomandăm un mesaj scurt și concret — ce faci, pentru cine, de ce contează — în loc de sloganuri abstracte greu de reținut. Materialul ușor de transportat e util dacă participi la mai multe evenimente cu același banner.</p><ul><li>Ce problemă rezolvă produsul</li><li>Publicul țintă</li><li>Contact și website</li><li>QR code către prezentare, dacă e cazul</li></ul>`
  },
  "franciza": {
    key: "franciza",
    title: "Banner Franciză — Extindere Afaceri",
    shortDescription: "Banner 'Franciză Disponibilă' pentru extinderea rețelei, cu beneficiile parteneriatului evidențiate.",
    seoTitle: "Banner Franciza | Extindere Business",
    seoDescription: "Atrage francizați cu un banner atractiv care evidențiază beneficiile parteneriatului.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Extinde rețeaua cu parteneri potriviți</h2><p>Un banner "Franciză Disponibilă", montat la un punct de lucru existent care funcționează deja bine, arată potențialilor francizați dovada vie a conceptului — vizibilitate mai convingătoare decât orice broșură. Menționează pe scurt investiția de start și un contact direct pentru discuții, ca interesul să se transforme rapid în conversație. Materialul PVC rezistă bine la expunere pe termen lung, la fel ca restul semnalisticii punctului de lucru.</p><ul><li>Investiția inițială estimată</li><li>Suportul oferit francizaților</li><li>Teritorii disponibile</li><li>Contact direct pentru discuții</li></ul>`
  },
  "reparatii": {
    key: "reparatii",
    title: "Banner Reparații — Servicii Tehnice",
    shortDescription: "Banner pentru servicii de reparații — televizoare, electrocasnice, mobilă, cu garanție oferită.",
    seoTitle: "Banner Reparatii | Service Tehnic",
    seoDescription: "Anunță serviciile de reparații cu garanție pe un banner clar și de încredere.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Reparăm rapid, cu garanție</h2><p>Clienții care caută un service de reparații vor mai ales încredere, deci menționarea garanției oferite pe piesele sau manopera efectuată contează la fel de mult ca lista de dispozitive reparate. Listează clar tipurile de aparate — TV, electrocasnice, mobilă — pentru că specificitatea aduce clienți relevanți, nu doar trafic general. Materialul PVC rezistă bine montat la atelierul sau punctul de lucru pe termen lung.</p><ul><li>Dispozitive reparate</li><li>Garanția oferită</li><li>Prețuri orientative</li><li>Contact rapid pentru diagnoză</li></ul>`
  },
  "instalatii": {
    key: "instalatii",
    title: "Banner Instalații — Electricitate și Gaz",
    shortDescription: "Banner pentru instalatori autorizați — electricitate, încălzire, instalații sanitare.",
    seoTitle: "Banner Instalatii | Electricitate & Sanitara",
    seoDescription: "Promovează serviciile de instalații cu certificările relevante pe un banner profesional.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Instalații sigure, executate de profesioniști</h2><p>La instalații electrice sau sanitare, autorizarea contează enorm în decizia clientului, deci menționarea explicită a certificărilor sau autorizațiilor pe banner construiește încredere înainte chiar de primul contact telefonic. Specifică domeniile de specializare — electricitate, încălzire, sanitare — pentru că mulți clienți caută exact un tip de intervenție, nu servicii generale. Materialul PVC rezistă bine expus la sediul firmei sau pe vehiculul de intervenție.</p><ul><li>Domeniile de specializare</li><li>Autorizații și certificări</li><li>Zona de intervenție</li><li>Contact pentru urgențe</li></ul>`
  },
  "curatenie": {
    key: "curatenie",
    title: "Banner Curățenie — Servicii Profesionale",
    shortDescription: "Banner pentru servicii de curățenie — birouri, case, curățenie industrială, cu pachete detaliate.",
    seoTitle: "Banner Curatenie | Servicii Menaj",
    seoDescription: "Atrage clienți cu servicii de curățenie complete promovate pe un banner clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Curățenie impecabilă, la comandă</h2><p>Firmele de curățenie câștigă clienți mai ales prin claritatea ofertei, deci un banner care detaliază tipurile de servicii — birouri, case, curățenie industrială — ajută clientul să știe imediat dacă te potrivești nevoii lui. Menționează dacă folosești produse ecologice, pentru că tot mai mulți clienți corporate cer explicit acest criteriu în contracte. Materialul PVC rezistă bine montat la sediul firmei sau pe vehiculele de intervenție.</p><ul><li>Tipuri de curățenie oferite</li><li>Produse ecologice, dacă e cazul</li><li>Program flexibil</li><li>Cerere ofertă rapidă</li></ul>`
  },
  "transport": {
    key: "transport",
    title: "Banner Transport — Mutări și Livrări",
    shortDescription: "Banner pentru firme de transport — mutări, livrări, transport internațional, cu zona acoperită.",
    seoTitle: "Banner Transport | Mutari & Livrari",
    seoDescription: "Anunță serviciile de transport cu un banner clar, la sediul firmei sau pe vehicule.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Transport sigur, de încredere</h2><p>Mutările sunt stresante pentru clienți, deci un banner care transmite profesionalism — zona acoperită, tipul de transport, asigurarea mărfii — reduce din anxietatea clientului înainte chiar de primul telefon. Specifică dacă acoperi și transport internațional, pentru că această informație filtrează rapid clienții potriviți din cei care caută doar mutări locale. Materialul PVC rezistă bine la sediu sau depozit, expus tot anul.</p><ul><li>Tipuri de transport oferite</li><li>Zona geografică acoperită</li><li>Asigurare marfă inclusă</li><li>Contact disponibil non-stop</li></ul>`
  },
  "consultanta": {
    key: "consultanta",
    title: "Banner Consultanță — Experți în Afaceri",
    shortDescription: "Banner pentru consultanți financiari, IT sau de business, cu domeniile de specializare evidențiate.",
    seoTitle: "Banner Consultanta | Expertiza Profesionala",
    seoDescription: "Prezintă serviciile de consultanță cu credibilitate pe un banner profesional.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Expertiză prezentată cu credibilitate</h2><p>Consultanța se vinde pe încredere, deci un banner sobru, profesional, cu domeniile de specializare clar listate — financiar, management, IT — comunică mai bine decât un design încărcat sau sloganuri vagi. Pentru evenimente sau conferințe la care participi, un banner roll-up sau de sediu cu aceeași identitate vizuală întărește recunoașterea brandului. Materialul PVC rezistă bine pentru afișare permanentă la birou.</p><ul><li>Domenii de specializare</li><li>Experiență și certificări</li><li>Tip de colaborare oferit</li><li>Contact pentru consultație</li></ul>`
  },
  "avocat": {
    key: "avocat",
    title: "Banner Avocat — Drept și Justiție",
    shortDescription: "Banner pentru cabinete de avocatură, cu specializările juridice principale evidențiate.",
    seoTitle: "Banner Avocat | Servicii Juridice",
    seoDescription: "Promovează serviciile juridice ale cabinetului tău cu profesionalism.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Servicii juridice, prezentate profesional</h2><p>Un cabinet de avocatură câștigă clienți prin seriozitate, deci designul banner-ului trebuie să rămână sobru — culori discrete, tipografie clasică, fără elemente stridente. Listează specializările principale — drept civil, penal, familial, comercial — pentru că majoritatea clienților caută un avocat pe un domeniu specific, nu unul generalist. Materialul PVC rezistă bine pentru afișare permanentă la sediul cabinetului.</p><ul><li>Domenii de drept acoperite</li><li>Ani de experiență</li><li>Consultație inițială, dacă e gratuită</li><li>Contact direct</li></ul>`
  },
  "medic": {
    key: "medic",
    title: "Banner Medic — Sănătate și Îngrijire",
    shortDescription: "Banner pentru cabinete medicale private, cu specialitățile și programările evidențiate.",
    seoTitle: "Banner Medic | Servicii Medicale",
    seoDescription: "Atrage pacienți la cabinetul tău medical cu un banner clar și de încredere.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Sănătate, prezentată cu încredere</h2><p>Un cabinet medical privat nou sau relocat are nevoie de vizibilitate clară în zonă, deci un banner cu specialitatea medicală și modalitatea de programare ajută pacienții să te găsească rapid. Menționează dacă acceptați asigurări private sau decontare CAS, pentru că acesta e adesea criteriul principal de decizie pentru pacienți. Materialul PVC rezistă bine montat la intrarea cabinetului, expus pe termen lung.</p><ul><li>Specialitatea medicală</li><li>Modalități de programare</li><li>Asigurări acceptate</li><li>Program de consultații</li></ul>`
  },


  // --- EDUCAȚIE ---
  "universitate": {
    key: "universitate",
    title: "Banner Universitate — Înscrieri și Admitere",
    shortDescription: "Banner pentru universități — facultăți, taxe de școlarizare, burse, admitere online.",
    seoTitle: "Banner Universitate | Admitere & Studii",
    seoDescription: "Promovează programele universitare cu un banner informativ pentru viitorii studenți.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Educație superioară, promovată clar</h2><p>Perioada de admitere concentrează cea mai mare parte a deciziilor viitorilor studenți, deci un banner cu facultățile disponibile și termenele de înscriere, montat vizibil la campus sau în oraș, ajunge la un public pe care campaniile online nu-l acoperă întotdeauna. Menționează bursele disponibile, pentru că acestea reprezintă un argument decisiv pentru mulți candidați. Materialul PVC rezistă bine pentru afișare pe durata sezonului de admitere.</p><ul><li>Facultăți și programe disponibile</li><li>Taxe de școlarizare</li><li>Burse oferite</li><li>Termen limită înscriere</li></ul>`
  },
  "facultate": {
    key: "facultate",
    title: "Banner Facultate — Specializări și Cursuri",
    shortDescription: "Banner pentru facultăți — specializări, durata studiilor, cariere posibile după absolvire.",
    seoTitle: "Banner Facultate | Studii Specializate",
    seoDescription: "Atrage studenți cu programe atractive promovate pe un banner clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Specializări care contează pentru viitor</h2><p>Elevii de liceu aleg de multe ori facultatea în funcție de perspectivele de carieră, deci un banner care leagă specializarea de oportunități concrete de angajare convinge mai mult decât o simplă listă de discipline. Menționează durata studiilor și dacă diploma e recunoscută internațional, informații care influențează direct decizia candidaților. Materialul PVC rezistă bine pentru afișare pe durata sesiunii de admitere.</p><ul><li>Specializări disponibile</li><li>Durata studiilor</li><li>Recunoaștere internațională a diplomei</li><li>Cariere posibile după absolvire</li></ul>`
  },
  "liceu": {
    key: "liceu",
    title: "Banner Liceu — Înscrieri Clasele IX-XII",
    shortDescription: "Banner pentru licee — înscrieri clasele IX-XII, profiluri disponibile, rezultate la examene.",
    seoTitle: "Banner Liceu | Educatie Secundara",
    seoDescription: "Promovează liceul cu rezultatele obținute și activitățile extracurriculare pe un banner clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Pregătire solidă pentru viitor</h2><p>Părinții aleg liceul mai ales pe baza rezultatelor la bacalaureat și a profilurilor disponibile, deci un banner care afișează aceste cifre concret construiește încredere mai eficient decât un mesaj general despre calitate. Include perioada de înscrieri și profilurile — real, uman, tehnic — pentru a ajuta familiile să decidă rapid dacă se potrivesc. Materialul PVC rezistă bine pentru afișare pe durata sezonului de înscrieri.</p><ul><li>Profiluri disponibile</li><li>Rezultate la bacalaureat</li><li>Activități extracurriculare</li><li>Perioada de înscrieri</li></ul>`
  },
  "gimnaziu": {
    key: "gimnaziu",
    title: "Banner Gimnaziu — Clasele V-VIII",
    shortDescription: "Banner pentru școli gimnaziale, clasele V-VIII, cu facilitățile și programele afterschool afișate.",
    seoTitle: "Banner Gimnaziu | Educatie Gimnaziala",
    seoDescription: "Atrage elevi cu un mediu educațional prietenos, promovat pe un banner clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Etapa de formare, susținută corect</h2><p>Pentru părinții care aleg o școală gimnazială, facilitățile concrete — cantina, sălile de sport, programele afterschool — cântăresc adesea la fel de mult ca rezultatele academice, deci merită să apară clar pe banner. Menționează și corpul profesoral, dacă are calificări sau experiență notabile. Materialul PVC rezistă bine pentru afișare la intrarea în școală, pe toată durata anului școlar.</p><ul><li>Materii și programe speciale</li><li>Facilități — cantină, săli de sport</li><li>Programe afterschool</li><li>Perioada de înscrieri</li></ul>`
  },
  "gradinita": {
    key: "gradinita",
    title: "Banner Grădiniță — Înscrieri Copii",
    shortDescription: "Banner colorat pentru grădinițe private, cu vârstele acceptate și activitățile zilnice.",
    seoTitle: "Banner Gradinita | Educatie Prescolara",
    seoDescription: "Promovează grădinița cu activități creative afișate pe un banner prietenos și colorat.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Primii pași în educație, cu grijă</h2><p>Părinții unui copil mic caută mai ales siguranță și un mediu prietenos, deci un banner colorat, vesel, cu activitățile zilnice și vârstele acceptate afișate clar, transmite exact atmosfera pe care o caută pentru cel mic. Menționează mesele oferite și programul de funcționare, pentru că acestea sunt criterii practice importante pentru părinții care lucrează. Materialul PVC rezistă bine la intrarea în grădiniță, expus tot anul.</p><ul><li>Vârste acceptate</li><li>Activități zilnice</li><li>Mese incluse în program</li><li>Perioada de înscrieri</li></ul>`
  },
  "afterschool": {
    key: "afterschool",
    title: "Banner Afterschool — Meditații și Activități",
    shortDescription: "Banner pentru centre afterschool — meditații, arte, sport, cu program și supraveghere.",
    seoTitle: "Banner Afterschool | Meditatii & Hobby",
    seoDescription: "Atrage copii și părinți cu programe afterschool interesante, promovate clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Sprijin real după orele de școală</h2><p>Părinții aleg un centru afterschool mai ales în funcție de program și de disciplinele acoperite, deci un banner cu orarul și materiile principale — meditații, arte, sport — ajută la o decizie rapidă. Menționează și tipul de supraveghere oferit, pentru că liniștea că cel mic e în siguranță contează cel puțin la fel de mult ca activitățile educaționale. Materialul PVC rezistă bine la intrarea centrului, expus pe durata anului școlar.</p><ul><li>Meditații pe materii</li><li>Activități extra — arte, sport</li><li>Program orar detaliat</li><li>Supraveghere asigurată</li></ul>`
  },
  "meditatii": {
    key: "meditatii",
    title: "Banner Meditații — Îmbunătățire Note",
    shortDescription: "Banner pentru meditații — matematică, limbi străine, pregătire pentru note mai bune.",
    seoTitle: "Banner Meditatii | Ajutor Scolar",
    seoDescription: "Oferă meditații personalizate promovate pe un banner clar, cu materiile disponibile.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Note mai bune, cu sprijin dedicat</h2><p>Elevii și părinții caută meditații mai ales pe materii specifice, deci un banner care listează clar disciplinele — matematică, limbi străine, română — aduce cereri relevante, direct pe subiectul căutat. Menționează formatul sesiunilor — individual sau grup — pentru că acesta influențează direct decizia și bugetul disponibil. Materialul PVC rezistă bine pentru afișare la centrul de meditații.</p><ul><li>Materii disponibile</li><li>Format individual sau grup</li><li>Nivel de pregătire — gimnaziu, liceu, admitere</li><li>Contact pentru programare</li></ul>`
  },
  "examene": {
    key: "examene",
    title: "Banner Examene — Pregătire Intensivă",
    shortDescription: "Banner pentru centre de pregătire examene — admitere, bacalaureat, concursuri.",
    seoTitle: "Banner Examene | Pregatire Admitere",
    seoDescription: "Ajută candidații să treacă examenele cu succes prin promovare pe un banner clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Pregătire structurată pentru examene</h2><p>Perioada dinaintea unui examen important e momentul în care candidații caută cel mai activ un centru de pregătire, deci un banner cu tipul de examen acoperit — admitere, bacalaureat, concursuri — și data de start a cursurilor aduce înscrieri rapide. Menționează dacă oferi simulări în condiții reale de examen, pentru că acest detaliu diferențiază o pregătire serioasă de una superficială. Materialul PVC rezistă bine pentru afișare pe durata sezonului de pregătire.</p><ul><li>Tip de examen acoperit</li><li>Data de start a cursurilor</li><li>Simulări incluse</li><li>Rezultate din promoțiile anterioare</li></ul>`
  },


  // --- IMOBILIARE SUPLIMENTAR ---
  "teren": {
    key: "teren",
    title: "Banner Teren — Vânzare Loturi",
    shortDescription: "Banner pentru terenuri agricole sau de construcție, cu suprafața și utilizarea permisă afișate.",
    seoTitle: "Banner Teren | Loturi de Vanzare",
    seoDescription: "Semnalizează terenul de vânzare cu suprafața și prețul afișate clar pe banner.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Teren de vânzare, semnalizat clar</h2><p>Cumpărătorii de teren merg de obicei la fața locului înainte să decidă, deci un banner montat direct pe parcelă, cu suprafața și categoria de folosință afișate, îi ajută să evalueze rapid dacă terenul se potrivește nevoilor lor. Menționează accesul la utilități — curent, apă, drum de acces — pentru că acestea influențează semnificativ prețul și decizia de cumpărare. Pentru terenuri expuse la vânt, recomandăm mesh perforat, mai rezistent decât PVC-ul clasic pe suprafețe mari. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "birou": {
    key: "birou",
    title: "Banner Birou — Spații de Lucru",
    shortDescription: "Banner pentru birouri de închiriat sau spații de coworking, cu facilitățile incluse.",
    seoTitle: "Banner Birou | Spatii Office",
    seoDescription: "Promovează spațiile de birouri moderne cu un banner clar, la fațada clădirii.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Spațiu de lucru, prezentat clar</h2><p>Firmele care caută birouri noi decid adesea după o vizitare rapidă a zonei, deci un banner la fațada clădirii, cu suprafața disponibilă și facilitățile incluse, aduce solicitări directe de la companii din vecinătate care nu căutau activ online. Menționează parcarea și accesul la transport public, criterii esențiale pentru angajați. Materialul PVC rezistă bine pentru afișare pe termen lung la fațada clădirii. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "spatiu-comercial-supl": {
    key: "spatiu-comercial-supl",
    title: "Banner Spațiu Comercial — Magazine și Ateliere",
    shortDescription: "Banner pentru spații comerciale diverse — magazine, ateliere, cu zona și avantajele evidențiate.",
    seoTitle: "Banner Spatiu Comercial | Magazine & Ateliere",
    seoDescription: "Atrage afaceri în spațiul tău comercial cu un banner clar și profesional.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Spațiu comercial, gata de o afacere nouă</h2><p>Un spațiu comercial liber marcat clar, cu suprafața și tipul de activitate permis afișate, ajută potențialii chiriași să evalueze rapid dacă locația se potrivește planului lor de afaceri. Menționează parcarea disponibilă și traficul din zonă, argumente concrete pentru orice afacere care depinde de vizibilitate stradală. Materialul PVC rezistă bine montat pe vitrina sau fațada spațiului liber. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "depozit": {
    key: "depozit",
    title: "Banner Depozit — Stocare și Logistică",
    shortDescription: "Banner pentru depozite și hale industriale, cu suprafața și sistemele de securitate.",
    seoTitle: "Banner Depozit | Stocare Marfa",
    seoDescription: "Oferă soluții de depozitare sigure promovate pe un banner clar la poarta depozitului.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Depozitare sigură, semnalizată clar</h2><p>Firmele care caută spațiu de depozitare vor mai ales certitudinea securității mărfii, deci menționarea sistemelor de securitate — pază, supraveghere video, împrejmuire — pe banner construiește încredere rapid. Include suprafața disponibilă și accesul pentru utilaje sau camioane de mare tonaj, criterii tehnice esențiale pentru clienți din logistică. Materialul PVC rezistă bine montat la poarta sau gardul depozitului. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "garaj": {
    key: "garaj",
    title: "Banner Garaj — Parcări și Boxe",
    shortDescription: "Banner pentru garaje și boxe auto de închiriat, cu dimensiunile și sistemul de închidere.",
    seoTitle: "Banner Garaj | Parcari & Boxe",
    seoDescription: "Promovează garajele disponibile în zonă cu un banner clar și practic.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Parcare acoperită, disponibilă acum</h2><p>Boxele de garaj se închiriază rapid în zonele cu deficit de parcare, deci un banner montat vizibil la locație, cu dimensiunile boxei și prețul lunar, aduce solicitări directe de la vecinii care trec zilnic prin zonă. Menționează sistemul de închidere — automat sau clasic — pentru că siguranța mașinii e principalul motiv pentru care cineva închiriază un garaj. Materialul PVC rezistă bine montat pe ușa sau gardul garajului. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "schimb": {
    key: "schimb",
    title: "Banner Schimb — Apartamente și Case",
    shortDescription: "Banner pentru schimburi imobiliare — apartament contra casă, cu detaliile proprietăților.",
    seoTitle: "Banner Schimb | Imobiliare Schimb",
    seoDescription: "Facilitează schimburile imobiliare cu transparență, printr-un banner clar la locație.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Schimb imobiliar, transparent</h2><p>Schimburile de proprietăți sunt mai rare decât vânzările clasice, deci un banner montat la fața locului, cu detaliile clare ale proprietății oferite și ale celei căutate, atrage exact publicul potrivit — persoane deja interesate de acest tip de tranzacție. Menționează eventuala diferență de preț sau dorința de compensare, pentru claritate din prima. Materialul PVC rezistă bine montat pe gard sau balcon. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "donatie": {
    key: "donatie",
    title: "Banner Donație — Ajutor pentru Nevoiți",
    shortDescription: "Banner pentru campanii de strângere de fonduri, cu cauza și modalitatea de donare explicate.",
    seoTitle: "Banner Donatie | Ajutor Social",
    seoDescription: "Încurajează donațiile cu un banner clar, care explică cauza și impactul.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Ajută-i pe cei în nevoie</h2><p>O campanie de donații reușește mai ales când oamenii înțeleg exact pentru ce donează, deci un banner care descrie clar cauza — nu doar "ajutați-ne", ci cine anume și de ce — aduce mai multă implicare din partea trecătorilor. Include modalitatea concretă de a dona — cont bancar, cutie de donații, SMS — pentru că friction-ul din procesul de donare reduce direct participarea. Materialul PVC rezistă bine pentru afișare pe durata campaniei. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "voluntariat": {
    key: "voluntariat",
    title: "Banner Voluntariat — Alătură-te Cauzei",
    shortDescription: "Banner pentru recrutare de voluntari, cu proiectele active și beneficiile participării.",
    seoTitle: "Banner Voluntariat | Activitati Sociale",
    seoDescription: "Atrage voluntari cu proiecte semnificative promovate pe un banner clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Fă diferența, alătură-te echipei</h2><p>Oamenii care iau în calcul voluntariatul vor să știe rapid ce fac concret și cât timp implică, deci un banner cu proiectele active și numărul aproximativ de ore pe săptămână ajută la o decizie rapidă de înscriere. Menționează și ce câștigă voluntarul — experiență, recomandări, comunitate — pentru că motivația personală contează la fel de mult ca cauza în sine. Materialul PVC rezistă bine pentru afișare la sediul organizației sau la evenimente. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "adoptie": {
    key: "adoptie",
    title: "Banner Adoptie — Caută Familie",
    shortDescription: "Banner pentru campanii de adopție — animale în adopție, cu descrierea și cerințele.",
    seoTitle: "Banner Adoptie | Animale & Copii",
    seoDescription: "Promovează adopția responsabilă cu un banner clar, la centrul de adopții.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Dă o casă unui suflet care așteaptă</h2><p>Un banner la centrul de adopții, cu poze reale ale animalelor disponibile și un scurt profil de caracter, ajută vizitatorii să se conecteze emoțional mult mai repede decât o listă seacă. Include cerințele minime de adopție — spațiu, timp disponibil, alte animale în casă — pentru a filtra din start solicitările nepotrivite. Materialul PVC rezistă bine pentru afișare permanentă la centru. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- SEZONALE ȘI SĂRBĂTORI ---
  "revelion": {
    key: "revelion",
    title: "Banner Revelion — An Nou Fericit",
    shortDescription: "Banner pentru petreceri de Revelion, cu programul serii și rezervările afișate.",
    seoTitle: "Banner Revelion | Sarbatori An Nou",
    seoDescription: "Anunță petrecerea de Revelion cu programul complet pe un banner atractiv.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Bun venit în noul an!</h2><p>Locurile la petrecerile de Revelion se rezervă din timp, deci un banner montat la restaurant sau sala de evenimente, cu meniul festiv și prețul biletului, ajută clienții indeciși să se hotărască mai repede. Menționează dacă ai muzică live sau un DJ, detaliu care contează mult în alegerea locației pentru cea mai importantă seară a anului. Materialul PVC rezistă bine la montaj exterior pe perioada de iarnă. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "ziua-mamei": {
    key: "ziua-mamei",
    title: "Banner Ziua Mamei — Sărbătoriți Mama",
    shortDescription: "Banner pentru evenimente și oferte dedicate Zilei Mamei, cu activitățile și cadourile.",
    seoTitle: "Banner Ziua Mamei | Sarbatori Familiale",
    seoDescription: "Promovează evenimente speciale pentru Ziua Mamei pe un banner cald și potrivit.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>O zi dedicată mamelor</h2><p>De Ziua Mamei, oferta specială care iese în evidență rapid câștigă vizite spontane, deci un banner cu produsele sau evenimentele dedicate — mese festive, buchete, pachete cadou — montat cu câteva zile înainte aduce clienți care caută o idee de ultim moment. Materialul PVC rezistă bine montat pe fațadă sau vitrină pe durata campaniei. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "ziua-tatalui": {
    key: "ziua-tatalui",
    title: "Banner Ziua Tatălui — Onorează Tatăl",
    shortDescription: "Banner pentru evenimente și oferte dedicate Zilei Tatălui, cu activități potrivite.",
    seoTitle: "Banner Ziua Tatalui | Sarbatori Familiale",
    seoDescription: "Dedică o zi specială taților cu oferte promovate pe un banner clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>O zi dedicată taților</h2><p>La fel ca de Ziua Mamei, oferta clară de Ziua Tatălui — un pachet cadou, un meniu special, o reducere — comunicată pe un banner vizibil aduce clienți care caută o idee rapidă și concretă. Materialul PVC rezistă bine montat pe termen scurt, pentru campanii sezoniere. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "ziua-copiilor": {
    key: "ziua-copiilor",
    title: "Banner Ziua Copiilor — Distracție pentru Micuți",
    shortDescription: "Banner pentru evenimente dedicate copiilor — jocuri, animatori, activități speciale de 1 Iunie.",
    seoTitle: "Banner Ziua Copiilor | Sarbatori pentru Copii",
    seoDescription: "Organizează sărbători pline de bucurie pentru copii, promovate pe un banner colorat.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>O zi de joacă și bucurie</h2><p>De Ziua Copiilor, părinții caută activități concrete pentru cei mici, deci un banner colorat, cu jocurile și animatorii incluși în program, atrage familii care caută unde să petreacă ziua. Menționează dacă evenimentul e gratuit sau are un cost per copil, informație care influențează direct decizia părinților. Materialul PVC rezistă bine montat afară, pe durata evenimentului. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "valentine": {
    key: "valentine",
    title: "Banner Valentine — Ziua Îndrăgostiților",
    shortDescription: "Banner romantic pentru oferte de Valentine's Day — cine romantice, cadouri, pachete cuplu.",
    seoTitle: "Banner Valentine | Ziua Indragostitilor",
    seoDescription: "Creează atmosferă romantică cu bannere speciale pentru Ziua Îndrăgostiților.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>O seară specială, pentru doi</h2><p>De Valentine's Day, ofertele romantice — cine cu meniu special, pachete cadou pentru cupluri — se vând mai bine când sunt afișate clar și cu câteva zile înainte de eveniment, ca oamenii să apuce să rezerve. Un design elegant, cu roșu și accente discrete, comunică imediat tematica fără cuvinte multe. Materialul PVC rezistă bine montat pe durata scurtă a campaniei. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "martisor": {
    key: "martisor",
    title: "Banner Martisor — Primăvară și Iubire",
    shortDescription: "Banner pentru sărbătoarea Mărțișorului, cu mărțișoare handmade și evenimente de primăvară.",
    seoTitle: "Banner Martisor | Sarbatoarea Primaverii",
    seoDescription: "Anunță evenimente tradiționale de Mărțișor pe un banner colorat și primăvăratic.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Primăvara vine cu tradiție</h2><p>De 1 și 8 Martie, standurile cu mărțișoare și florării câștigă trafic important, deci un banner colorat, montat la punctul de vânzare, ajută trecătorii să te găsească rapid în aglomerația specifică perioadei. Menționează dacă produsele sunt handmade sau realizate de meșteri locali, detaliu apreciat de cumpărători în această perioadă. Materialul PVC rezistă bine pentru campania scurtă de câteva săptămâni. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "ziua-nationala": {
    key: "ziua-nationala",
    title: "Banner Ziua Națională — Patriotism și Tradiție",
    shortDescription: "Banner pentru sărbători naționale, cu manifestările și evenimentele patriotice locale.",
    seoTitle: "Banner Ziua Nationala | Sarbatori Patriotice",
    seoDescription: "Creează spirit patriotic cu evenimente speciale promovate pe un banner clar.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>O zi pentru toată comunitatea</h2><p>De Ziua Națională, instituțiile publice și organizatorii de evenimente comunică programul zilei — parade, concerte, expoziții — printr-un banner vizibil la locul principal de desfășurare, ca localnicii să știe unde și când se întâmplă fiecare activitate. Materialul PVC rezistă bine expus în aer liber pe durata evenimentului. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- SPORT ---
  "fotbal": {
    key: "fotbal",
    title: "Banner Fotbal — Meciuri și Antrenamente",
    shortDescription: "Banner pentru cluburi de fotbal — meciuri, antrenamente, înscrieri jucători.",
    seoTitle: "Banner Fotbal | Cluburi & Meciuri",
    seoDescription: "Promovează echipa cu bannere vizibile la teren sau la sediul clubului.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Susține echipa locală</h2><p>Un banner montat la teren sau la intrarea clubului comunică rapid programul meciurilor și antrenamentelor pentru suporteri și părinții copiilor înscriși la academie. Menționează perioada de înscrieri pentru grupele de copii, dacă acceptați jucători noi, pentru că multe cluburi locale cresc tocmai prin astfel de anunțuri vizibile. Materialul rezistă bine montat pe gardul terenului, expus la intemperii pe tot parcursul sezonului. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "baschet": {
    key: "baschet",
    title: "Banner Baschet — Coșuri și Abilități",
    shortDescription: "Banner pentru echipe de baschet, cu programul campionatelor și înscrierile deschise.",
    seoTitle: "Banner Baschet | Echipe & Campionate",
    seoDescription: "Atrage jucători și suporteri cu bannere dinamice pentru echipa de baschet.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Fiecare coș contează</h2><p>Un banner la sala de sport sau la intrarea clubului anunță programul campionatelor și, dacă e cazul, perioada de înscrieri pentru grupele de juniori. Recomandăm un design dinamic, cu culorile echipei, montat vizibil la intrare pentru suporteri și părinți deopotrivă. Materialul rezistă bine indiferent dacă sala e interioară sau terenul e în aer liber. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "volei": {
    key: "volei",
    title: "Banner Volei — Lovituri și Apărare",
    shortDescription: "Banner pentru cluburi de volei, cu meciurile și rezultatele recente afișate.",
    seoTitle: "Banner Volei | Echipe & Meciuri",
    seoDescription: "Promovează voleiul local cu bannere energice pentru club și suporteri.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Putere de echipă, la fiecare meci</h2><p>Un banner la sala clubului sau la teren ajută suporterii să afle rapid programul meciurilor și, dacă acceptați jucători noi, perioada de selecție pentru echipă. Culorile clubului, folosite consistent pe toate materialele, ajută la recunoașterea rapidă a brandului sportiv local. Materialul rezistă bine montat afară pe gardul terenului. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "handbal": {
    key: "handbal",
    title: "Banner Handbal — Precizie și Viteză",
    shortDescription: "Banner pentru echipe de handbal, cu campionatele și performanțele afișate pentru suporteri.",
    seoTitle: "Banner Handbal | Campionate & Goluri",
    seoDescription: "Atrage suporteri cu bannere motivante pentru echipa de handbal.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Viteză și precizie, susținute din tribune</h2><p>Un banner montat la sala de handbal informează suporterii despre programul campionatelor, iar dacă echipa are rezultate notabile, acestea merită afișate — motivează atât jucătorii cât și publicul. Pentru cluburile de juniori, includerea perioadei de înscrieri aduce copii noi la antrenamente. Materialul rezistă bine montat la intrarea sălii sau pe gardul terenului. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "atletism": {
    key: "atletism",
    title: "Banner Atletism — Viteză și Rezistență",
    shortDescription: "Banner pentru cluburi de atletism, cu probele acoperite și competițiile viitoare.",
    seoTitle: "Banner Atletism | Competitii & Recorduri",
    seoDescription: "Încurajează sportivii cu bannere inspiraționale pentru clubul de atletism.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Depășește propriile limite</h2><p>Un banner la baza sportivă sau la sediul clubului comunică probele acoperite — alergare, sărituri, aruncări — și programul competițiilor viitoare, util atât pentru sportivii legitimați cât și pentru cei interesați să se înscrie. Materialul rezistă bine montat afară, pe gardul stadionului, expus tot anul. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "gimnastica": {
    key: "gimnastica",
    title: "Banner Gimnastică — Grație și Forță",
    shortDescription: "Banner pentru săli de gimnastică, cu clasele pentru copii și competițiile programate.",
    seoTitle: "Banner Gimnastica | Sali & Competitii",
    seoDescription: "Promovează gimnastica locală cu bannere elegante pentru sala de sport.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Mișcare, echilibru și disciplină</h2><p>Un banner la intrarea sălii de gimnastică anunță clasele disponibile pe vârste și, dacă acceptați copii noi, perioada de înscrieri — informație căutată frecvent de părinți. Menționează calificarea antrenorilor, un criteriu important pentru părinții care își înscriu copiii la un sport cu componentă tehnică ridicată. Materialul rezistă bine montat la intrarea sălii. Configurează dimensiunea din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- MUZICĂ ȘI ARTĂ ---
  "jazz": {
    key: "jazz",
    title: "Banner Jazz — Improvizație și Ritm",
    shortDescription: "Banner pentru concerte și evenimente de jazz, cu artiștii invitați și data evenimentului.",
    seoTitle: "Banner Jazz | Concerte & Festivaluri",
    seoDescription: "Atrage melomani cu bannere sofisticate pentru evenimente de jazz.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Muzică live, atmosferă rafinată</h2><p>Un banner cu numele artiștilor invitați și data concertului, montat la locul de desfășurare cu câteva săptămâni înainte, ajută la vânzarea biletelor din timp, mai ales pentru evenimentele de jazz care atrag un public fidel dar limitat numeric. Un design elegant, cu tipografie sobră, se potrivește mai bine genului decât un banner colorat și agresiv. Materialul PVC rezistă bine pentru afișare exterioară pe durata promovării evenimentului. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "rock": {
    key: "rock",
    title: "Banner Rock — Energie și Rebeliune",
    shortDescription: "Banner pentru concerte rock, cu trupele din lineup și data evenimentului evidențiate.",
    seoTitle: "Banner Rock | Concerte & Festivaluri",
    seoDescription: "Creează hype pentru evenimentul tău cu bannere rock pline de energie.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Energie pură, pe scenă</h2><p>Un banner pentru un concert rock funcționează cel mai bine cu contrast puternic, tipografie robustă și numele trupelor din lineup afișate mare — genul de energie vizuală pe care fanii o asociază cu evenimentul. Montat din timp la locația evenimentului sau în oraș, ajută la vânzarea anticipată a biletelor. Materialul PVC rezistă bine la expunerea exterioară pe durata campaniei. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "pop": {
    key: "pop",
    title: "Banner Pop — Dans și Melodii",
    shortDescription: "Banner pentru evenimente și concerte pop, cu artiștii și data show-ului afișate.",
    seoTitle: "Banner Pop | Concerte & Show-uri",
    seoDescription: "Promovează muzica pop cu bannere colorate pentru evenimentul tău.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Muzică pentru toată lumea</h2><p>Un banner colorat, cu numele artiștilor și data show-ului, comunică rapid și atractiv evenimentul unui public larg, obișnuit cu genul pop. Poziționează banner-ul în zone cu trafic pietonal ridicat pentru vizibilitate maximă înainte de eveniment. Materialul PVC rezistă bine la expunere exterioară, indiferent de anotimp. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "folk": {
    key: "folk",
    title: "Banner Folk — Tradiție și Cântec",
    shortDescription: "Banner pentru evenimente de muzică folk românească, cu artiștii și tradiția evidențiate.",
    seoTitle: "Banner Folk | Muzica Traditionala",
    seoDescription: "Creează atmosferă tradițională cu bannere pentru evenimente de muzică folk.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Rădăcini și cântec autentic</h2><p>Evenimentele de folk atrag un public atașat de tradiție, deci un banner cu elemente vizuale autentice — motive populare, tipografie caldă — comunică mai bine spiritul evenimentului decât un design modern generic. Include numele artiștilor și locul concertului, informații esențiale pentru publicul care urmărește activ genul. Materialul PVC rezistă bine la expunere exterioară pe durata promovării. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "opera": {
    key: "opera",
    title: "Banner Operă — Artă și Emoție",
    shortDescription: "Banner pentru spectacole de operă, cu reprezentațiile și soliștii invitați afișați.",
    seoTitle: "Banner Opera | Spectacole Clasice",
    seoDescription: "Promovează opera cu bannere elegante pentru spectacolele programate.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Emoție și rafinament</h2><p>Un banner pentru un spectacol de operă trebuie să reflecte eleganța evenimentului — design sobru, tipografie clasică, fără elemente stridente — și să comunice clar reprezentația, data și soliștii invitați. Montat la teatru sau instituție cu câteva săptămâni înainte, ajută la vânzarea din timp a biletelor premium. Materialul PVC rezistă bine la afișare exterioară îndelungată. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "balet": {
    key: "balet",
    title: "Banner Balet — Grație și Eleganță",
    shortDescription: "Banner pentru trupe de balet, cu coregrafiile și data spectacolului afișate elegant.",
    seoTitle: "Banner Balet | Spectacole de Dans",
    seoDescription: "Atrage publicul cu bannere sofisticate pentru spectacolele de balet.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Dans, grație și disciplină</h2><p>Un banner pentru un spectacol de balet funcționează bine cu o imagine expresivă a dansatorilor și un design curat, care lasă imaginea să vorbească mai mult decât textul. Include data și locul spectacolului, vizibile clar pentru publicul care planifică din timp o seară la teatru. Materialul PVC rezistă bine la afișare exterioară pe durata promovării. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "pictura": {
    key: "pictura",
    title: "Banner Pictură — Expoziții și Ateliere",
    shortDescription: "Banner pentru expoziții de pictură și ateliere de artă plastică, cu artiștii expuși.",
    seoTitle: "Banner Pictura | Expozitii Artistice",
    seoDescription: "Promovează arta plastică cu bannere creative pentru expoziții și ateliere.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Culoare și expresie</h2><p>Un banner pentru o expoziție de pictură funcționează cel mai bine cu una dintre lucrările expuse, aleasă pentru impact vizual, plus numele artistului și perioada expoziției. Pentru atelierele creative deschise publicului, menționează dacă participarea e liberă sau necesită înscriere. Materialul PVC redă bine culorile intense ale lucrărilor de artă, fără decolorare rapidă la soare. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "sculptura": {
    key: "sculptura",
    title: "Banner Sculptură — Forme și Texturi",
    shortDescription: "Banner pentru sculptori și expoziții de artă tridimensională, cu materialele și tehnicile folosite.",
    seoTitle: "Banner Sculptura | Arta 3D",
    seoDescription: "Atrage vizitatori cu bannere pentru expoziții de sculptură.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Formă, textură, materie</h2><p>Un banner pentru o expoziție de sculptură câștigă din prezentarea uneia dintre lucrări, fotografiată clar, care comunică vizual tehnica și amploarea operelor expuse. Menționează materialele folosite — piatră, bronz, lemn — pentru vizitatorii interesați de tehnica artistică specifică. Materialul PVC rezistă bine la expunere exterioară pe durata expoziției. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "fotografie": {
    key: "fotografie",
    title: "Banner Fotografie — Capturi de Momente",
    shortDescription: "Banner pentru fotografi și expoziții foto, cu genul de fotografie și portofoliul evidențiate.",
    seoTitle: "Banner Fotografie | Expozitii & Portrete",
    seoDescription: "Promovează fotografia cu bannere vizuale pentru expoziții sau servicii foto.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Momente surprinse, expuse la vedere</h2><p>Un banner pentru un fotograf sau o expoziție foto trebuie să lase imaginea să vorbească — alege cea mai puternică fotografie din portofoliu și lasă text minim în jurul ei. Pentru fotografii care oferă servicii — portrete, evenimente, sesiuni foto — includerea unui contact vizibil transformă interesul vizual în programări reale. Materialul PVC redă fidel detaliile fotografiei, chiar și la dimensiuni mari. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "film": {
    key: "film",
    title: "Banner Film — Proiecții și Festivaluri",
    shortDescription: "Banner pentru proiecții și festivaluri de film, cu programul filmelor și locația.",
    seoTitle: "Banner Film | Festivaluri & Proiectii",
    seoDescription: "Atrage cinefili cu bannere pentru festivaluri și proiecții de film.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Povești pe ecran mare</h2><p>Un banner pentru un festival de film comunică cel mai eficient prin programul concret al proiecțiilor — titluri, ore, sală — afișat clar la locația evenimentului, ca vizitatorii să știe exact ce urmează. Pentru proiecțiile gratuite, menționează asta explicit, pentru că e un argument puternic pentru participare spontană. Materialul PVC rezistă bine la afișare exterioară pe durata festivalului. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- TEHNOLOGIE ȘI INOVARE ---
  "conferinta-tech": {
    key: "conferinta-tech",
    title: "Banner Conferință Tech — Inovație și Viitor",
    shortDescription: "Banner pentru conferințe tech, cu speakerii invitați și subiectele principale afișate.",
    seoTitle: "Banner Conferinta Tech | Tehnologie & Inovare",
    seoDescription: "Promovează conferințe tech cu bannere moderne, potrivite pentru evenimente de business.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Tehnologie, prezentată clar</h2><p>Un banner de conferință funcționează cel mai bine cu numele speakerilor invitați afișate mare, pentru că aceștia sunt de obicei principalul motiv pentru care participanții cumpără bilet. Include subiectele principale ale evenimentului, ca participanții să poată evalua rapid relevanța pentru domeniul lor. Pentru evenimentul propriu-zis, un banner roll-up sau de fundal cu identitatea vizuală a conferinței întărește impresia de profesionalism. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "hackathon": {
    key: "hackathon",
    title: "Banner Hackathon — Programare Intensivă",
    shortDescription: "Banner pentru competiții de programare, cu provocările tehnice și premiile afișate.",
    seoTitle: "Banner Hackathon | Competitii Coding",
    seoDescription: "Atrage dezvoltatori cu bannere tech pentru competiția de hackathon.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Cod, echipe și 48 de ore de creație</h2><p>Un banner de hackathon trebuie să comunice rapid provocarea tehnică și premiile puse în joc, pentru că acestea sunt principalele motive pentru care dezvoltatorii se înscriu. Menționează dacă participarea e în echipe formate sau individuală, informație practică pentru cei care se decid ultimul moment. Pentru evenimentul propriu-zis, un banner de fundal cu identitatea vizuală funcționează bine și pentru fotografii de social media. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "startup-pitch": {
    key: "startup-pitch",
    title: "Banner Startup Pitch — Prezentări de Afaceri",
    shortDescription: "Banner pentru evenimente de prezentare startup-uri, cu formatul și investitorii prezenți.",
    seoTitle: "Banner Startup Pitch | Afaceri Inovatoare",
    seoDescription: "Promovează evenimente de startup pitch cu bannere dinamice și profesionale.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Idei prezentate, capital atras</h2><p>Un banner pentru un eveniment de startup pitch funcționează bine cu informații concrete — numărul de startup-uri participante, investitorii sau juriul prezent — pentru că acestea determină calitatea percepută a evenimentului. Pentru sala de eveniment, un banner de fundal cu sponsori și parteneri completează identitatea vizuală a zilei. Materialul PVC rezistă bine la montaj rapid și demontaj, specific evenimentelor de o zi. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- SĂNĂTATE ȘI BINESTARE ---
  "vaccin": {
    key: "vaccin",
    title: "Banner Vaccin — Protecție și Sănătate",
    shortDescription: "Banner pentru campanii de vaccinare, cu informații clare despre programări și beneficii.",
    seoTitle: "Banner Vaccin | Campanii de Imunizare",
    seoDescription: "Încurajează vaccinarea cu bannere informative și pozitive pentru campanii de sănătate.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Informare clară, decizie informată</h2><p>Un banner pentru o campanie de vaccinare funcționează cel mai bine cu informații practice, verificabile — ce vaccinuri sunt disponibile, unde și cum te poți programa — mai degrabă decât cu mesaje generice. Montat la centrul de vaccinare sau la cabinetul medical, ajută persoanele din zonă să găsească rapid punctul de administrare. Materialul PVC rezistă bine la expunere exterioară pe durata campaniei. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "donare-sange": {
    key: "donare-sange",
    title: "Banner Donare Sânge — Salvează Vieți",
    shortDescription: "Banner pentru centre de donare de sânge, cu condițiile și procesul de donare explicate.",
    seoTitle: "Banner Donare Sange | Acte de Binefacere",
    seoDescription: "Încurajează donarea de sânge cu bannere clare pentru centrele de recoltare.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Un gest simplu, cu impact real</h2><p>Un banner pentru o campanie de donare de sânge funcționează bine când explică practic procesul — cine poate dona, cât durează, unde se face recoltarea — pentru că multe persoane ezită din lipsă de informație, nu din reticență reală. Menționează locul și programul centrului de recoltare, ca decizia să se poată transforma imediat în acțiune. Materialul PVC rezistă bine la afișare exterioară pe durata campaniei. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "campanie-preventie": {
    key: "campanie-preventie",
    title: "Banner Campanie Prevenție — Sănătate Preventivă",
    shortDescription: "Banner pentru campanii de prevenție a bolilor, cu sfaturile practice și screening-urile disponibile.",
    seoTitle: "Banner Campanie Preventie | Sanatate Publica",
    seoDescription: "Educă populația cu bannere informative pentru campanii de sănătate preventivă.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Prevenția începe cu informația</h2><p>Un banner de prevenție funcționează cel mai bine cu mesaje scurte și acționabile — un simptom de urmărit, un screening gratuit disponibil, un număr de telefon pentru programare — mai eficient decât un mesaj general despre importanța sănătății. Include locul și perioada în care sunt disponibile screening-urile gratuite, dacă acestea sunt parte din campanie. Materialul PVC rezistă bine la afișare exterioară pe durata campaniei. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "fitness": {
    key: "fitness",
    title: "Banner Fitness — Mișcare și Sănătate",
    shortDescription: "Banner pentru săli de fitness, cu antrenamentele și abonamentele disponibile evidențiate.",
    seoTitle: "Banner Fitness | Sali Sport & Antrenamente",
    seoDescription: "Motivează comunitatea locală cu bannere pentru sala ta de fitness.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Antrenamente reale, rezultate reale</h2><p>O sală de fitness nouă sau relocată câștigă abonați rapid printr-un banner vizibil de la stradă, cu oferta de lansare și tipurile de abonamente afișate clar. Menționează clasele de grup sau antrenorii personali disponibili, criterii importante pentru cei care încă ezită între mai multe săli din zonă. Materialul PVC rezistă bine montat la fațada sălii, expus tot anul. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "yoga": {
    key: "yoga",
    title: "Banner Yoga — Echilibru și Relaxare",
    shortDescription: "Banner pentru centre de yoga, cu stilurile predate și clasele pentru începători.",
    seoTitle: "Banner Yoga | Relaxare & Meditatie",
    seoDescription: "Promovează yoga locală cu bannere calme, potrivite atmosferei de relaxare.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Echilibru, respirație, prezență</h2><p>Un banner pentru un centru de yoga funcționează bine cu un design calm, minimalist, care reflectă chiar atmosfera pe care o promovează — culori naturale, fără agitație vizuală. Menționează clasele pentru începători, pentru că mulți oameni ezită să încerce yoga tocmai din teama că nu au experiență suficientă. Materialul PVC rezistă bine montat la intrarea centrului. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- MEDIU ȘI ECOLOGIE ---
  "ecologie": {
    key: "ecologie",
    title: "Banner Ecologie — Protejarea Planetei",
    shortDescription: "Banner pentru campanii ecologice — reciclare, plantări, energie verde, cu acțiunile concrete.",
    seoTitle: "Banner Ecologie | Mediu & Protectie",
    seoDescription: "Încurajează acțiuni eco cu bannere verzi pentru campanii de mediu.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Acțiuni concrete pentru planetă</h2><p>Un banner de campanie ecologică convinge mai mult prin acțiuni concrete — o plantare de copaci, un punct de colectare, o zi de curățenie — decât prin mesaje generale despre protejarea mediului. Include data și locul evenimentului, ca oamenii interesați să poată participa efectiv, nu doar să simpatizeze cu cauza. Materialul PVC rezistă bine la afișare exterioară pe durata campaniei. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "reciclare": {
    key: "reciclare",
    title: "Banner Reciclare — Reutilizare și Economie",
    shortDescription: "Banner pentru centre de reciclare, cu materialele acceptate și punctele de colectare.",
    seoTitle: "Banner Reciclare | Protectia Mediului",
    seoDescription: "Educă despre reciclare cu bannere utile pentru centre și puncte de colectare.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Reciclează inteligent, aproape de casă</h2><p>Un banner pentru un centru de reciclare funcționează cel mai bine cu o listă clară a materialelor acceptate — hârtie, plastic, sticlă, electrocasnice — pentru că mulți oameni nu știu exact ce pot preda la punctul de colectare. Include programul de funcționare, ca vizitatorii să nu ajungă degeaba în afara orelor de primire. Materialul PVC rezistă bine la afișare exterioară pe termen lung. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "protejarea-mediului": {
    key: "protejarea-mediului",
    title: "Banner Protejarea Mediului — Acțiuni Concrete",
    shortDescription: "Banner pentru proiecte de protejare a mediului, cu acțiunile comunității evidențiate.",
    seoTitle: "Banner Protejarea Mediului | Ecologie & Actiune",
    seoDescription: "Mobilizează comunitatea cu bannere motivaționale pentru proiecte de mediu.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Împreună, pentru un mediu mai curat</h2><p>Un banner pentru un proiect de protejare a mediului mobilizează mai eficient comunitatea când arată rezultate concrete — o zonă curățată, un număr de copaci plantați — decât un mesaj abstract despre importanța ecologiei. Include modul în care oricine se poate implica, fie ca voluntar, fie prin donații. Materialul PVC rezistă bine la afișare exterioară pe durata proiectului. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },


  // --- CARITATE ȘI ONG ---
  "fundatie": {
    key: "fundatie",
    title: "Banner Fundație — Ajutor pentru Comunitate",
    shortDescription: "Banner pentru fundații caritabile, cu cauzele sprijinite și proiectele active.",
    seoTitle: "Banner Fundatie | Activitati Caritabile",
    seoDescription: "Promovează fundația cu bannere de impact pentru proiectele caritabile.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Ajutor real, proiecte concrete</h2><p>Un banner pentru o fundație caritabilă câștigă încredere prin transparență — cauzele sprijinite, proiectele active, modul concret în care se folosesc donațiile — mai mult decât prin mesaje emoționale generice. Include modalitatea de a dona sau de a te implica, ca interesul stârnit de banner să se poată transforma imediat în acțiune. Materialul PVC rezistă bine la afișare exterioară pe termen lung. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "ong": {
    key: "ong",
    title: "Banner ONG — Organizații Non-Guvernamentale",
    shortDescription: "Banner pentru ONG-uri locale, cu misiunea organizației și proiectele curente.",
    seoTitle: "Banner ONG | Activitati Sociale",
    seoDescription: "Atrage voluntari și susținători cu bannere inspiraționale pentru ONG-ul tău.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Schimbare reală, la nivel local</h2><p>Un banner pentru un ONG local funcționează bine când comunică misiunea în câteva cuvinte clare, ușor de reținut, în loc de un text lung despre viziune și valori. Menționează proiectele curente și dacă organizația caută voluntari sau susținători financiari, pentru direcție clară de acțiune. Materialul PVC rezistă bine la afișare exterioară pe termen lung, la sediul organizației. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  },
  "ajutor-umanitar": {
    key: "ajutor-umanitar",
    title: "Banner Ajutor Umanitar — Sprijin în Crize",
    shortDescription: "Banner pentru campanii umanitare, cu nevoile urgente și modalitățile de a ajuta.",
    seoTitle: "Banner Ajutor Umanitar | Sprijin Social",
    seoDescription: "Mobilizează ajutor rapid cu bannere pentru campanii umanitare urgente.",
    images: ["/products/banner/banner-1.webp"],
    contentHtml: `<h2>Solidaritate, când contează cel mai mult</h2><p>Un banner de campanie umanitară trebuie să comunice urgența real și concret — ce anume se strânge (alimente, îmbrăcăminte, bani), unde se predau și până când — pentru că în situații de criză, claritatea informației determină cât de repede se mobilizează comunitatea. Menționează un punct de contact direct, ca cei care vor să ajute să nu piardă timp căutând detalii. Materialul PVC rezistă bine la montaj rapid, specific campaniilor de urgență. Configurează formatul din <a href="/configurator/banner">configuratorul de bannere</a>.</p>`
  }
};
