import { Suspense } from 'react';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { SeoDimensionsLinks } from '@/components/SeoDimensionsLinks';

export const metadata: Metadata = {
  title: 'Mesh Publicitar pentru Fațade și Schele de Șantier - HomePrint',
  description: 'Mesh publicitar 370g microperforat, nu se comportă ca o velă în vânt — soluția pentru fațade în renovare, schele și garduri de șantier. Tiv și capse incluse, preț instant.',
  keywords: ['mesh publicitar', 'mesh fatada santier', 'banner mesh microperforat', 'plasa publicitara schela', 'print mesh', 'homeprint'],
  alternates: {
    canonical: '/configurator/mesh',
  },
  openGraph: {
    title: 'Configurator Mesh publicitar',
    description: 'Mesh publicitar la dimensiuni tale, configurare și comandă online.',
    images: ['/products/mesh/mesh_publicitar_personalizat.jpg'],
  }
};

export default function MeshConfiguratorPage() {
  return (
    <div className="pt-20">
      <h1 className="sr-only">Mesh publicitar personalizat - configurator online print outdoor</h1>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", item: "/" },
          { name: "Configuratoare", item: "/configurator" },
          { name: "Mesh publicitar", item: "/configurator/mesh" }
        ]}
      />
      <ProductSchema
        name="Mesh publicitar personalizat"
        description="Mesh publicitar pentru exterior. Tiv și capse incluse. Configurare online la dimensiunile tale."
        image="/products/mesh/mesh_publicitar_personalizat.jpg"
        url="/configurator/mesh"
        price="45.00"
      />
      <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul...</div>}>
        <ConfiguratorDispatcher configuratorId="mesh" />
      </Suspense>

      <FAQSchema
        faqs={[
          {
            question: "De ce se folosește mesh-ul pe schele și fațade în renovare, nu un banner clasic?",
            answer: "Materialul mesh este microperforat (aprox. 30-40% din suprafață e goluri de aer). Vântul trece prin el în loc să-l umfle ca pe o velă, deci nu smulge din capse și nu rupe structura de schelă pe care e prins — exact ce ai nevoie pe o fațadă în lucru câteva luni."
          },
          {
            question: "Se vede bine imaginea printată, cu toate găurile din material?",
            answer: "Da. La distanța normală de vizualizare stradală, ochiul nu percepe perforațiile individuale — vezi imaginea completă, la fel de clar ca pe un banner solid. De aproape se distinge o ușoară transparență, dar impactul publicitar de la stradă nu are de suferit."
          },
          {
            question: "Rezistă mesh-ul montat luni întregi pe un șantier, la orice vreme?",
            answer: "Da, e gândit exact pentru expunere lungă la exterior — rezistă la ploaie, radiație UV și, cel mai important, la vânt puternic pe suprafețe mari (fațade întregi de bloc), unde un banner plin ar pune presiune uriașă pe sistemul de prindere."
          },
          {
            question: "Ce finisaje și dimensiuni sunt incluse?",
            answer: "Tiv perimetral și capse metalice de prindere din 30-50cm sunt incluse gratuit, la fel ca la bannerele clasice. Configuratorul îți dă preț instant pentru orice dimensiune, de la un panou mic până la o fațadă întreagă acoperită din mai multe fâșii."
          }
        ]}
      />

      <section className="bg-white py-16 mt-16 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Mesh publicitar pentru fațade și șantiere
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Mesh <strong className="text-orange-600">370 g/m², microperforat</strong> — soluția de reclamă pentru fațade de clădiri în renovare, garduri de șantier și schele, acolo unde un banner plin ar deveni o velă în bătaia vântului.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">De ce mesh și nu banner clasic</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Nu se comportă ca o velă în vânt</strong>
                    <span className="text-slate-600 text-sm">Microperforațiile lasă aerul să treacă prin material, în loc să se umfle și să tragă din capse — esențial pe o schelă înaltă sau o fațadă întreagă expusă lunar la rafale.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Standard pe șantiere de construcții/renovare</strong>
                    <span className="text-slate-600 text-sm">E materialul folosit peste tot unde vezi o clădire "învelită" în timpul lucrărilor — acoperă schela și, în același timp, transformă fațada într-un panou publicitar mare.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Finisaje incluse, orice dimensiune</strong>
                    <span className="text-slate-600 text-sm">Tiv și capse gratuite ca la orice banner HomePrint. Configurezi lățimea și înălțimea exactă a fațadei sau gardului tău și primești preț instant.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce trebuie să știi înainte să comanzi</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Mesh-ul de 370 g/m² este gândit strict pentru exterior expus îndelungat — fațade în renovare, garduri de șantier, schele mari sau panouri gigant unde greutatea unui banner PVC solid ar fi o problemă mecanică.
              </p>
              <p className="text-slate-600 leading-relaxed font-bold">
                Pentru fațade mari, imaginea se împarte automat pe fâșii verticale la lățimea rolei — trimite grafica la rezoluție mare (min. 100-150 dpi la scară reală) ca detaliile să rămână clare de la distanță.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-slate-200 pt-16">
            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Mesh Publicitar</h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  q: "De ce se folosește mesh-ul pe schele și fațade în renovare, nu un banner clasic?",
                  a: "Materialul mesh este microperforat (aprox. 30-40% din suprafață e goluri de aer). Vântul trece prin el în loc să-l umfle ca pe o velă, deci nu smulge din capse și nu rupe structura de schelă pe care e prins — exact ce ai nevoie pe o fațadă în lucru câteva luni."
                },
                {
                  q: "Se vede bine imaginea printată, cu toate găurile din material?",
                  a: "Da. La distanța normală de vizualizare stradală, ochiul nu percepe perforațiile individuale — vezi imaginea completă, la fel de clar ca pe un banner solid. De aproape se distinge o ușoară transparență, dar impactul publicitar de la stradă nu are de suferit."
                },
                {
                  q: "Rezistă mesh-ul montat luni întregi pe un șantier, la orice vreme?",
                  a: "Da, e gândit exact pentru expunere lungă la exterior — rezistă la ploaie, radiație UV și, cel mai important, la vânt puternic pe suprafețe mari (fațade întregi de bloc), unde un banner plin ar pune presiune uriașă pe sistemul de prindere."
                },
                {
                  q: "Ce finisaje și dimensiuni sunt incluse?",
                  a: "Tiv perimetral și capse metalice de prindere din 30-50cm sunt incluse gratuit, la fel ca la bannerele clasice. Configuratorul îți dă preț instant pentru orice dimensiune, de la un panou mic până la o fațadă întreagă acoperită din mai multe fâșii."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <h4 className="font-bold text-lg text-slate-900 mb-2">{faq.q}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <SeoDimensionsLinks
            productId="mesh"
            productName="Mesh publicitar"
            currentW={100}
            currentH={100}
          />
        </div>
      </section>
    </div>
  );
}
