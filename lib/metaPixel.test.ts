// Teste: npx tsx --test lib/metaPixel.test.ts  (funcțiile pure ale pixelului Meta, fără browser)
import { test } from "node:test";
import assert from "node:assert/strict";
import { isMetaDevHost, metaContactChannel, metaProductIdFromPath, trackMeta } from "./metaPixel";

test("gazde de dezvoltare: nu trimitem la Meta", () => {
  for (const host of ["localhost", "127.0.0.1", "::1", "[::1]", "0.0.0.0", "192.168.1.20", "10.0.0.5", "172.20.1.1", "shop.local", "app.localhost", ""]) {
    assert.equal(isMetaDevHost(host), true, host);
  }
  for (const host of ["www.shopprint.ro", "euprint.ro", "172.32.0.1", "8.8.8.8"]) {
    assert.equal(isMetaDevHost(host), false, host);
  }
});

test("ViewContent: paginile de produs / configurator", () => {
  assert.equal(metaProductIdFromPath("/configurator/banner"), "banner");
  assert.equal(metaProductIdFromPath("/produse/bannere/banner-frontlit/"), "banner-frontlit");
  assert.equal(metaProductIdFromPath("/banner-product/banner-mesh"), "banner-mesh");
  assert.equal(metaProductIdFromPath("/afise"), "afise");
  assert.equal(metaProductIdFromPath("/pvc-forex/"), "pvc-forex");
  assert.equal(metaProductIdFromPath("/dimensiuni/banner/300x100"), "300x100");
  assert.equal(metaProductIdFromPath("/"), null);
  assert.equal(metaProductIdFromPath("/checkout"), null);
  assert.equal(metaProductIdFromPath("/blog/ceva"), null);
  assert.equal(metaProductIdFromPath("/configurator"), null);
  assert.equal(metaProductIdFromPath("/shop/canvas/natura"), null);
  assert.equal(metaProductIdFromPath(null), null);
});

test("Contact: WhatsApp / telefon / e-mail", () => {
  assert.equal(metaContactChannel("https://wa.me/40750473111?text=Salut"), "whatsapp");
  assert.equal(metaContactChannel("https://api.whatsapp.com/send?phone=40750473111"), "whatsapp");
  assert.equal(metaContactChannel("tel:+40750473111"), "phone");
  assert.equal(metaContactChannel("mailto:contact@shopprint.ro"), "email");
  assert.equal(metaContactChannel("/contact"), null);
  assert.equal(metaContactChannel(null), null);
});

test("trackMeta pe server / fără browser: no-op", () => {
  assert.equal(trackMeta("PageView"), false);
});
