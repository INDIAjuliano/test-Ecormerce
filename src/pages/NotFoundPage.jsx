import './NotFoundPage.css';
export default function NotFoundPage() {
    return (
        <div className="notfound-container">
            <div className="notfound-card">

                <h1 className="notfound-code">404</h1>

                <h2 className="notfound-title">
                    PAGE INTROUVABLE
                </h2>

                <p className="notfound-text">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                <div className="notfound-actions">
                    <a href="/" className="btn-primary">
                        RETOUR À L'ACCUEIL
                    </a>

                    <a href="/catalogue" className="btn-outline">
                        VOIR LES PRODUITS
                    </a>
                </div>

            </div>
        </div>
    )
}