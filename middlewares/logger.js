//la fonction logger pour observer les requets

// logger.js
export function logger(req, res, next) {
    const now = new Date().toISOString();
    console.log(new Date())
    console.log(`[${now}] ${req.method} ${req.url}`);
    next(); // passe au middleware suivant
}
