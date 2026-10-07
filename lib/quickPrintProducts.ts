import { AFISE_CONSTANTS, FLYER_CONSTANTS, CANVAS_CONSTANTS, getFonduriEUGroups } from "./pricing";
export const QUICK_PRINT_PRODUCTS: QuickPrintProduct[] = [
  { id: "banner", name: "Banner PVC", width: 100, height: 50, quantity: 1, note: "Frontlit 440 g/mp, tiv și capse" },
  { id: "autocolante", name: "Autocolante", width: 10, height: 10, quantity: 50, note: "Oracal 3641, print și decupare, fără laminare" },
  { id: "carti-vizita", mode: "quantity", minQuantity: 100, name: "Cărți de vizită", width: 9, height: 5, quantity: 100, note: "Standard 9 × 5 cm, imprimare față-verso" },
  { id: "rollup", name: "Roll-up", width: 85, height: 200, quantity: 1, note: "Sistem cu print și husă de transport" },
 {id:"banner-verso",name:"Banner față-verso",width:100,height:50,quantity:1,note:"Print pe ambele fețe, aceeași grafică"},
 {id:"mesh",name:"Mesh",width:100,height:100,quantity:1,note:"Material perforat, tiv și capse"},
 {id:"afise",name:"Afișe",width:42,height:59,quantity:50,mode:"format",formats:AFISE_CONSTANTS.SIZES.map(s=>({key:s.key,label:s.label+" · "+s.dims})),note:"Whiteback 150 g/mp"},
 {id:"canvas",name:"Canvas",width:40,height:60,quantity:1,mode:"format",formats:[...Object.keys(CANVAS_CONSTANTS.FRAMED_PRICES_RECTANGLE),...Object.keys(CANVAS_CONSTANTS.FRAMED_PRICES_SQUARE)].map(key=>({key,label:key.replace("x"," × ")+" cm"})),note:"Pânză întinsă pe șasiu, fără ramă decorativă"},
 {id:"tapet",name:"Tapet personalizat",width:300,height:250,quantity:1,note:"Tapet vinilic, fără adeziv"},
 {id:"window-graphics",name:"Window graphics",width:100,height:100,quantity:1,note:"Folie perforată, print și decupare, fără laminare"},
 {id:"pliante",name:"Pliante",width:21,height:29,quantity:30,minQuantity:30,mode:"quantity",note:"A4, 115 g/mp, pliere simplă"},
 {id:"flayere",name:"Flyere",width:10,height:15,quantity:100,minQuantity:100,mode:"format",formats:FLYER_CONSTANTS.SIZES.map(s=>({key:s.key,label:s.label+" · "+s.dims})),note:"Hârtie standard, print pe o față"},
 {id:"fonduri-eu",name:"Fonduri europene",width:1,height:1,quantity:1,mode:"kit",formats:Object.entries(getFonduriEUGroups(false)).flatMap(([group,value])=>value.options.filter(o=>o.id!=="none").map(o=>({key:group+":"+o.id,label:value.title+" · "+o.label}))),note:"Alege un element; completează kitul în configurator"},
 {id:"plexiglass",name:"Plexiglass",width:50,height:50,quantity:1,note:"Alb, 3 mm, print pe o față"},
 {id:"pvc-forex",name:"PVC Forex",width:100,height:50,quantity:1,note:"PVC 3 mm, print standard"},
 {id:"alucobond",name:"Alucobond",width:100,height:50,quantity:1,note:"Alb, 3 mm, print standard"},
 {id:"carton",name:"Carton",width:50,height:50,quantity:1,note:"Carton ondulat E, print pe o față"},
 {id:"polipropilena",name:"Polipropilenă",width:60,height:40,quantity:1,note:"Placă 3 mm, print standard"},
 {id:"tricouri",name:"Tricouri",width:1,height:1,quantity:1,mode:"quantity",note:"Model Basic, M, negru, print față"},
 {id:"hanorace",name:"Hanorace",width:1,height:1,quantity:1,mode:"quantity",note:"Model și mărime standard, print față; alte opțiuni în configurator"},
 {id:"sepci",name:"Șepci",width:1,height:1,quantity:1,mode:"quantity",note:"Model standard, print față; alte opțiuni în configurator"},
 {id:"decor-foto-copil",name:"Decor cu fotografia copilului",width:70,height:100,quantity:1,note:"PVC 3 mm, decupare pe contur și pregătire foto"},
 {id:"personaj-propriu",name:"Personajul tău decupat pe contur",width:70,height:100,quantity:1,note:"PVC 3 mm, decupare pe contur și pregătire personaj"},
 {id:"fonduri-pnrr",name:"Kit vizibilitate PNRR",width:1,height:1,quantity:1,mode:"guided",note:"Alege materialele proiectului în configurator"},
 {id:"fonduri-regio",name:"Kit vizibilitate Regio",width:1,height:1,quantity:1,mode:"guided",note:"Alege materialele proiectului în configurator"},
 {id:"fonduri-nationale",name:"Programe naționale",width:1,height:1,quantity:1,mode:"guided",note:"Alege materialele proiectului în configurator"},
 {id:"semnalistica",name:"Semnalistică și indicatoare",width:1,height:1,quantity:1,mode:"guided",note:"Alege întâi un model și materialul; prețul se calculează în configurator"},
];
export type QuickPrintId = string;
export type QuickPrintProduct = {id: string; name: string; width: number; height: number; quantity: number; note: string; mode?: "format" | "quantity" | "kit" | "guided"; formats?: {key: string; label: string}[]; minQuantity?: number};
export type QuickPrintSelection = {product: QuickPrintId; width: number; height: number; quantity: number; format?: string};
export type QuickPrintResult = {error: string} | {total: number; unit: number; href: string};
export function quickPrintDefaultFormat(p: QuickPrintProduct) {
 return p.id === "afise" ? "A2" : p.id === "canvas" ? "40x60" : p.id === "fonduri-eu" ? "afisInformativ:A3" : p.formats?.[0]?.key;
}

