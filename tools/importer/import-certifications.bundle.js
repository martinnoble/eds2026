var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-certifications.js
  var import_certifications_exports = {};
  __export(import_certifications_exports, {
    default: () => import_certifications_default
  });

  // tools/importer/parsers/cards-certifications.js
  function parse(element, { document }) {
    const cards = element.querySelectorAll(".card");
    const rows = [];
    cards.forEach((card) => {
      var _a;
      const img = card.querySelector(".card-img-top, img");
      const title = card.querySelector(".card-title");
      const subtitle = card.querySelector(".card-subtitle");
      const btn = card.querySelector('.btn, a[role="button"]');
      const footer = card.querySelector(".card-footer");
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const contentCell = [];
      if (title) {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${title.textContent.trim()}</strong>`;
        contentCell.push(p);
      }
      if (subtitle) {
        const p = document.createElement("p");
        p.innerHTML = `<em>${subtitle.textContent.trim()}</em>`;
        contentCell.push(p);
      }
      if (btn) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = btn.href || ((_a = btn.closest("a")) == null ? void 0 : _a.href) || "#";
        a.textContent = btn.textContent.trim();
        p.append(a);
        contentCell.push(p);
      }
      const footerCell = [];
      if (footer) {
        const p = document.createElement("p");
        p.textContent = footer.textContent.trim();
        footerCell.push(p);
      }
      rows.push([imageCell, contentCell, footerCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-certifications", cells: rows });
    element.replaceWith(block);
  }

  // tools/importer/transformers/martinnoble-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "nav.navbar.fixed-top",
        "nav.navbar.fixed-bottom",
        "noscript",
        "iframe",
        "link"
      ]);
    }
  }

  // tools/importer/import-certifications.js
  var parsers = {
    "cards-certifications": parse
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "certifications",
    description: "Certifications page with centered heading and card grid showing professional badges with images, titles, subtitles, verification links, and date ranges",
    urls: [
      "https://www.martinnoble.com/certifications"
    ],
    blocks: [
      {
        name: "cards-certifications",
        instances: [
          ".row.row-cols-xl-4"
        ]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Main Content",
        selector: ".app-container.container",
        style: null,
        blocks: ["cards-certifications"],
        defaultContent: [".text-center h1"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_certifications_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_certifications_exports);
})();
