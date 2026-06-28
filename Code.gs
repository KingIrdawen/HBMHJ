// ============================================================
//  Google Apps Script – Réception des acceptations de charte
//  HBMHJ 2026
// ============================================================
//
//  📋 CONFIGURATION
//  Remplacez la valeur ci-dessous par l'ID de votre Google Sheet.
//  L'ID se trouve dans l'URL du Sheet :
//  https://docs.google.com/spreadsheets/d/[ID_ICI]/edit
//
var SHEET_ID = 'VOTRE_SHEET_ID_ICI';
//
//  Si vous laissez SHEET_ID vide (''), le script utilise le Sheet
//  attaché au projet Apps Script (spreadsheet liée).
// ============================================================

/**
 * Gère les requêtes POST envoyées par le formulaire du site.
 * Reçoit { nom, prenom, horodatage } en JSON et les insère
 * en nouvelle ligne dans le Google Sheet.
 */
function doPost(e) {
  try {
    // Lecture du corps JSON
    var body = JSON.parse(e.postData.contents);

    var nom        = String(body.nom        || '').trim();
    var prenom     = String(body.prenom     || '').trim();
    var horodatage = String(body.horodatage || '').trim();

    // Sécurité : champs obligatoires
    if (!nom || !prenom) {
      return buildResponse({ status: 'error', message: 'Nom et prénom requis.' }, 400);
    }

    // Si horodatage absent côté client, on le génère ici
    if (!horodatage) {
      horodatage = Utilities.formatDate(
        new Date(),
        'Europe/Paris',
        'dd/MM/yyyy HH:mm:ss'
      );
    }

    // Accès au Sheet
    var ss;
    if (SHEET_ID && SHEET_ID !== 'VOTRE_SHEET_ID_ICI') {
      ss = SpreadsheetApp.openById(SHEET_ID);
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    var sheet = ss.getSheets()[0]; // Premier onglet

    // Création de l'en-tête si le sheet est vide
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Nom', 'Prénom', 'Horodatage']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    // Insertion de la nouvelle ligne
    sheet.appendRow([nom, prenom, horodatage]);

    return buildResponse({ status: 'ok' });

  } catch (err) {
    Logger.log('Erreur doPost : ' + err.toString());
    return buildResponse({ status: 'error', message: err.toString() }, 500);
  }
}

/**
 * Gère les requêtes OPTIONS (preflight CORS) envoyées par le navigateur.
 */
function doGet(e) {
  // Permet de tester le script en GET depuis le navigateur
  return buildResponse({ status: 'ok', message: 'HBMHJ Apps Script actif.' });
}

/**
 * Construit une réponse JSON avec les headers CORS appropriés.
 * @param {Object} data   - Objet à sérialiser en JSON
 * @param {number} [code] - Code HTTP (non utilisé par Apps Script, mais documenté)
 */
function buildResponse(data) {
  var output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);

  // Apps Script ne permet pas de définir des headers CORS arbitraires
  // via ContentService, MAIS en déployant la Web App avec accès
  // "Tout le monde (anonyme)", Google ajoute automatiquement les
  // headers CORS nécessaires. Aucune configuration supplémentaire
  // n'est requise côté script.

  return output;
}
