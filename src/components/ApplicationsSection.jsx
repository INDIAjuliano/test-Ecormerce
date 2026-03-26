import React from 'react';

const ApplicationsSection = () => {
    const applications = [
        {
            title: "GRATTE-CIEL COMMERCIAL",
            subtitle: "OSSATURE PRIMAIRE",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtBg43KraFhXgdSYTKhPoGEJBhtB8bpzDeyscWBt6HpJbeEi-L429LbxDLOgnZzSIEvkHOkAcO6BXv4beIW5ZYZAP6cO7I-nYOA_GOPAnxZ6hfmtIx3XwA_wmVw-RiePtumU7DIzIJPNf6lLxlLZDSod14Oi-htOZS5uMdt-x3dm6N1FytpDN_0oBezFAmmKpuLtv5Vl_UwZrg20yqJZcVL0HrQtSLACC-fNrHEWTcmSBtSjqp9yy2fntJe4y-gYlTGU5PRyeTSnMK"
        },
        {
            title: "INFRASTRUCTURE LOURDE",
            subtitle: "SUPPORT DE PORTÉE À HAUTE CONTRAINTE",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCWqMZiq5D0g-9Mi9TT_N4oGTUcmYMt5YB6_-8cf4Pg5S285Ji4F_ackWXqacUr3peif4xvbCPTomN47G625_mGknwmNzNwpVBScQ190IB5QrgeCkwMABPJ6WkR2cgJjqZAoX5Nm9v2vQm8s37namo3Df0m5Xfdv3G-QS_PZBEbLx54--FK623IYxJZdKrrjt9LCqA858kAyfCIXyDILNZjxv4oxyIMqPwNzfvZ6jUyRwricJH4-YtLcnXr3S4iROxMjejEy3ntD0z"
        },
        {
            title: "LOGISTIQUE INDUSTRIELLE",
            subtitle: "UNITÉS DE STOCKAGE À GRANDE PORTÉE",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8txzBbC4Deo7gSSkWnOpKmIrEnsjZ3yEGdOEXfkk4kawf6z9bAETiqCgqV8PJiEp7L1cnaw7lvedK-Yio7kMwBP2_WjEFvdTjGqhrJdvS-Z2IevN2ZtiQkRETf4Vd_0VOqr4VQda0EvSDI1S9oMXn4u8E3Z7UsIkXoH6BeB53KLBtBm2sxHxIdpFpp-gcd4jk8LIIcM4EMqhhqf0EHEwdf8c-s65T4vzZqoT9VAWRrEPYbqHNGG7e_XpBPJeL5IkZSZKxSjMQVbBC"
        },
        {
            title: "INSTALLATIONS HAUTE TECHNOLOGIE",
            subtitle: "ENCEINTES DE SERVEUR DE PRÉCISION",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWfNm1m8rQozW1c9ifxCl4zFnwFxV7V1a3UCYZX3aqVZK1XJ4LKTAYtym0l7OBjkV8diUs_muRvn5tGHawLPHtemtDWX3faourWJi6wdnCnlKokEGXiBhWhr-j4_Eh1AjbvicW-aE0rkICqYwlT0vApNFA4u-cRxQm7GILMxGAWwcFItmCXxV0B4tdiqs05BXwjiplDsRXWNcU-3o9_Dp01fFIg5SgcGwdp8KgYmXgkJzN3IRNpY-MUuqDSjLI4CzJRfbTonAERdt-"
        }
    ];

    return (
        <section className="applications-section">
            <h2 className="section-title">APPLICATIONS RECOMMANDÉES</h2>
            <div className="apps-grid">
                {applications.map((app, index) => (
                    <div key={index} className="app-card">
                        <img src={app.image} alt={app.title} />
                        <div className="app-overlay">
                            <h4>{app.title}</h4>
                            <p>{app.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ApplicationsSection;