// Modelele de textile (tricouri, hanorace, sepci): culori, marimi, poze.
// Sursa unica pentru configurator (components/TextileConfigurator.tsx) si pentru importul de comenzi din WhatsApp (lib/whatsappOrder.ts).
export type TextileModel = {
    id: string;
    name: string;
    colors: string[];
    sizes: string[];
    images?: Record<string, string>;
    description?: string;
};

export const TRICOURI_MODELS: TextileModel[] = [
    {
        "id": "basic",
        "name": "Tricou Basic",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Gri Inchis", "Portocaliu", "Verde sticla", "Galben"],
        "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-alb-xs-119972_800x.webp",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-negru-xs-247203_800x.webp",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-albastru-marin-xs-562991_800x.webp",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-albastru-regal-xs-324998_800x.webp",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-rosu-xs-995395_800x.webp",
            "Gri Inchis": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-gri-inchis-xs-511062_800x.webp",
            "Portocaliu": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-portocaliu-xs-392939_800x.webp",
            "Verde sticla": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-verde-sticla-xs-983798_800x.webp",
            "Galben": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-galben-xs-784459_800x.webp"
        },
        "description": "Single Jersey, 100 % bumbac (compoziţia culorii poate să fie diferită - culoarea 03 - 97 % bumbac, 3 % viscoza, culoarea 12 – 85 % bumbac şi 15 % vâscoză), finisaj cu silicon. Croială tubulară, tivul gulerului este confecționat din material raiat 1:1, este aplicată o bandă de întărire de la umăr la umăr."
    },
    {
        "id": "polo_pique",
        "name": "Tricou Polo Pique Barbati",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Portocaliu", "Galben", "Verde Mediu", "Gri Metalic"],
        "sizes": ["S", "M", "L", "XL", "XXL", "XXXL"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-alb-s-607943_800x.jpg",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-negru-s-666567_800x.jpg",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-albastru-marin-s-467019_800x.jpg",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-albastru-regal-s-740687_800x.jpg",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-rosu-s-212154_800x.jpg",
            "Portocaliu": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-portocaliu-s-720311_800x.jpg",
            "Galben": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-galben-s-470957_800x.jpg",
            "Verde Mediu": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-verde-mediu-s-519219_800x.jpg",
            "Gri Metalic": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-personalizat-tshirt-textiledivision-gri-metalic-s-605041_800x.jpg"
        },
        "description": "Pique, 65 % bumbac, 35 % poliester (compoziţia culorii poate să fie diferită: culoarea 03 - 97 % bumbac, 3 % viscoza, culoarea 12 – 85 % bumbac şi 15 % vâscoză). Prezintă cusături laterale, gulerul și manșetele sunt din material raiat 1:1, cu două dungi decorative în relief, fentă cu trei nasturi de culoarea materialului de bază, interiorul gulerului prezintă o bandă confecţionată din acelaşi material precum cel de bază, la nivelul umerilor sunt prezente cusături de întărire."
    },
    {
        "id": "polo_pique_femei",
        "name": "Tricou Polo Pique Femei",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Portocaliu", "Galben", "Verde Sticla", "Gri Inchis"],
        "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-alb-xs-281843_800x.jpg",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-negru-xs-441234_800x.jpg",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-albastru-marin-xs-267016_800x.jpg",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-albastru-regal-xs-537011_800x.jpg",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-rosu-xs-496056_800x.jpg",
            "Portocaliu": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-portocaliu-xs-717297_800x.jpg",
            "Galben": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-galben-xs-392904_800x.jpg",
            "Verde Sticla": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-verde-sticla-xs-112872_800x.jpg",
            "Gri Inchis": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-femei-personalizat-tshirt-textiledivision-gri-inchis-xs-428587_800x.jpg"
        },
        "description": "Pique, 65 % bumbac, 35 % poliester (compoziţia culorii poate să fie diferită: culoarea 03 - 97 % bumbac, 3 % viscoza, culoarea 12 – 85 % bumbac şi 15 % vâscoză). Model cambrat ce prezintă cusături laterale, gulerul și manșetele sunt din material raiat 1:1, cu două dungi decorative în relief, fentă îngustă cu cinci nasturi de culoarea materialului de bază, interiorul gulerului prezintă o bandă confecţionată din acelaşi material precum cel de bază, la nivelul umerilor sunt prezente cusături de întărire."
    },
    {
        "id": "v_neck_barbati",
        "name": "Tricou V-Neck Barbati",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Gri Inchis", "Verde Mediu", "Galben"],
        "sizes": ["S", "M", "L", "XL", "XXL", "XXXL"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-alb-xs-119972_800x.webp",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-negru-xs-247203_800x.webp",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-albastru-marin-xs-562991_800x.webp",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-albastru-regal-xs-324998_800x.webp",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-rosu-xs-995395_800x.webp",
            "Gri Inchis": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-gri-inchis-xs-511062_800x.webp",
            "Verde Mediu": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-verde-sticla-xs-983798_800x.webp",
            "Galben": "https://shop.printcenter.ro/cdn/shop/files/tricou-clasic-personalizat-tshirt-textiledivision-galben-xs-784459_800x.webp"
        },
        "description": "Single Jersey, 100 % bumbac (compoziţia culorii 12 poate să fie diferită – 85 % bumbac şi 15 % vâscoză), finisaj cu silicon. Croială slim fit ce prezintă cusături laterale, guler în formă de V cu decolteu adânc, tivul îngust al gulerului este confecționat din material raiat 1:1, cu adaos de 5 % elastan, interiorul gulerului prezintă bandă de întărire din același material de bază, la nivelul umerilor este aplicată o cusătură de întărire, finisaj cu silicon."
    },
    {
        "id": "v_neck_femei",
        "name": "Tricou V-Neck Femei",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Gri Inchis", "Turcoaz", "Verde Mediu", "Galben"],
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-alb-s-786621_800x.jpg",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-negru-s-222401_800x.jpg",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-albastru-marin-s-114507_800x.jpg",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-albastru-regal-s-711816_800x.jpg",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-rosu-s-711452_800x.jpg",
            "Gri Inchis": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-gri-inchis-s-338888_800x.jpg",
            "Turcoaz": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-turcoaz-s-986445_800x.jpg",
            "Verde Mediu": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-verde-mediu-s-933477_800x.jpg",
            "Galben": "https://shop.printcenter.ro/cdn/shop/files/tricou-v-neck-femei-personalizat-tshirt-textiledivision-galben-s-809368_800x.jpg"
        },
        "description": "Single Jersey, 100 % bumbac (compoziţia culorii 12 poate să fie diferită – 85 % bumbac şi 15 % vâscoză), finisaj cu silicon. Croială cambrată ce prezintă cusături laterale, guler în formă de V cu decolteu adânc, tivul gulerului este din același material de bază, cu 5% adaos de elastan, interiorul gulerului prezintă bandă de întărire din același material de bază, la nivelul umerilor este aplicată o cusătură de întărire, mâneci mai scurte, finisaj cu silicon."
    },
    {
        "id": "basic_copii",
        "name": "Tricou Basic Copii",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Portocaliu", "Galben", "Gri Inchis", "Verde Sticla"],
        "sizes": ["110 cm", "122 cm", "134 cm", "146 cm", "158 cm"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-alb-110-cm4-ani-223120_800x.jpg",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-negnu-110-cm4-ani-917506_800x.jpg",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-albastru-marin-110-cm4-ani-264906_800x.jpg",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-albastru-regal-110-cm4-ani-825703_800x.jpg",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-rosu-110-cm4-ani-429646_800x.jpg",
            "Portocaliu": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-portocaliu-110-cm4-ani-353917_800x.jpg",
            "Galben": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-galben-110-cm4-ani-503832_800x.jpg",
            "Gri Inchis": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-gri-inchis-110-cm4-ani-105931_800x.jpg",
            "Verde Sticla": "https://shop.printcenter.ro/cdn/shop/files/copy-of-tricou-basic-copii-personalizat-tshirt-textiledivision-verde-sticla-110-cm4-ani-275102_800x.jpg"
        },
        "description": "Single Jersey, 100 % bumbac, (compoziţia culorii poate să fie diferită - culoarea 12 – 85 % bumbac şi 15 % vâscoză), finisaj cu silicon. Fără etichetă - pregătit de rebranding, cusături laterale, tivul îngust al gulerului este confecționat din material raiat 1:1, cu adaos de 5 % elastan, etichetă pentru mărime, de dimensiuni mici, în partea posterioară a gulerului, interiorul gulerului prezintă bandă de întărire din același material de bază, la nivelul umerilor este aplicată o cusătură de întărire, finisaj cu silicon."
    },
    {
        "id": "polo_pique_copii",
        "name": "Tricou Polo Pique Copii",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Turcoaz", "Galben", "Verde Mar", "Gri Inchis"],
        "sizes": ["110 cm", "122 cm", "134 cm", "146 cm", "158 cm"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-alb-110-cm4-ani-371478_800x.jpg",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-negru-110-cm4-ani-951762_800x.jpg",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-albastru-marin-110-cm4-ani-899167_800x.jpg",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-albastru-regal-110-cm4-ani-555774_800x.jpg",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-rosu-110-cm4-ani-728688_800x.jpg",
            "Turcoaz": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-turcoaz-110-cm4-ani-119428_800x.jpg",
            "Galben": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-galben-110-cm4-ani-441728_800x.jpg",
            "Verde Mar": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-verde-mar-110-cm4-ani-616581_800x.jpg",
            "Gri Inchis": "https://shop.printcenter.ro/cdn/shop/files/tricou-polo-pique-copii-personalizat-tshirt-textiledivision-gri-inchis-110-cm4-ani-701324_800x.jpg"
        },
        "description": "Pique, 65 % bumbac, 35 % poliester (compoziţia culorii 12 poate să fie diferită – 85 % bumbac şi 15 % vâscoză). Cusături laterale, gulerul și manșetele sunt din material raiat 1:1, cu două dungi decorative în relief, fentă îngustă cu trei nasturi de culoarea materialului de bază, interiorul gulerului prezintă o bandă confecţionată din acelaşi material precum cel de bază, la nivelul umerilor sunt prezente cusături de întărire."
    }
];

export const HANORACE_MODELS: TextileModel[] = [
    {
        "id": "hanorac_basic",
        "name": "Hanorac Cape Barbati",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Galben", "Turcoaz", "Gri Inchis", "Verde Sticla"],
        "sizes": ["S", "M", "L", "XL", "XXL", "XXXL"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-alb-s-292392_800x.jpg",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-negru-s-352049_800x.jpg",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-albastru-marin-s-350438_800x.jpg",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-albastru-regal-s-627714_800x.jpg",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-rosu-s-352693_800x.jpg",
            "Galben": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-galben-s-568823_800x.jpg",
            "Turcoaz": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-turcoaz-s-556057_800x.jpg",
            "Gri Inchis": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-gri-inchis-s-752235_800x.jpg",
            "Verde Sticla": "https://shop.printcenter.ro/cdn/shop/files/hanorac-cape-personalizat-tshirt-textiledivision-verde-sticla-s-330497_800x.jpg"
        },
        "description": "French terry, interior pieptănat, 65 % bumbac, 35 % poliester (compoziţia culorii poate să fie diferită – 85 % bumbac şi 15 % vâscoză). Croială dreaptă ce prezintă cusături laterale, fermoar modelat pe toată lungimea, glugă căptușită, prevăzută cu șnur, interiorul gulerului prezintă bandă de întărire în culoarea materialului de bază, buzunare tip rândunică, tivul inferior și manșetele sunt din material raiat 2:2 cu 5 % elastan, interior pieptănat."
    },
    {
        "id": "hanorac_trendy_zipper",
        "name": "Hanorac Trendy Zipper Barbati",
        "colors": ["Alb", "Negru", "Albastru Marin", "Albastru Regal", "Rosu", "Verde Sticla", "Gri Inchis", "Turcoaz", "Lime"],
        "sizes": ["S", "M", "L", "XL", "XXL", "XXXL"],
        "images": {
            "Alb": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-alb-s-334855_800x.jpg",
            "Negru": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-negru-s-546619_800x.jpg",
            "Albastru Marin": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-albastru-marin-s-915031_800x.jpg",
            "Albastru Regal": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-albastru-regal-s-876188_800x.jpg",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-rosu-s-978571_800x.jpg",
            "Verde Sticla": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-verde-sticla-s-444925_800x.jpg",
            "Gri Inchis": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-gri-inchis-s-513097_800x.jpg",
            "Turcoaz": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-turcoaz-s-241866_800x.jpg",
            "Lime": "https://shop.printcenter.ro/cdn/shop/files/hanorac-trendy-zipper-personalizat-tshirt-textiledivision-lime-s-199959_800x.jpg"
        },
        "description": "French terry, interior pieptănat, 65 % bumbac, 35 % poliester (compoziţia culorii poate să fie diferită – 85 % bumbac şi 15 % vâscoză). Croială dreaptă ce prezintă cusături laterale, glugă căptușită, prevăzută cu șnur și cu bandă de întărire pe spate, gulerul format prin intersecţia părţilor glugii, buzunare tip rândunică, tivul inferior și manșetele sunt din material raiat 2:2 cu 5 % elastan, interior pieptănat."
    }
];

export const SEPCI_MODELS: TextileModel[] = [
    {
        "id": "sapca_personalizata",
        "name": "Șapcă Personalizată",
        "colors": [
            "Alba",
            "Neagra",
            "Galbena",
            "Albastru regal",
            "Rosu",
            "Portocaliu",
            "Verde mediu",
            "Gri antic",
            "Turcoaz"
        ],
        "sizes": [
            "Universal"
        ],
        "images": {
            "Alba": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-alba-942108_800x.jpg",
            "Neagra": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-neagra-777755_800x.jpg",
            "Galbena": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-galbena-476184_800x.jpg",
            "Albastru regal": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-albastru-regal-859983_800x.jpg",
            "Rosu": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-rosu-155315_800x.jpg",
            "Portocaliu": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-portocaliu-937276_800x.jpg",
            "Verde mediu": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-verde-mediu-713198_800x.jpg",
            "Gri antic": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-gri-antic-841763_800x.jpg",
            "Turcoaz": "https://shop.printcenter.ro/cdn/shop/files/sapca-personalizata-hats-textiledivision-turcoaz-571541_800x.jpg"
        },
        "description": "Şapcă unisex reglabilă Twill pieptănat, 100 % bumbac model cu 5 paneluri panel frontal îmbinat cozoroc cusut, ușor curbat găuri de ventilaţie cusute bandă absorbantă a transpiraţiei mărime ajustabilă prin cataramă Etichetă: satin Personalizare: imprimare digitala color"
    }
];

export const TEXTILE_MODELS: Record<"tricouri" | "hanorace" | "sepci", TextileModel[]> = {
    tricouri: TRICOURI_MODELS,
    hanorace: HANORACE_MODELS,
    sepci: SEPCI_MODELS,
};
