// Script pour vérifier certains critères RGAA
(function () {
    const errors = [];

    // Vérification des balises alt pour les images
    document.querySelectorAll("img").forEach(img => {
        if (!img.hasAttribute("alt") || img.getAttribute("alt").trim() === "") {
            errors.push(`Image sans attribut alt ou avec alt vide : ${img.src}`);
        }
    });

    // Vérification des balises de titre (h1, h2, ...) dans un ordre correct
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    headings.forEach((heading, index) => {
        if (index > 0 && headings[index - 1].tagName > heading.tagName) {
            errors.push(`Ordre des titres incorrect : ${heading.tagName} après ${headings[index - 1].tagName}`);
        }
    });

    // Vérification des liens avec un texte significatif
    document.querySelectorAll("a").forEach(link => {
        const text = link.textContent.trim();
        if (!text || text === "cliquez ici" || text === "en savoir plus") {
            errors.push(`Lien avec un texte non significatif : ${link.href}`);
        }
    });

    // Vérification des formulaires avec des labels associés
    document.querySelectorAll("form").forEach(form => {
        form.querySelectorAll("input, select, textarea").forEach(input => {
            if (!input.labels || input.labels.length === 0) {
                errors.push(`Champ de formulaire sans label associé : ${input.name || input.id || 'non identifié'}`);
            }
        });
    });

    // Vérification du contraste des couleurs (nécessite une bibliothèque comme "wcag-contrast-checker")
    // Ex: https://www.npmjs.com/package/wcag-contrast-checker
    // Cette vérification n'est pas implémentée ici par simplicité.

    // Affichage des erreurs
    if (errors.length > 0) {
        console.warn("Problèmes d'accessibilité détectés :", errors);
    } else {
        console.log("Aucun problème d'accessibilité détecté selon les critères testés.");
    }
})();
