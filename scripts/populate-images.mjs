/**
 * Populate CMS with images from the original ALE website.
 * Downloads images from web-assets.al-enterprise.com, uploads to Payload Media,
 * and links them to products, solutions, industries, platforms, services, and blog posts.
 *
 * Usage: node scripts/populate-images.mjs
 * Env: API_URL, PAYLOAD_SECRET (or uses defaults)
 */

const API = process.env.API_URL || 'https://aleweb-production-b8f6.up.railway.app';
const SECRET = process.env.PAYLOAD_SECRET || 'a7Xk9mQ2vL4pR8wF3jN6hT1yB5cZ0eD9sG4uW7nK2xM8bP3qJ6';

const ALE = 'https://web-assets.al-enterprise.com/-/media/assets/internet/images';

// ─── Image mappings ───────────────────────────────────────────────────────────

const productImages = {
  // Switches
  'omniswitch-6360': { url: `${ALE}/omniswitch-6360-48-tf-480x480.png`, alt: 'OmniSwitch 6360' },
  'omniswitch-6560': { url: `${ALE}/omniswitch-6560-p24z8-front-480x480-product-showcase.png`, alt: 'OmniSwitch 6560E' },
  'omniswitch-6570m': { url: `${ALE}/omniswitch-6570m-u28-f-480x480.png`, alt: 'OmniSwitch 6570M' },
  'omniswitch-6860': { url: `${ALE}/omniswitch-6860e-p48-left-4c-480x480-product-showcase.png`, alt: 'OmniSwitch 6860E' },
  'omniswitch-6870': { url: `${ALE}/omniswitch-6870-48-f-l-400x300.png`, alt: 'OmniSwitch 6870' },
  'omniswitch-6900': { url: `${ALE}/os6900-v48c8-t-l-480x480-v2.png`, alt: 'OmniSwitch 6900' },
  'omniswitch-6920': { url: `${ALE}/omniswitch-6920-product-image.png`, alt: 'OmniSwitch 6920' },
  'omniswitch-9900': { url: `${ALE}/omniswitch-9912-l-t-354x384.png`, alt: 'OmniSwitch 9900' },
  'omniswitch-6465': { url: `${ALE}/os6465-p6-photo-front-lft-4c-480-480-all.png`, alt: 'OmniSwitch 6465' },
  'omniswitch-6465t': { url: `${ALE}/omniswitch-6465t-12-tf-480x480-product-showcase.png`, alt: 'OmniSwitch 6465T' },
  'omniswitch-6575': { url: `${ALE}/omniswitch-6575-p12-f-l-480x480.png`, alt: 'OmniSwitch 6575' },
  'omniswitch-6865': { url: `${ALE}/omniswitch-6865-u12x-left-480x480-product-showcase.png`, alt: 'OmniSwitch 6865' },
  'omniswitch-2260': { url: `${ALE}/omniswitch-2260-10-product-image-r-480x480.png`, alt: 'OmniSwitch 2260' },
  'omniswitch-2360': { url: `${ALE}/omniswitch-2360-p48x-product-image-l-480x480.png`, alt: 'OmniSwitch 2360' },
  // Devices
  'smart-deskphones': { url: `${ALE}/smart-deskphones-8088-right-4c-480x480-product-showcase.png`, alt: 'Smart DeskPhone 8088' },
  'wlan-handsets': { url: `${ALE}/8158s-8168s-wlan-handset-f-480x480-product-showcase.png`, alt: 'WLAN Handsets 8158s/8168s' },
  'dect-handsets': { url: `${ALE}/dect-handsets-8262-application-photo-left-4c-480x480-all.png`, alt: 'DECT Handset 8262' },
  'sip-dect-handsets': { url: `${ALE}/dect-handsets-8262-application-photo-left-4c-480x480-all.png`, alt: 'SIP-DECT Handset' },
  'ale-deskphones': { url: `${ALE}/smart-deskphones-8088-right-4c-480x480-product-showcase.png`, alt: 'ALE DeskPhones' },
  'ale-sip-deskphones': { url: `${ALE}/smart-deskphones-8088-right-4c-480x480-product-showcase.png`, alt: 'ALE SIP DeskPhones' },
  'aries-headsets': { url: `${ALE}/8158s-8168s-wlan-handset-f-480x480-product-showcase.png`, alt: 'Aries Headsets' },
  // Platforms / Integration
  'omnipcx-open-gateway': { url: `${ALE}/omnipcx-open-gateway-banner-480x480.jpg`, alt: 'OmniPCX Open Gateway' },
  'microsoft-teams-integration': { url: `${ALE}/microsoft-teams-product-image-showcase-en-480x480.png`, alt: 'Microsoft Teams Integration' },
  // Management
  'omnivista-8770': { url: `${ALE}/omnivista-cirrus-3screens-480x480.png`, alt: 'OmniVista 8770' },
  'omnivista-smart-tool': { url: `${ALE}/omnivista-cirrus-3screens-480x480.png`, alt: 'OmniVista Smart Tool' },
  // Applications
  'visual-automated-attendant': { url: `${ALE}/visual-automated-attendant-tree-480x-en-web.png`, alt: 'Visual Automated Attendant' },
  // WLAN - use generic AP image
  'stellar-ap1301': { url: `${ALE}/omniaccess-wireless-ap1232-front-480x480.png`, alt: 'OmniAccess Stellar AP' },
  // DECT base stations
  'dect-base-stations': { url: `${ALE}/dect-infrastructure-8340-smart-ip-photo-left-4c-480x480-all.png`, alt: 'DECT Base Station 8340' },
  'sip-dect-base-stations': { url: `${ALE}/dect-infrastructure-8340-smart-ip-photo-left-4c-480x480-all.png`, alt: 'SIP-DECT Base Station' },
};

// Use generic AP image for all WLAN products
const wlanImage = { url: `${ALE}/omniaccess-wireless-ap1232-front-480x480.png`, alt: 'OmniAccess Stellar Access Point' };

const solutionImages = {
  'digital-age-networking': { url: `${ALE}/solutions-digital-age-networking-homepage-header-l2-l3-1440x600.jpg`, alt: 'Digital Age Networking' },
  'digital-age-communications': { url: `${ALE}/team-co-working-open-space-rainbow-web-page-header-1785x725.jpg`, alt: 'Digital Age Communications' },
  'network-as-a-service': { url: `${ALE}/data-centre-racks-v2.jpg`, alt: 'Network as a Service' },
  'iot-networks': { url: `${ALE}/header-banner-solutions-iot-1440x600-v2.jpg`, alt: 'IoT Networks' },
  'modernize-communications': { url: `${ALE}/solutions-dac-focus-topic-810x380.jpg`, alt: 'Modernize Communications' },
  'secure-your-network': { url: `${ALE}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`, alt: 'Secure Your Network' },
  'optimize-with-ai': { url: `${ALE}/ai-ops-offer-header-image.jpg`, alt: 'Optimize with AI' },
  'move-to-cloud': { url: `${ALE}/solutions-cloud-communications-focus-topic-1-810x380.jpg`, alt: 'Move to Cloud' },
  'enable-hybrid-work': { url: `${ALE}/solutions-homepage-callout-image.jpg`, alt: 'Enable Hybrid Work' },
  'connect-everything': { url: `${ALE}/iot-focus-topic-v2.jpg`, alt: 'Connect Everything' },
  'business-continuity': { url: `${ALE}/solutions-naas-focus-topic-1-810x380.jpg`, alt: 'Business Continuity' },
  'sd-wan-sase': { url: `${ALE}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`, alt: 'SD-WAN & SASE' },
  'cpaas': { url: `${ALE}/multidevicerainbow.jpg`, alt: 'CPaaS - Rainbow' },
  'unified-communications': { url: `${ALE}/platform-page-banner-image.jpg`, alt: 'Unified Communications' },
  'network-security': { url: `${ALE}/digital-government-810x340-banner.jpg`, alt: 'Network Security' },
  'autonomous-network': { url: `${ALE}/ai-ops-offer-header-image.jpg`, alt: 'Autonomous Network' },
  'data-center-networking': { url: `${ALE}/data-centre-racks-v2.jpg`, alt: 'Data Center Networking' },
  'industrial-networks': { url: `${ALE}/manufacturing-blog-image-402x226.jpg`, alt: 'Industrial Networks' },
  'video-surveillance-networking': { url: `${ALE}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`, alt: 'Video Surveillance Networking' },
  'purple-on-demand': { url: `${ALE}/solutions-cloud-communications-focus-topic-1-810x380.jpg`, alt: 'Purple on Demand' },
};

const industryImages = {
  'healthcare': { url: `${ALE}/healthcare-header-image-v2.jpg`, alt: 'Healthcare' },
  'education': { url: `${ALE}/education-header-image-v2.jpg`, alt: 'Education' },
  'hospitality': { url: `${ALE}/hospitality-header-bar-image-l2-l3.jpg`, alt: 'Hospitality' },
  'government': { url: `${ALE}/government-header-image-v2.jpg`, alt: 'Government' },
  'transportation': { url: `${ALE}/transportation-header-1440-600-v3.jpg`, alt: 'Transportation' },
  'energy': { url: `${ALE}/industries-new-homepage-header-image-495x275pxl.jpg`, alt: 'Energy & Utilities' },
  'manufacturing': { url: `${ALE}/manufacturing-blog-image-402x226.jpg`, alt: 'Manufacturing' },
  'smart-buildings': { url: `${ALE}/iot-focus-topic-v2.jpg`, alt: 'Smart Buildings' },
  'smb': { url: `${ALE}/solutions-homepage-callout-image.jpg`, alt: 'Small & Medium Business' },
};

const platformImages = {
  'rainbow': { url: `${ALE}/rainbow-logo-cmyk-black-text-white-bckgd-double-product-showcase-image-480x480.png`, alt: 'Rainbow Platform' },
  'omniswitch': { url: `${ALE}/product-switches-homepage-header-l2-l3-1440x600-web.jpg`, alt: 'OmniSwitch' },
  'stellar-wifi': { url: `${ALE}/ale-wlan-office-homepage-header-495x275.jpg`, alt: 'Stellar Wi-Fi' },
  'ai-ops': { url: `${ALE}/ai-ops-offer-header-image.jpg`, alt: 'AI Ops' },
  'omnivista': { url: `${ALE}/omnivista-cirrus-3screens-480x480.png`, alt: 'OmniVista Network Management' },
  'omnipcx-enterprise': { url: `${ALE}/oxe-purple-480x480-v2.png`, alt: 'OmniPCX Enterprise' },
  'oxo-connect': { url: `${ALE}/oxo-connect-evolution-f-480x480-product-showcase.png`, alt: 'OXO Connect' },
  'desk-phones': { url: `${ALE}/smart-deskphones-8088-right-4c-480x480-product-showcase.png`, alt: 'IP Desktop Phones' },
  'ale-connect': { url: `${ALE}/platform-page-banner-image.jpg`, alt: 'ALE Connect' },
  'asset-tracking': { url: `${ALE}/asset-tracking-analytics-screenshot1-web.jpg`, alt: 'Asset Tracking' },
  'private-5g': { url: `${ALE}/industries-new-homepage-header-image-495x275pxl.jpg`, alt: 'Private 5G' },
};

const serviceImages = {
  'support-services': { url: `${ALE}/solutions-homepage-callout-image.jpg`, alt: 'Support Services' },
  'training-services': { url: `${ALE}/education-header-image-v2.jpg`, alt: 'Training Services' },
  'professional-managed-services': { url: `${ALE}/platform-page-banner-image.jpg`, alt: 'Professional Services' },
  'success-management': { url: `${ALE}/esg-callout-homepage-image.jpg`, alt: 'Success Management' },
  'industry-services': { url: `${ALE}/industries-new-homepage-header-image-495x275pxl.jpg`, alt: 'Industry Services' },
};

const blogImages = {
  'infrastructure-tested-by-fire': { url: `${ALE}/roadside-fire-blog-image.jpg`, alt: 'Roadside fire' },
  'ai-ops-transforming-network-management': { url: `${ALE}/ai-ops-offer-header-image.jpg`, alt: 'AI Ops' },
  'rainbow-platform-ai-collaboration': { url: `${ALE}/top-web-banner-rainbow-1440x660.jpg`, alt: 'Rainbow collaboration' },
  'private-5g-manufacturing-revolution': { url: `${ALE}/manufacturing-blog-image-402x226.jpg`, alt: 'Manufacturing' },
  'healthcare-digital-transformation-2026': { url: `${ALE}/healthcare-communications-blog-image-402x226.jpg`, alt: 'Healthcare communications' },
  'smart-campus-education-connectivity': { url: `${ALE}/innovation-project-university-blog-image-402x226.jpg`, alt: 'Smart campus education' },
  'hospitality-guest-experience-technology': { url: `${ALE}/hotel-service-desk-image-402x226.jpg`, alt: 'Hotel guest experience' },
  'esg-technology-sustainability': { url: `${ALE}/esg-callout-homepage-image.jpg`, alt: 'ESG sustainability' },
  'sd-wan-sase-enterprise-connectivity': { url: `${ALE}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`, alt: 'SD-WAN networking' },
  'government-smart-city-networks': { url: `${ALE}/digital-government-810x340-banner.jpg`, alt: 'Smart city government' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

let token = null;

async function login() {
  const res = await fetch(`${API}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com', password: 'AleAdmin2026' }),
  });
  const data = await res.json();
  token = data.token;
  if (!token) throw new Error('Login failed: ' + JSON.stringify(data));
  console.log('Logged in successfully');
}

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadMedia(imageBuffer, filename, alt) {
  const formData = new FormData();
  const blob = new Blob([imageBuffer], { type: filename.endsWith('.png') ? 'image/png' : 'image/jpeg' });
  formData.append('file', blob, filename);
  formData.append('alt', alt);

  const res = await fetch(`${API}/api/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (data.errors) throw new Error(`Upload failed: ${JSON.stringify(data.errors)}`);
  return data.doc.id;
}

async function updateItem(collection, id, heroImageId) {
  const res = await fetch(`${API}/api/${collection}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ heroImage: heroImageId }),
  });
  const data = await res.json();
  if (data.errors) console.error(`  Update failed for ${collection}/${id}:`, data.errors);
}

async function fetchCollection(collection) {
  const res = await fetch(`${API}/api/${collection}?limit=100`);
  const data = await res.json();
  return data.docs || [];
}

// Track uploaded URLs to avoid duplicates
const uploadedCache = new Map();

async function getOrUploadImage(imageInfo) {
  const { url, alt } = imageInfo;
  if (uploadedCache.has(url)) return uploadedCache.get(url);

  try {
    const filename = url.split('/').pop().split('?')[0];
    const buffer = await downloadImage(url);
    const mediaId = await uploadMedia(buffer, filename, alt);
    uploadedCache.set(url, mediaId);
    console.log(`  Uploaded: ${filename} (id: ${mediaId})`);
    return mediaId;
  } catch (err) {
    console.error(`  Failed to upload ${url}: ${err.message}`);
    return null;
  }
}

async function processCollection(collectionSlug, imageMap, fieldName = 'heroImage') {
  console.log(`\n── ${collectionSlug.toUpperCase()} ──`);
  const items = await fetchCollection(collectionSlug);
  let updated = 0;

  for (const item of items) {
    const slug = item.slug;
    const name = item.name || item.title || slug;

    // Skip if already has an image
    if (item[fieldName]) {
      console.log(`  ${name}: already has image, skipping`);
      continue;
    }

    // Find matching image
    let imageInfo = imageMap[slug];

    // For WLAN products, use generic AP image
    if (!imageInfo && item.category === 'wlan') imageInfo = wlanImage;
    // For switches without specific image, use generic switch image
    if (!imageInfo && item.category === 'switches') imageInfo = { url: `${ALE}/product-switches-homepage-header-l2-l3-1440x600-web.jpg`, alt: name };
    // For devices without specific image
    if (!imageInfo && item.category === 'devices') imageInfo = { url: `${ALE}/smart-deskphones-8088-right-4c-480x480-product-showcase.png`, alt: name };
    // Generic fallback for management/applications/integration
    if (!imageInfo && ['management', 'applications', 'integration'].includes(item.category)) {
      imageInfo = { url: `${ALE}/omnivista-cirrus-3screens-480x480.png`, alt: name };
    }

    if (!imageInfo) {
      console.log(`  ${name}: no image mapping found`);
      continue;
    }

    const mediaId = await getOrUploadImage(imageInfo);
    if (mediaId) {
      await updateItem(collectionSlug, item.id, mediaId);
      console.log(`  ${name}: linked to media ${mediaId}`);
      updated++;
    }
  }

  console.log(`  Updated ${updated}/${items.length} items`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`API: ${API}`);
  await login();

  await processCollection('products', productImages);
  await processCollection('solutions', solutionImages);
  await processCollection('industries', industryImages);
  await processCollection('platforms', platformImages);
  await processCollection('services', serviceImages);
  await processCollection('blog-posts', blogImages);

  console.log(`\n✓ Done! Uploaded ${uploadedCache.size} unique images, linked to CMS items.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
