import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Néalma.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-heading text-nealma-text sm:text-5xl">
            Mentions légales
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-nealma-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="text-2xl font-heading text-nealma-text mb-4">
              Éditeur du site
            </h2>
            <p className="text-nealma-text-light leading-7">
              Le site nealma.fr est édité par Néalma, activité
              d&apos;accompagnement périnatal à domicile exercée en
              Île-de-France.
            </p>
            <ul className="mt-4 space-y-2 text-nealma-text-light">
              <li>
                <strong className="text-nealma-text">Email :</strong>{" "}
                <a
                  href="mailto:contact@nealma.fr"
                  className="text-nealma-400 hover:underline"
                >
                  contact@nealma.fr
                </a>
              </li>
              <li>
                <strong className="text-nealma-text">Téléphone :</strong>{" "}
                <a
                  href="tel:+33600000000"
                  className="text-nealma-400 hover:underline"
                >
                  06 00 00 00 00
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-heading text-nealma-text mb-4">
              Hébergement
            </h2>
            <p className="text-nealma-text-light leading-7">
              Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, États-Unis.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading text-nealma-text mb-4">
              Propriété intellectuelle
            </h2>
            <p className="text-nealma-text-light leading-7">
              L&apos;ensemble du contenu de ce site (textes, images,
              illustrations, logo) est la propriété exclusive de Néalma, sauf
              mention contraire. Toute reproduction, même partielle, est
              interdite sans autorisation préalable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading text-nealma-text mb-4">
              Données personnelles
            </h2>
            <p className="text-nealma-text-light leading-7">
              Les données collectées via le formulaire de contact sont utilisées
              uniquement pour répondre à vos demandes. Elles ne sont ni vendues,
              ni transmises à des tiers. Conformément au RGPD, vous disposez
              d&apos;un droit d&apos;accès, de rectification et de suppression
              de vos données. Pour exercer ce droit, contactez-nous à{" "}
              <a
                href="mailto:contact@nealma.fr"
                className="text-nealma-400 hover:underline"
              >
                contact@nealma.fr
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading text-nealma-text mb-4">
              Cookies
            </h2>
            <p className="text-nealma-text-light leading-7">
              Ce site utilise des cookies strictement nécessaires à son
              fonctionnement. Aucun cookie publicitaire ou de suivi n&apos;est
              utilisé.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
