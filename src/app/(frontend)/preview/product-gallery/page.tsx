"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* Sample product images — multiple views of the OmniSwitch 6920 */
const productImages = [
  {
    src: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/omniswitch-6920-product-image.png",
    alt: "OmniSwitch 6920 — Front view",
  },
  {
    src: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/omniswitch-6900-product-image.png",
    alt: "OmniSwitch 6920 — Angle view",
  },
  {
    src: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/omniswitch-6860-product-image.png",
    alt: "OmniSwitch 6920 — Stacked",
  },
  {
    src: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/omniswitch-6560-product-image.png",
    alt: "OmniSwitch 6920 — Ports detail",
  },
];

export default function ProductGalleryPreview() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="mx-auto max-w-[1320px] flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900">Preview — Product Image Gallery</h1>
          <Link href="/" className="text-xs font-semibold text-ale hover:underline">← Back to home</Link>
        </div>
      </div>

      {/* Product section mock */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            {/* Left — description */}
            <div className="max-w-3xl flex-1">
              <p className="text-lg text-gray-500 leading-relaxed">
                The OmniSwitch 6920 is purpose-built for AI/ML workloads and high-performance computing environments requiring deterministic, ultra-low-latency networking. With 25G/100G density and advanced congestion management, it supports the most demanding data center applications.
              </p>
            </div>

            {/* Right — image gallery */}
            <div className="mt-10 lg:mt-0 lg:w-[420px] shrink-0">
              {/* Main image */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 flex items-center justify-center mb-3 aspect-square">
                <Image
                  src={productImages[selected].src}
                  alt={productImages[selected].alt}
                  width={400}
                  height={400}
                  className="object-contain max-h-[320px] w-auto transition-opacity duration-300"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 flex items-center justify-center transition-all duration-200 ${
                      i === selected
                        ? "border-ale shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={72}
                      height={72}
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
