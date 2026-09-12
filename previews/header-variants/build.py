"""Build isolated, navigable header studies from the current Alvia V5."""
from pathlib import Path
import os
import re
import shutil

ROOT = Path(__file__).resolve().parent
SOURCE = Path(os.environ.get('ALVIA_V5_SOURCE', '/home/pablo/dev/alvia-web-v5-features/v5'))
ASSETS = ROOT / 'site'
ASSETS.mkdir(exist_ok=True)
shutil.copytree(SOURCE / 'assets', ASSETS / 'assets', dirs_exist_ok=True)
for source in SOURCE.iterdir():
    if source.suffix in ('.css', '.js'):
        shutil.copy2(source, ASSETS / source.name)

OPTIONS = [
    ('1', 'Accesos directos', 'Las tres funcionalidades a la vista, a un clic. En mobile se mantienen en una fila fija, sin abrir un menú.', 'Más compacto'),
    ('2', 'Megamenú visual', 'Un menú con una explicación y una vista previa de cada funcionalidad. Deja espacio para crecer.', 'Más contexto'),
    ('3', 'Barra de producto', 'Una segunda fila dedicada a las funcionalidades. Siempre visibles, también en el celular.', 'Más presencia'),
    ('4', 'Nombre + beneficio', 'Cada acceso cuenta para qué sirve. Ayuda a entender AI Notes antes de entrar.', 'Elegida por Pablo'),
]
FEATURES = [
    ('validaciones', 'Validaciones', 'Identidad y cobertura', 'Identidad, credencial y copagos antes de la atención.', '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>'),
    ('ai-notes', 'AI Notes', 'Documentación automática', 'Menos trabajo administrativo en cada consulta.', '<path d="M4 10v4m4-8v12m4-15v18m4-15v12m4-8v4"/>'),
    ('recetas', 'Recetas', 'Del médico al paciente', 'La receta de la consulta, en el celular del paciente.', '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>'),
]
def icon(paths):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{paths}</svg>'

def feature_links(page, mode='plain'):
    out = ''
    for slug, title, short, description, paths in FEATURES:
        current = ' aria-current="page"' if page == slug + '.html' else ''
        if mode == 'plain':
            inside = title
        elif mode == 'strip':
            inside = icon(paths) + f'<span>{title}</span><span class="nav-arrow" aria-hidden="true">↗</span>'
        elif mode == 'descriptive':
            inside = f'<span class="nav-label">{title}</span><span class="nav-description">{short}</span>'
        else:
            art = re.search(r'<div class="feature-preview preview-[\s\S]+?</div>\s*<div class="feature-entry-copy">', home[home.index(f'data-feature="{slug}"'):]).group(0)
            art = art.rsplit('<div class="feature-entry-copy">', 1)[0]
            inside = art + f'<strong>{title}<span aria-hidden="true">↗</span></strong><p>{description}</p>'
        out += f'<a class="feature-nav-link" href="{slug}.html"{current}>{inside}</a>'
    return out

def header(number, page):
    logo = '<a class="wordmark" href="index.html" aria-label="Alvia, inicio">alvia<span>.</span></a>'
    actions = '<div class="header-actions"><a class="login-link" href="https://doctor.alvia.ar/">Ingresar <span aria-hidden="true">↗</span></a><a class="button button-small" href="https://wa.me/541133578538?text=Hola%2C%20quiero%20conocer%20Alvia%20para%20mi%20organizaci%C3%B3n" target="_blank" rel="noopener">Hablemos <span aria-hidden="true">↗</span></a></div>'
    toggle = '<button class="study-menu-toggle" type="button" aria-label="Abrir navegación" aria-expanded="false" aria-controls="feature-navigation"><span>Menú</span>' + icon('<path d="M4 8h16M4 16h16"/>') + '</button>'
    if number == '2':
        return f'''<header class="study-header variant-2" id="inicio"><div class="shell study-header-inner">{logo}<details class="mega-menu" id="feature-navigation"><summary><span class="mega-desktop-label">Funcionalidades</span><span class="mega-mobile-label"><strong>Explorá la plataforma</strong><span>Validaciones · AI Notes · Recetas</span></span>{icon('<path d="m7 10 5 5 5-5"/>')}</summary><div class="mega-panel"><div class="mega-intro"><span>EN CADA ATENCIÓN</span><p>Mucho más que una videollamada.</p></div><nav class="mega-grid" aria-label="Funcionalidades">{feature_links(page, 'mega')}</nav></div></details>{actions}</div></header>'''
    if number == '3':
        return f'''<header class="study-header variant-3" id="inicio"><div class="shell study-header-inner">{logo}<span class="header-tagline">Tu red médica, en un solo lugar.</span>{actions}</div><div class="product-bar"><nav class="shell strip-nav" aria-label="Funcionalidades">{feature_links(page, 'strip')}</nav></div></header>'''
    mode = 'descriptive' if number == '4' else 'plain'
    return f'''<header class="study-header variant-{number}" id="inicio"><div class="shell study-header-inner">{logo}<nav class="feature-nav {mode}" id="feature-navigation" aria-label="Funcionalidades">{feature_links(page, mode)}<a class="mobile-login" href="https://doctor.alvia.ar/">Ingresar ↗</a></nav>{actions}{toggle}</div></header>'''

def toolbar(number, page):
    links = ''.join(f'<a href="../{n}/{page}" aria-current="{"page" if n == number else "false"}"><span>{n.zfill(2)}</span> {title}</a>' for n, title, _, _ in OPTIONS)
    opt = next(x for x in OPTIONS if x[0] == number)
    return f'''<aside class="review-tools" aria-label="Comparar diseños"><div class="review-top"><a class="review-brand" href="../index.html">ALVIA V5 <span>/ Headers</span></a><nav aria-label="Alternativas">{links}</nav><a class="clean-link" href="{page}?clean=1">Vista limpia ↗</a></div><div class="review-note"><span>{opt[3]}</span><p>{opt[2]}</p><a href="../index.html">Ver las cuatro ↗</a></div></aside>'''

home = (SOURCE / 'index.html').read_text()
for number, title, _, _ in OPTIONS:
    dest = ROOT / number
    dest.mkdir(exist_ok=True)
    for filename in ('index.html', 'validaciones.html', 'ai-notes.html', 'recetas.html'):
        html = (SOURCE / filename).read_text()
        html = re.sub(r'<header class="masthead"[\s\S]+?</header>', header(number, filename), html, count=1)
        html = re.sub(r'<script src="navigation.js[^>]+></script>', '', html)
        html = re.sub(r'((?:src|href)=")((?:assets/)[^"]+|[^"/]+\.(?:css|js)(?:\?[^"]*)?)(")', r'\1../site/\2\3', html)
        html = html.replace('</head>', '<link rel="stylesheet" href="../site/features.css"><link rel="stylesheet" href="../headers.css"><script src="../headers.js" defer></script></head>')
        html = re.sub(r'(<body[^>]*>)', r'\1' + toolbar(number, filename), html, count=1)
        html = re.sub(r'<title>(.*?)</title>', f'<title>{number} · {title} | \\1</title>', html)
        (dest / filename).write_text(html)

cards = ''
for number, title, description, badge in OPTIONS:
    cards += f'''<article class="comparison-card"><div class="comparison-heading"><div><span class="option-number">{number.zfill(2)}</span><h2>{title}</h2><span class="option-badge">{badge}</span></div><a href="{number}/index.html">Probar opción {number} <span aria-hidden="true">↗</span></a></div><a class="comparison-image" href="{number}/index.html" aria-label="Probar {title}"><img class="desktop-shot" src="screenshots/option-{number}.png" alt="Header de Alvia con {title.lower()} en escritorio" width="1440" height="650" loading="lazy"><img class="mobile-shot" src="screenshots/option-{number}-mobile.png" alt="Header de Alvia con {title.lower()} en celular" width="390" height="650" loading="lazy"></a><p>{description}</p></article>'''
(ROOT / 'index.html').write_text(f'''<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Alvia V5 · Cuatro headers para explorar</title><link rel="icon" href="site/assets/favicon.svg"><link rel="stylesheet" href="site/styles.css"><link rel="stylesheet" href="headers.css"><script src="headers.js" defer></script></head><body class="comparison-page preview-mobile"><header class="comparison-top"><a class="wordmark" href="index.html">alvia<span>.</span></a><span>V5 · ESTUDIO DE NAVEGACIÓN</span><a href="elegida/">Abrir elegida ↗</a></header><main class="comparison-main"><div class="comparison-intro"><span class="study-eyebrow">CUATRO ALTERNATIVAS · MOBILE PRIMERO</span><h1>Más fácil de encontrar.<br><span>Más Alvia por descubrir.</span></h1><p>Validaciones, AI Notes y Recetas en el header. Mismo sitio, cuatro formas de entrar.</p><div class="device-switch" role="group" aria-label="Vista de las alternativas"><button type="button" data-device="mobile" aria-pressed="true">Celular</button><button type="button" data-device="desktop" aria-pressed="false">Desktop</button></div></div><div class="comparison-grid">{cards}</div><p class="comparison-foot">Mocks navegables sobre la V5 actual · Desktop y celular · Septiembre 2026</p></main></body></html>''')
print(f'Built 4 variants × 4 pages in {ROOT}')
