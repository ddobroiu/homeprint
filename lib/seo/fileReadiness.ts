import { siteKeyFromOrigin } from "./siteSpecialization";

export function printFileDimensions(widthCm: number, heightCm: number, pixelWidth: number, pixelHeight: number, targetPpi: number, bleedMm: number) {
  if (![widthCm,heightCm,pixelWidth,pixelHeight,targetPpi].every(n=>Number.isFinite(n)&&n>0)
    || !Number.isInteger(pixelWidth) || !Number.isInteger(pixelHeight) || !Number.isFinite(bleedMm) || bleedMm<0) return null;
  const horizontalPpi=pixelWidth/(widthCm/2.54);
  const verticalPpi=pixelHeight/(heightCm/2.54);
  const requiredWidth=Math.ceil(widthCm/2.54*targetPpi);
  const requiredHeight=Math.ceil(heightCm/2.54*targetPpi);
  if (![horizontalPpi,verticalPpi,requiredWidth,requiredHeight].every(Number.isFinite)) return null;
  return { horizontalPpi, verticalPpi, minimumPpi:Math.min(horizontalPpi,verticalPpi), requiredWidth, requiredHeight,
    widthWithBleedMm:widthCm*10+2*bleedMm, heightWithBleedMm:heightCm*10+2*bleedMm };
}

const READINESS = {
  adbanner: { title:"Fișierul pentru banner și mesh: dimensiune, rezoluție și margini", intro:"La un print pentru exterior, pornești de la dimensiunea montată și distanța de privire. Un logo vectorial și o fotografie originală au cerințe diferite; un fișier mare în MB nu garantează o imagine potrivită.", check:"Verifică orientarea bannerului și poziția textului față de tiv și capse. Pentru un print față-verso, pregătește separat fiecare față. Confirmă marginea necesară pentru finisare înainte de export.", width:100, height:50, ppi:100 },
  euprint: { title:"Pregătirea graficii pentru panouri, plăci și proiecte finanțate", intro:"Un panou pentru proiect are două verificări separate: fișierul trebuie să poată fi printat clar, iar siglele și textele trebuie să respecte documentația programului. Rezoluția imaginii nu confirmă respectarea manualului de identitate.", check:"Folosește variantele oficiale ale siglelor, verifică datele proiectului și aprobă macheta finală. Confirmă suportul, dimensiunea și sistemul de prindere înainte să trimiți fișierul pentru producție.", width:100, height:70, ppi:150 },
  prynt: { title:"Fișiere pentru flyere, pliante și textile: ce verifici înainte de print", intro:"La printul pe hârtie contează tăierea și ordinea paginilor; la textile contează mărimea graficii și poziția pe produs. Păstrează un fișier original editabil și exportă o copie pentru formatul pe care îl comanzi.", check:"La flyere și pliante, verifică marginea de tăiere și zona de siguranță pentru text. Pentru pliante, verifică îndoirea și ordinea fețelor. La textile, confirmă dimensiunea și poziția imprimării, nu doar mărimea tricoului.", width:21, height:29.7, ppi:300 },
  shopprint: { title:"Cum pregătești fișierul pentru print pe hârtie, folie sau placă", intro:"Materialul și finisarea decid cum pregătești grafica. Începe cu formatul final, apoi verifică textul, fotografiile și marginile în raport cu tăierea, lipirea sau prinderea produsului.", check:"Nu folosi aceeași margine pentru orice produs. Verifică separat finisarea foliei, tăierea hârtiei și prinderea plăcii. Păstrează logo-ul și textul în format vectorial când este posibil.", width:100, height:50, ppi:150 },
  homeprint: { title:"Fotografia pentru fototapet și decor: măsurare și decupaj", intro:"O fotografie poate arăta bine pe telefon și poate deveni neclară la dimensiunea peretelui. Verifică fișierul original, proporția imaginii și elementele care pot fi tăiate la încadrare.", check:"Măsoară peretele și marchează ușile, prizele și alte obstacole. Verifică decupajul pe întregul format, apoi confirmă împărțirea și marginile necesare pentru produsul ales. Nu inventa panouri de montaj fără să verifici specificația comenzii.", width:200, height:250, ppi:150 },
  tablou: { title:"Fotografia pentru canvas: pixeli, proporție și marginea șasiului", intro:"Pentru un canvas, verifici fotografia la formatul tabloului, nu la dimensiunea ecranului. Păstrează spațiu în jurul subiectului pentru marginea întinsă pe șasiu și examinează decupajul înainte de comandă.", check:"Folosește fotografia originală în locul unei capturi de ecran. Verifică fețele și textul în raport cu marginea șasiului. Un fișier mărit artificial poate avea mai mulți pixeli fără să păstreze detaliul fotografiei.", width:30, height:20, ppi:150 },
};
export function fileReadiness(origin:string) { return READINESS[siteKeyFromOrigin(origin) ?? "shopprint"]; }
