import csv
import os
import re

# ── IMAGES ──────────────────────────────────────────────────
all_images = []

# Source 1: Product pages
with open('product_pages_all_images.csv', 'r', encoding='utf-8', errors='replace') as f:
    reader = csv.DictReader(f)
    for row in reader:
        all_images.append({
            'page_url': row.get('page_url') or '',
            'image_url': row.get('image_url') or row.get('media_url') or '',
            'alt_text': row.get('alt_text') or '',
            'usage_context': row.get('usage_context') or row.get('usage') or '',
            'source': 'products'
        })

# Source 2: Solution pages
with open('solution_pages_all_images.csv', 'r', encoding='utf-8', errors='replace') as f:
    reader = csv.DictReader(f)
    for row in reader:
        all_images.append({
            'page_url': row.get('page_url') or '',
            'image_url': row.get('image_url') or '',
            'alt_text': row.get('alt_text') or '',
            'usage_context': row.get('usage_context') or '',
            'source': 'solutions'
        })

# Source 3: Industries+Company from markdown
with open('ale_all_other_images_and_downloads.md', 'r', encoding='utf-8', errors='replace') as f:
    md_content = f.read()

base = 'https://web-assets.al-enterprise.com'
for line in md_content.split('\n'):
    match = re.search(r'(https://web-assets\.al-enterprise\.com[^\s\|"\'>\)]+\.(png|jpg|jpeg|svg|gif|webp))', line, re.IGNORECASE)
    if match:
        img_url = match.group(1)
        alt = ''
        alt_match = re.search(r'alt[=:]\s*["\']([^"\']+)', line, re.IGNORECASE)
        if alt_match:
            alt = alt_match.group(1)
        page = ''
        page_match = re.search(r'(/en/[a-zA-Z0-9\-/]+)', line)
        if page_match:
            page = 'https://www.al-enterprise.com' + page_match.group(1)
        usage = 'feature'
        ll = line.lower()
        if 'hero' in ll or 'header' in ll or 'banner' in ll:
            usage = 'hero'
        elif 'product' in ll:
            usage = 'product'
        elif 'executive' in ll or 'headshot' in ll:
            usage = 'executive'
        elif 'logo' in ll or 'icon' in ll:
            usage = 'icon'
        elif 'blog' in ll or 'thumbnail' in ll:
            usage = 'blog_thumbnail'
        all_images.append({
            'page_url': page,
            'image_url': img_url,
            'alt_text': alt,
            'usage_context': usage,
            'source': 'industries_company'
        })

# Deduplicate by (page_url, image_url)
seen_images = set()
unique_images = []
for img in all_images:
    key = (img['page_url'], img['image_url'])
    if key not in seen_images and img['image_url']:
        seen_images.add(key)
        unique_images.append(img)

unique_image_urls = set(img['image_url'] for img in unique_images if img['image_url'])

# ── DOWNLOADS ──────────────────────────────────────────────
all_downloads = []

# Source 1: Product pages
with open('product_pages_all_downloads.csv', 'r', encoding='utf-8', errors='replace') as f:
    reader = csv.DictReader(f)
    for row in reader:
        furl = row.get('file_url') or ''
        all_downloads.append({
            'page_url': row.get('page_url') or '',
            'file_url': furl,
            'file_name': os.path.basename(furl) if furl else '',
            'anchor_text': row.get('anchor_text') or row.get('title') or '',
            'document_type': row.get('document_type') or row.get('type') or '',
            'source': 'products'
        })

# Source 2: Solution pages
with open('solution_pages_all_downloads.csv', 'r', encoding='utf-8', errors='replace') as f:
    reader = csv.DictReader(f)
    for row in reader:
        furl = row.get('file_url') or ''
        all_downloads.append({
            'page_url': row.get('page_url') or '',
            'file_url': furl,
            'file_name': os.path.basename(furl) if furl else '',
            'anchor_text': row.get('anchor_text') or '',
            'document_type': row.get('document_type') or '',
            'source': 'solutions'
        })

# Source 3: Industries+Company from markdown
for line in md_content.split('\n'):
    match = re.search(r'(https://www\.al-enterprise\.com[^\s\|"\'>\)]*\.pdf)', line, re.IGNORECASE)
    if not match:
        match = re.search(r'(/-/media/[^\s\|"\'>\)]*\.pdf)', line, re.IGNORECASE)
        if match:
            url = 'https://www.al-enterprise.com' + match.group(1)
        else:
            continue
    else:
        url = match.group(1)

    fname = os.path.basename(url)
    dtype = 'document'
    fl = fname.lower()
    if 'datasheet' in fl: dtype = 'datasheet'
    elif 'brochure' in fl or 'ecatalog' in fl: dtype = 'brochure'
    elif 'whitepaper' in fl: dtype = 'whitepaper'
    elif 'ebook' in fl: dtype = 'ebook'
    elif 'flyer' in fl or 'foldout' in fl: dtype = 'flyer'
    elif 'infographic' in fl: dtype = 'infographic'
    elif 'solution' in fl and 'sheet' in fl: dtype = 'solution-sheet'
    elif 'appnote' in fl or 'app-note' in fl: dtype = 'app-note'
    elif 'report' in fl: dtype = 'report'

    page = ''
    page_match = re.search(r'(/en/[a-zA-Z0-9\-/]+)', line)
    if page_match:
        page = 'https://www.al-enterprise.com' + page_match.group(1)

    all_downloads.append({
        'page_url': page,
        'file_url': url,
        'file_name': fname,
        'anchor_text': '',
        'document_type': dtype,
        'source': 'industries_company'
    })

# Deduplicate by (page_url, file_url)
seen_downloads = set()
unique_downloads = []
for dl in all_downloads:
    key = (dl['page_url'], dl['file_url'])
    if key not in seen_downloads and dl['file_url']:
        seen_downloads.add(key)
        unique_downloads.append(dl)

unique_download_urls = set(dl['file_url'] for dl in unique_downloads if dl['file_url'])

# ── WRITE FINAL CSVs ──────────────────────────────────────
with open('forensic-extraction/media.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['page_url', 'image_url', 'alt_text', 'usage_context', 'source_section'])
    for img in unique_images:
        writer.writerow([img['page_url'], img['image_url'], img['alt_text'], img['usage_context'], img['source']])

with open('forensic-extraction/downloads.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['page_url', 'file_url', 'file_name', 'anchor_text', 'document_type', 'source_section'])
    for dl in unique_downloads:
        writer.writerow([dl['page_url'], dl['file_url'], dl['file_name'], dl['anchor_text'], dl['document_type'], dl['source']])

# ── UPDATE JSON ──────────────────────────────────────────
import json
with open('forensic-extraction/ale_site_structure.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['media_inventory'] = [
    {'page_url': img['page_url'], 'image_url': img['image_url'], 'alt_text': img['alt_text'], 'usage': img['usage_context']}
    for img in unique_images
]
data['download_links'] = [
    {'page_url': dl['page_url'], 'file_url': dl['file_url'], 'file_name': dl['file_name'], 'anchor_text': dl['anchor_text'], 'type': dl['document_type']}
    for dl in unique_downloads
]

with open('forensic-extraction/ale_site_structure.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# ── PRINT STATS ──────────────────────────────────────────
print("=== FINAL COUNTS ===")
print(f"Media entries (page+url pairs): {len(unique_images)}")
print(f"Unique image URLs: {len(unique_image_urls)}")
print(f"Download entries (page+url pairs): {len(unique_downloads)}")
print(f"Unique PDF URLs: {len(unique_download_urls)}")
print()
print("By source:")
print(f"  Products images: {sum(1 for i in unique_images if i['source']=='products')}")
print(f"  Solutions images: {sum(1 for i in unique_images if i['source']=='solutions')}")
print(f"  Industries/Company images: {sum(1 for i in unique_images if i['source']=='industries_company')}")
print(f"  Products downloads: {sum(1 for d in unique_downloads if d['source']=='products')}")
print(f"  Solutions downloads: {sum(1 for d in unique_downloads if d['source']=='solutions')}")
print(f"  Industries/Company downloads: {sum(1 for d in unique_downloads if d['source']=='industries_company')}")
print()
print("By download type:")
from collections import Counter
type_counts = Counter(d['document_type'] for d in unique_downloads)
for t, c in type_counts.most_common():
    print(f"  {t}: {c}")
