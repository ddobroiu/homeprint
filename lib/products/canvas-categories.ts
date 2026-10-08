// Categoriile colecției de tablouri canvas gata făcute (/canvas-product/<slug>), normalizate în română.
// Fiecare model are o categorie principală (`category`) și 1–4 etichete (`tags`) din lista de mai jos.
// Pagina categoriei: /shop/canvas/<slug>. Textele de introducere sunt unice (nu le copia între categorii).
// Generat împreună cu datele din scripts/canvas-collection/generate.mjs (tablou.net); fișierul e identic pe cele 6 site-uri.

export type CanvasCategoryKey =
    | 'abstract' | 'peisaje' | 'floral' | 'animale' | 'orase' | 'motivational' | 'bani-succes' | 'pop-art'
    | 'portrete' | 'masini' | 'filme' | 'sport' | 'spiritual' | 'dragoste' | 'senzual' | 'alb-negru' | 'copii' | 'gaming';

export type CanvasCategory = {
    key: CanvasCategoryKey;
    /** segmentul din /shop/canvas/<slug> */
    slug: string;
    /** eticheta scurtă (filtre, breadcrumb) */
    label: string;
    /** H1 + titlul paginii categoriei */
    heading: string;
    metaDescription: string;
    intro: string;
    /** pagina de tablou personalizat cea mai apropiată (fotografia clientului) */
    customHref?: string;
};

export const CANVAS_CATEGORIES: CanvasCategory[] = [
    {
        key: 'abstract', slug: 'tablouri-abstracte', label: 'Abstracte', heading: 'Tablouri canvas abstracte',
        metaDescription: 'Tablouri canvas abstracte pentru living, dormitor sau birou: forme, texturi și pete de culoare pe pânză întinsă pe șasiu din lemn. Livrare 2–4 zile.',
        intro: 'Un tablou abstract nu cere o poveste anume: lasă culorile, liniile și texturile să lege mobila, perdelele și pereții. Aici găsești compoziții geometrice, valuri fluide, efecte de marmură și foiță aurie, în nuanțe calde sau reci. Alege tonurile care se repetă deja în cameră și formatul potrivit peretelui — fiecare model se imprimă la comandă pe pânză canvas întinsă pe șasiu din lemn.',
        customHref: '/canvas/abstract',
    },
    {
        key: 'peisaje', slug: 'tablouri-peisaje', label: 'Peisaje', heading: 'Tablouri canvas cu peisaje',
        metaDescription: 'Tablouri canvas cu peisaje: munți, mare, păduri, apusuri și cascade, pe pânză întinsă pe șasiu din lemn. Formate mari și panoramice, livrare 2–4 zile.',
        intro: 'Munți la răsărit, plaje liniștite, păduri în ceață sau câmpuri sub cerul de seară: peisajele deschid vizual camera și aduc un aer de vacanță în casă. Formatele orizontale și panoramice se potrivesc deasupra canapelei sau a patului, iar cele verticale pe holuri înguste. Toate tablourile din categorie se imprimă pe pânză canvas și se livrează gata de agățat.',
        customHref: '/canvas/peisaj',
    },
    {
        key: 'floral', slug: 'tablouri-florale', label: 'Florale', heading: 'Tablouri canvas cu flori',
        metaDescription: 'Tablouri canvas cu flori și motive botanice pentru dormitor, bucătărie sau living. Pânză pe șasiu din lemn, mai multe dimensiuni, livrare 2–4 zile.',
        intro: 'Bujori, trandafiri, frunze tropicale sau buchete în acuarelă — motivele florale înviorează un dormitor, o bucătărie ori un colț de lectură fără să încarce spațiul. Le poți combina cu textile în aceleași nuanțe sau le poți folosi ca singurul accent de culoare pe un perete deschis. Alegi dimensiunea, iar tabloul vine întins pe șasiu, cu sistem de prindere.',
        customHref: '/canvas/flori',
    },
    {
        key: 'animale', slug: 'tablouri-animale', label: 'Animale', heading: 'Tablouri canvas cu animale',
        metaDescription: 'Tablouri canvas cu animale: lei, tigri, lupi, cai, câini și pisici, în fotografie, pop art sau alb-negru. Pânză pe șasiu din lemn, livrare 2–4 zile.',
        intro: 'Un leu cu privirea fixă, un lup în zăpadă sau un câine cu ochelari de soare: tablourile cu animale au personalitate și atrag privirea imediat. Colecția amestecă portrete realiste, ilustrații pop art și variante în alb-negru, potrivite pentru living, birou sau hol. Pentru camera copiilor caută modelele cu animale prietenoase din categoria dedicată.',
        customHref: '/canvas/animale',
    },
    {
        key: 'orase', slug: 'tablouri-orase', label: 'Orașe', heading: 'Tablouri canvas cu orașe',
        metaDescription: 'Tablouri canvas cu orașe și arhitectură: zgârie-nori, străzi noaptea, poduri și panorame urbane. Pânză pe șasiu din lemn, livrare în 2–4 zile.',
        intro: 'Panorame cu zgârie-nori, străzi ude de ploaie, poduri luminate și clădiri istorice: tablourile urbane dau unui living modern sau unui birou un aer de metropolă. Merg bine în interioare cu metal, beton aparent sau lemn închis la culoare. Pentru pereți lați alege formatele panoramice, iar pentru un colț îngust variantele verticale.',
        customHref: '/canvas/oras',
    },
    {
        key: 'motivational', slug: 'tablouri-motivationale', label: 'Motivaționale', heading: 'Tablouri canvas motivaționale',
        metaDescription: 'Tablouri canvas motivaționale cu citate despre muncă, disciplină și vise, pentru birou, cameră de studiu sau sală de sport. Livrare 2–4 zile.',
        intro: 'Un mesaj pe care îl vezi în fiecare dimineață contează: tablourile motivaționale pun pe perete idei despre disciplină, ambiție, răbdare și curajul de a începe. Sunt alese des pentru birouri, săli de ședințe, camere de studiu și săli de fitness. Textele sunt în engleză, ca în graficile originale; pe pagina fiecărui model găsești și sensul lor în română.',
        customHref: '/canvas/motivatii',
    },
    {
        key: 'bani-succes', slug: 'tablouri-bani-si-succes', label: 'Bani și succes', heading: 'Tablouri canvas cu bani și succes',
        metaDescription: 'Tablouri canvas despre bani, bursă, criptomonede și lux, pentru birou sau spațiu de lucru. Pânză pe șasiu din lemn, livrare în 2–4 zile lucrătoare.',
        intro: 'Teancuri de bancnote, tauri de bursă, monede digitale și simboluri ale luxului: categoria e gândită pentru antreprenori, traderi și pentru oricine vrea un birou cu energie. Multe modele combină negrul cu auriul, deci se potrivesc mobilierului închis la culoare. Pune tabloul în spatele biroului, unde se vede și în apelurile video.',
    },
    {
        key: 'pop-art', slug: 'tablouri-pop-art', label: 'Pop art', heading: 'Tablouri canvas pop art',
        metaDescription: 'Tablouri canvas pop art și în stil benzi desenate: culori saturate, personaje amuzante și graffiti. Pânză pe șasiu din lemn, livrare în 2–4 zile.',
        intro: 'Culori puternice, contururi groase, puncte de tipar și umor: pop art-ul transformă un perete gol în punctul de discuție al camerei. Categoria adună ilustrații în stil benzi desenate, colaje și graffiti, potrivite pentru living-uri tinere, camere de adolescenți, baruri sau birouri creative. Un singur tablou mare face mai mult decât trei mici.',
        customHref: '/canvas/pop-art',
    },
    {
        key: 'portrete', slug: 'tablouri-portrete', label: 'Portrete', heading: 'Tablouri canvas cu portrete',
        metaDescription: 'Tablouri canvas cu portrete și siluete: femei elegante, chipuri în stil fashion, ilustrații și fotografie artistică. Livrare în 2–4 zile lucrătoare.',
        intro: 'Chipuri în lumină dramatică, siluete elegante, portrete fashion și ilustrații cu buze, ochi sau mâini: tablourile-portret aduc o prezență umană în cameră. Se potrivesc în dormitoare, dressinguri, saloane de înfrumusețare sau pe holul de la intrare. Alege varianta verticală pentru un perete îngust și pe cea mare pentru deasupra unei console.',
    },
    {
        key: 'masini', slug: 'tablouri-masini', label: 'Mașini', heading: 'Tablouri canvas cu mașini',
        metaDescription: 'Tablouri canvas cu mașini sport, clasice și motociclete, pentru birou, garaj sau camera băieților. Pânză pe șasiu din lemn, livrare 2–4 zile.',
        intro: 'Mașini sport văzute din spate, clasice lucioase, motoare și curbe de circuit: tablourile auto sunt cadoul simplu pentru pasionați. Arată bine într-un birou, într-un garaj amenajat, într-un showroom sau în camera unui adolescent. Fotografiile în tonuri închise câștigă în format mare, iar ilustrațiile colorate merg și la dimensiuni mici.',
    },
    {
        key: 'filme', slug: 'tablouri-filme-seriale', label: 'Filme și seriale', heading: 'Tablouri canvas inspirate din filme',
        metaDescription: 'Tablouri canvas cu scene și atmosferă inspirate din filme și seriale, pentru living, home cinema sau birou. Pânză pe șasiu din lemn, livrare 2–4 zile.',
        intro: 'Gangsteri cu pălărie, petreceri în stil anii ’20, mese de poker și scene de noapte: modelele din această categorie au atmosfera filmelor cu personaje puternice. Sunt potrivite pentru un colț de home cinema, pentru un living cu lumini calde sau pentru biroul unui pasionat de cinema. Majoritatea vin în tonuri închise, care cer un perete deschis la culoare.',
    },
    {
        key: 'sport', slug: 'tablouri-sport-fitness', label: 'Sport și fitness', heading: 'Tablouri canvas sport și fitness',
        metaDescription: 'Tablouri canvas pentru sală, cameră de antrenament sau birou: fitness, culturism, box și mesaje despre disciplină. Livrare în 2–4 zile lucrătoare.',
        intro: 'Sportivi în plin efort, gantere, mănuși de box și mesaje despre disciplină: tablourile din această categorie sunt făcute pentru sala de fitness, pentru camera de antrenament de acasă sau pentru vestiar. Pânza nu are sticlă, deci nu reflectă lumina și nu se sparge, un avantaj în spațiile în care se mișcă mult.',
        customHref: '/canvas/fitness',
    },
    {
        key: 'spiritual', slug: 'tablouri-spirituale', label: 'Spirituale', heading: 'Tablouri canvas spirituale',
        metaDescription: 'Tablouri canvas spirituale: Buddha, mandale, simboluri, zodii și scene de meditație, pentru dormitor sau colțul de yoga. Livrare în 2–4 zile.',
        intro: 'Statui de Buddha, mandale, semne zodiacale și lumini calme: tablourile spirituale creează un colț de liniște în dormitor, într-un studio de yoga sau într-o cameră de terapie. Nuanțele sunt de regulă calde și estompate, ușor de asortat cu lemnul și textilele naturale. Așază tabloul la nivelul privirii, acolo unde te oprești să respiri.',
        customHref: '/canvas/meditatie',
    },
    {
        key: 'dragoste', slug: 'tablouri-dragoste', label: 'Dragoste', heading: 'Tablouri canvas despre dragoste',
        metaDescription: 'Tablouri canvas romantice: inimi, cupluri, săruturi și mesaje de iubire, pentru dormitor sau ca dar de aniversare. Livrare în 2–4 zile lucrătoare.',
        intro: 'Inimi, cupluri, săruturi și mesaje scurte despre iubire: categoria e gândită pentru dormitor și pentru cadouri de aniversare sau de Valentine’s Day. Dacă vrei un tablou cu fotografia voastră, îl poți comanda separat, dar modelele de aici sunt gata de ales într-un minut și ajung ambalate pentru cadou.',
        customHref: '/canvas/cuplu',
    },
    {
        key: 'senzual', slug: 'tablouri-senzuale', label: 'Senzuale', heading: 'Tablouri canvas senzuale',
        metaDescription: 'Tablouri canvas senzuale și nud artistic, pentru dormitor sau lounge: fotografie și ilustrație cu lumină discretă. Pânză pe șasiu, livrare 2–4 zile.',
        intro: 'Siluete în penumbră, buze, curbe și nud artistic tratat cu discreție: modelele senzuale sunt pentru spațiile adulte ale casei — dormitor, dressing, lounge sau bar. Alege-le cu grijă dacă tabloul se vede din zona de primire a oaspeților; formatele mici sau medii păstrează efectul fără să domine camera.',
    },
    {
        key: 'alb-negru', slug: 'tablouri-alb-negru', label: 'Alb-negru', heading: 'Tablouri canvas alb-negru',
        metaDescription: 'Tablouri canvas alb-negru: fotografie, portrete, orașe și grafică minimalistă, ușor de asortat în orice cameră. Pânză pe șasiu, livrare 2–4 zile.',
        intro: 'Alb-negrul nu se bate cap în cap cu nimic: merge cu mobilier colorat, cu lemn, cu metal și cu pereți în orice nuanță. În categorie găsești fotografii, portrete, orașe și grafică minimalistă. Pentru un perete de galerie combină două-trei modele alb-negru de dimensiuni diferite, aliniate pe aceeași linie de sus.',
        customHref: '/canvas/alb-negru',
    },
    {
        key: 'copii', slug: 'tablouri-camera-copii', label: 'Pentru copii', heading: 'Tablouri canvas pentru camera copiilor',
        metaDescription: 'Tablouri canvas pentru camera copiilor: animale simpatice, personaje vesele și culori calde. Fără sticlă, pe șasiu din lemn, livrare în 2–4 zile.',
        intro: 'Animale simpatice, personaje vesele și culori calde: tablourile pentru copii fac camera mai prietenoasă și pot fi schimbate ușor pe măsură ce cresc. Canvasul nu are sticlă, deci e o alegere sigură deasupra patului sau a zonei de joacă. Prinde tabloul bine în perete și alege un format pe care copilul îl vede de la nivelul lui.',
        customHref: '/canvas/camera-copii',
    },
    {
        key: 'gaming', slug: 'tablouri-gaming', label: 'Gaming', heading: 'Tablouri canvas pentru gameri',
        metaDescription: 'Tablouri canvas pentru camera de gaming: grafică neon, controllere și ilustrații în stil joc video. Pânză pe șasiu din lemn, livrare în 2–4 zile.',
        intro: 'Grafică neon, controllere, personaje pixelate și atmosferă de joc video: tablourile din această categorie completează un setup de gaming sau camera unui adolescent. Pune-le în spatele scaunului, ca să apară în stream, și alege nuanțe care se potrivesc cu iluminarea LED a camerei.',
    },
];

export const CANVAS_CATEGORY_BY_KEY: Record<string, CanvasCategory> = Object.fromEntries(CANVAS_CATEGORIES.map((c) => [c.key, c]));
export const CANVAS_CATEGORY_BY_SLUG: Record<string, CanvasCategory> = Object.fromEntries(CANVAS_CATEGORIES.map((c) => [c.slug, c]));

/** Site-ul pe care colecția canvas e indexabilă; pe celelalte 5 paginile modelelor sunt noindex,follow. */
export const CANVAS_COLLECTION_HOME = 'https://www.tablou.net';
