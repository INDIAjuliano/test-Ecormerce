import React from 'react';

const TechnicalSpecs = () => {
    const specsData = [
        {
            title: "PROPRIÉTÉS DU MATÉRIAU",
            specs: [
                { label: "NUANCE D'ACIER", value: "ASTM A36 / S235JR" },
                { label: "RÉSISTANCE À LA TRACTION", value: "400 - 550 MPa" },
                { label: "MODULE D'ÉLASTICITÉ", value: "200 GPa" },
                { label: "ALLONGEMENT", value: "20% min" }
            ]
        },
        {
            title: "DONNÉES DE CHARGE STRUCTURELLE",
            specs: [
                { label: "CHARGE PONCTUELLE MAX", value: "45.8 kN" },
                { label: "MOMENT D'INERTIE (Ix)", value: "2140 cm⁴" },
                { label: "CONSTANTE DE TORSION", value: "14.2 cm⁴" },
                { label: "FACTEUR DE SÉCURITÉ", value: "1.65 (STANDARD)" }
            ]
        },
        {
            title: "FINITION ET TOLÉRANCE",
            specs: [
                { label: "TRAITEMENT DE SURFACE", value: "GALVANISÉ À CHAUD" },
                { label: "TOLÉRANCE DE SECTION", value: "+/- 0.5mm" },
                { label: "ÉCART DE POIDS", value: "+/- 2.5%" },
                { label: "RECTITUDE", value: "L/1000 max" }
            ]
        }
    ];

    return (
        <section className="technical-section">
            <h2 className="section-title">
                SPÉCIFICATIONS TECHNIQUES
                <span className="title-line"></span>
            </h2>
            <div className="specs-grid">
                {specsData.map((specGroup, index) => (
                    <div key={index} className="spec-card">
                        <h3>{specGroup.title}</h3>
                        <div className="spec-list">
                            {specGroup.specs.map((spec, specIndex) => (
                                <div key={specIndex} className="spec-item">
                                    <span className="spec-label">{spec.label}</span>
                                    <span className="spec-value">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechnicalSpecs;