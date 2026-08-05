import os
import re

root_dir = r"d:\91798\Downloads\profile\profile"

# Mapping from old file to directory destination
page_map = {
    'index.html': ('', 'home'),
    'about.html': ('about', 'about'),
    'experience.html': ('experience', 'experience'),
    'case-studies.html': ('case-studies', 'case-studies'),
    'azure-network-modernization.html': (os.path.join('case-studies', 'azure-network-modernization'), 'case-studies'),
    'projects.html': ('projects', 'projects'),
    'technologies.html': ('technologies', 'technologies'),
    'achievements.html': ('achievements', 'achievements'),
    'certifications.html': ('certifications', 'certifications'),
    'resume.html': ('resume', 'resume'),
    'contact.html': ('contact', 'contact'),
    '404.html': ('404', 'none')
}

def get_nav_html(depth, active_page):
    if depth == 0:
        prefix = ""
        home_href = "index.html"
    elif depth == 1:
        prefix = "../"
        home_href = "../"
    elif depth == 2:
        prefix = "../../"
        home_href = "../../"
    else:
        prefix = "../" * depth
        home_href = prefix

    def is_act(page_key):
        return ' class="is-active"' if active_page == page_key else ''

    nav = f"""<nav class="primary-nav" id="primary-navigation" aria-label="Primary navigation" data-navigation>
        <a href="{home_href}"{is_act('home')}>Home</a>
        <a href="{prefix}about/"{is_act('about')}>About</a>
        <a href="{prefix}experience/"{is_act('experience')}>Experience</a>
        <a href="{prefix}case-studies/"{is_act('case-studies')}>Case Studies</a>
        <a href="{prefix}technologies/"{is_act('technologies')}>Skills</a>
        <a href="{prefix}achievements/"{is_act('achievements')}>Achievements</a>
        <a href="{prefix}certifications/"{is_act('certifications')}>Certifications</a>
        <a href="{prefix}assets/pdf/Shaik_Althaf_Resume.pdf" target="_blank" rel="noopener noreferrer" class="nav-resume-btn{is_act('resume')}">Download Resume 📥</a>
        <a href="{prefix}contact/" class="nav-cta{is_act('contact')}">Contact</a>
      </nav>"""
    return nav

for old_filename, (sub_dir, active_page) in page_map.items():
    old_file_path = os.path.join(root_dir, old_filename)
    if not os.path.exists(old_file_path):
        continue

    with open(old_file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    depth = 0 if sub_dir == '' else len(sub_dir.split(os.sep))
    prefix = "../" * depth if depth > 0 else ""

    # Replace assets references
    content = content.replace('styles.css?v=20260805_v3', f'{prefix}assets/css/styles.css?v=20260805_v3')
    content = content.replace('styles.css?v=20260805', f'{prefix}assets/css/styles.css?v=20260805')
    content = content.replace('styles.css', f'{prefix}assets/css/styles.css')
    
    content = content.replace('script.js?v=20260805_v3', f'{prefix}assets/js/script.js?v=20260805_v3')
    content = content.replace('script.js?v=20260805', f'{prefix}assets/js/script.js?v=20260805')
    content = content.replace('script.js', f'{prefix}assets/js/script.js')

    content = content.replace('assets/Shaik_Profile.svg', f'{prefix}assets/images/Shaik_Profile.svg')
    content = content.replace('assets/Shaik_Althaf_Resume.pdf', f'{prefix}assets/pdf/Shaik_Althaf_Resume.pdf')

    # Replace favicons
    content = content.replace('href="favicon-96x96.png"', f'href="{prefix}favicon-96x96.png"')
    content = content.replace('href="favicon.svg"', f'href="{prefix}favicon.svg"')
    content = content.replace('href="favicon.ico"', f'href="{prefix}favicon.ico"')
    content = content.replace('href="apple-touch-icon.png"', f'href="{prefix}apple-touch-icon.png"')
    content = content.replace('href="site.webmanifest"', f'href="{prefix}site.webmanifest"')

    # Replace old internal links
    content = content.replace('href="index.html"', f'href="{prefix if depth>0 else "index.html"}"')
    content = content.replace('href="about.html"', f'href="{prefix}about/"')
    content = content.replace('href="experience.html"', f'href="{prefix}experience/"')
    content = content.replace('href="case-studies.html"', f'href="{prefix}case-studies/"')
    content = content.replace('href="azure-network-modernization.html"', f'href="{prefix}case-studies/azure-network-modernization/"')
    content = content.replace('href="projects.html"', f'href="{prefix}projects/"')
    content = content.replace('href="technologies.html"', f'href="{prefix}technologies/"')
    content = content.replace('href="achievements.html"', f'href="{prefix}achievements/"')
    content = content.replace('href="certifications.html"', f'href="{prefix}certifications/"')
    content = content.replace('href="resume.html"', f'href="{prefix}resume/"')
    content = content.replace('href="contact.html"', f'href="{prefix}contact/"')

    # Replace nav
    new_nav = get_nav_html(depth, active_page)
    content = re.sub(r'<nav class="primary-nav".*?</nav>', new_nav, content, flags=re.DOTALL)

    # Write target file
    if sub_dir == '':
        dest_path = os.path.join(root_dir, 'index.html')
    else:
        dest_dir = os.path.join(root_dir, sub_dir)
        os.makedirs(dest_dir, exist_ok=True)
        dest_path = os.path.join(dest_dir, 'index.html')

    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Written enterprise page: {dest_path} (Depth: {depth}, Active: {active_page})")

print("All enterprise pages reorganized successfully!")
