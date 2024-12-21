from bs4 import BeautifulSoup

def check_rgaa(html_content):
    errors = []

    soup = BeautifulSoup(html_content, 'html.parser')

    # Vérification des balises alt pour les images
    for img in soup.find_all('img'):
        if not img.get('alt') or img.get('alt').strip() == "":
            errors.append(f"Image sans attribut alt ou alt vide : {img}")

    # Vérification des titres (h1, h2, etc.)
    headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    for i in range(1, len(headings)):
        if int(headings[i].name[1]) < int(headings[i - 1].name[1]):
            errors.append(f"Mauvais ordre des titres : {headings[i]} apres {headings[i - 1]}")

    # Vérification des liens avec un texte non significatif
    for a in soup.find_all('a'):
        text = a.text.strip()
        if not text or text in ["cliquez ici", "en savoir plus"]:
            errors.append(f"Lien avec texte non significatif : {a}")

    return errors

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python rgaa_checker.py <fichier.html>")
        sys.exit(1)

    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        content = f.read()
    result = check_rgaa(content)
    if result:
        print("\n".join(result))
    else:
        print("Document conforme RGAA.")
