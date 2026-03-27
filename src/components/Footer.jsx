import React from 'react';
import './Footer.css';

const Footer = () => {
    const technicalResources = [
        { name: 'Spécifications Techniques', path: '#' },
        { name: 'Données de Sécurité', path: '#' },
        { name: 'Portail de Vente en Gros', path: '#' }
    ];

    const companyProtocols = [
        { name: 'Suivi Logistique', path: '#' },
        { name: 'Protocole de Confidentialité', path: '#' },
        { name: 'Conditions de Service', path: '#' }
    ];

    return (
        <footer className="footer">
            <div className="container footer-grid">
                {/* Company Info */}
                <div>
                    <div className="footer-logo">CONSTRUCT_SPEC</div>
                    <p className="footer-text">
                        Logistique de précision pour les demandes structurelles à haut volume. Conçu pour des
                        projets zéro défaut.
                    </p>
                </div>

                {/* Technical Resources */}
                <div>
                    <h4 className="footer-title">RESSOURCES TECHNIQUES</h4>
                    <div className="footer-links">
                        {technicalResources.map((resource) => (
                            <a key={resource.name} href={resource.path} className="footer-link">
                                {resource.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Company Protocol */}
                <div>
                    <h4 className="footer-title">PROTOCOLE D'ENTREPRISE</h4>
                    <div className="footer-links">
                        {companyProtocols.map((protocol) => (
                            <a key={protocol.name} href={protocol.path} className="footer-link">
                                {protocol.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Location Hub */}
                <div>
                    <h4 className="footer-title">EMPLACEMENT DU HUB</h4>
                    <div className="footer-map">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCskMOVVyP7rCvki4PCcOEIKgqS4RKtN1UaDZ0U_l5LxsK6sJi60Lo5mfqUtgqVeBp-4Opz2-mrYgYXhHw3wq4D2u0qORkIk0g8atVVIMfvsPNja17gcc8_af9Sq7xSoL4DRsfgU0j8qnnjvHzjpPQNaOlsTv1PTCfF0H-tZSQu2vIZcPejCJZ7V8B0PyCHIG771R1jd5J_TiVWGpzfe5LYsuaHNhDPG1ka9PWf7iOT3XlacA2Sv-e3zHSCkPCThxLmOEEHP-JdOXp6"
                            alt="Map"
                        />
                    </div>
                    <div className="footer-text" style={{ fontSize: '0.625rem' }}>
                        CENTRE DE DISTRIBUTION CENTRAL - SECTEUR 7
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p className="footer-copyright">
                    © 2026 CONSTRUCT_SPEC INDUSTRIAL. by Juliano Ind.
                </p>
            </div>
        </footer>
    );
};

export default Footer;