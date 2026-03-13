import postgres from "postgres";
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = postgres(DATABASE_URL);

const now = new Date().toISOString();

const articles = [
  {
    title: "Les bienfaits du massage pr\u00e9natal : guide complet",
    slug: "bienfaits-massage-prenatal-guide-complet",
    excerpt:
      "D\u00e9couvrez comment le massage pr\u00e9natal peut soulager les douleurs, r\u00e9duire le stress et pr\u00e9parer votre corps \u00e0 l\u2019accouchement.",
    content: `Le massage pr\u00e9natal est une pratique ancestrale qui accompagne les femmes enceintes tout au long de leur grossesse. Adapt\u00e9 aux besoins sp\u00e9cifiques de chaque trimestre, il offre de nombreux bienfaits tant physiques que psychologiques.

## Pourquoi opter pour un massage pr\u00e9natal ?

La grossesse entra\u00eene de nombreuses transformations corporelles : prise de poids, modification de la posture, tensions musculaires, r\u00e9tention d\u2019eau. Le massage pr\u00e9natal permet de **soulager ces inconforts** de mani\u00e8re naturelle et douce.

## Les bienfaits physiques

- **Soulagement des douleurs lombaires** : le poids du ventre modifie le centre de gravit\u00e9 et sollicite intensement le bas du dos. Le massage cible ces zones de tension.
- **R\u00e9duction des \u0153d\u00e8mes** : les techniques de drainage favorisent la circulation sanguine et lymphatique, r\u00e9duisant les gonflements aux chevilles et aux pieds.
- **Am\u00e9lioration du sommeil** : en d\u00e9tendant les muscles et en apaisant le syst\u00e8me nerveux, le massage facilite l\u2019endormissement.
- **Pr\u00e9paration du p\u00e9rin\u00e9e** : certaines techniques douces aident \u00e0 assouplir les tissus en pr\u00e9vision de l\u2019accouchement.

## Les bienfaits \u00e9motionnels

La grossesse est une p\u00e9riode riche en \u00e9motions. Le massage offre un **moment de connexion** avec soi-m\u00eame et avec b\u00e9b\u00e9. Il aide \u00e0 :

- R\u00e9duire l\u2019anxi\u00e9t\u00e9 et le stress
- Lib\u00e9rer les endorphines, hormones du bien-\u00eatre
- Renforcer le lien maman-b\u00e9b\u00e9
- Am\u00e9liorer l\u2019estime de soi face aux changements corporels

## \u00c0 quel moment commencer ?

Le massage pr\u00e9natal peut d\u00e9buter d\u00e8s le **deuxi\u00e8me trimestre** (apr\u00e8s 14 semaines), lorsque le risque de fausse couche est r\u00e9duit. Il est recommand\u00e9 d\u2019opter pour une **s\u00e9ance toutes les deux \u00e0 quatre semaines** pour un suivi r\u00e9gulier.

## Pr\u00e9cautions \u00e0 prendre

Il est important de consulter votre m\u00e9decin ou sage-femme avant de commencer. Certaines contre-indications existent : grossesse \u00e0 risque, pr\u00e9-\u00e9clampsie, placenta pr\u00e6via. Choisissez toujours une **praticienne form\u00e9e et certifi\u00e9e** en massage pr\u00e9natal.

---

Chez N\u00e9alma, chaque s\u00e9ance est adapt\u00e9e \u00e0 votre stade de grossesse et \u00e0 vos besoins. Prenez rendez-vous pour d\u00e9couvrir les bienfaits du massage pr\u00e9natal dans le confort de votre domicile.`,
    status: "published",
    seo_title: "Massage pr\u00e9natal : bienfaits, conseils et pr\u00e9cautions",
    seo_description:
      "Guide complet sur le massage pr\u00e9natal : soulagez douleurs lombaires, r\u00e9duisez le stress et pr\u00e9parez votre corps \u00e0 l\u2019accouchement. Conseils d\u2019une praticienne certifi\u00e9e.",
    published_at: new Date("2026-02-15").toISOString(),
    created_at: new Date("2026-02-15").toISOString(),
  },
  {
    title: "5 huiles essentielles pour une grossesse sereine",
    slug: "huiles-essentielles-grossesse-sereine",
    excerpt:
      "Certaines huiles essentielles sont vos alli\u00e9es pendant la grossesse. D\u00e9couvrez lesquelles utiliser en toute s\u00e9curit\u00e9.",
    content: `L\u2019aromath\u00e9rapie peut \u00eatre une pr\u00e9cieuse alli\u00e9e pendant la grossesse, \u00e0 condition de respecter quelques r\u00e8gles essentielles. Voici cinq huiles essentielles s\u00fbres et efficaces pour accompagner votre maternit\u00e9.

## R\u00e8gles d\u2019or avant de commencer

- **Jamais au premier trimestre** : attendez la fin du 3e mois
- **Toujours dilu\u00e9es** : 1 \u00e0 2 gouttes dans une huile v\u00e9g\u00e9tale (amande douce, jojoba)
- **Pas d\u2019ingestion** : uniquement en application cutan\u00e9e ou en diffusion
- **Demandez conseil** \u00e0 votre m\u00e9decin en cas de doute

## 1. Lavande vraie (*Lavandula angustifolia*)

La reine de la relaxation. Elle apaise les tensions nerveuses, favorise le sommeil et soulage les petites douleurs musculaires. En diffusion dans la chambre le soir, elle cr\u00e9e une atmosph\u00e8re propice au repos.

## 2. Mandarine (*Citrus reticulata*)

Son parfum doux et fruité est id\u00e9al contre les naus\u00e9es. Quelques gouttes dans un diffuseur le matin aident \u00e0 bien d\u00e9marrer la journ\u00e9e. Elle a \u00e9galement un effet positif sur le moral.

## 3. Ylang-ylang (*Cananga odorata*)

Reconnue pour ses propri\u00e9t\u00e9s relaxantes, elle aide \u00e0 r\u00e9guler le rythme cardiaque et \u00e0 apaiser l\u2019anxi\u00e9t\u00e9. Parfaite dilu\u00e9e dans une huile de massage pour les \u00e9paules et la nuque.

## 4. Camomille romaine (*Chamaemelum nobile*)

Anti-inflammatoire naturelle, elle soulage les douleurs ligamentaires et les crampes l\u00e9g\u00e8res. En application locale sur le ventre (dilu\u00e9e), elle procure un soulagement rapide.

## 5. Petit grain bigarade (*Citrus aurantium*)

Moins connue, cette huile est un excellent r\u00e9gulateur nerveux. Elle combat l\u2019insomnie et les ruminations. Id\u00e9ale en fin de grossesse quand le sommeil devient difficile.

## Les huiles \u00e0 \u00e9viter absolument

Certaines huiles essentielles sont **formellement contre-indiqu\u00e9es** pendant la grossesse :
- Sauge officinale
- Menthe poivr\u00e9e
- Romarin \u00e0 camp

hre
- Eucalyptus globulus
- Th\u00e9ier (tea tree) au 1er trimestre

---

Chez N\u00e9alma, nous int\u00e9grons l\u2019aromath\u00e9rapie dans nos soins pr\u00e9nataux avec des huiles s\u00e9lectionn\u00e9es pour leur innocuit\u00e9 et leur efficacit\u00e9.`,
    status: "published",
    seo_title:
      "5 huiles essentielles sans danger pendant la grossesse",
    seo_description:
      "Quelles huiles essentielles utiliser enceinte ? Lavande, mandarine, ylang-ylang : d\u00e9couvrez 5 huiles s\u00fbres et leurs bienfaits pour la grossesse.",
    published_at: new Date("2026-02-28").toISOString(),
    created_at: new Date("2026-02-28").toISOString(),
  },
  {
    title: "Massage postnatal : retrouver son corps apr\u00e8s l\u2019accouchement",
    slug: "massage-postnatal-retrouver-corps-apres-accouchement",
    excerpt:
      "Apr\u00e8s l\u2019accouchement, le corps a besoin de se r\u00e9g\u00e9n\u00e9rer. Le massage postnatal acc\u00e9l\u00e8re cette r\u00e9cup\u00e9ration en douceur.",
    content: `Les semaines qui suivent l\u2019accouchement sont une p\u00e9riode de profonde transformation. Le corps doit se r\u00e9adapter, les hormones fluctuent, la fatigue s\u2019accumule. Le massage postnatal est un outil pr\u00e9cieux pour accompagner cette transition.

## Quand commencer le massage postnatal ?

- **Accouchement par voie basse** : d\u00e8s 2 \u00e0 3 semaines apr\u00e8s, selon le confort
- **C\u00e9sarienne** : apr\u00e8s cicatrisation compl\u00e8te, g\u00e9n\u00e9ralement 6 \u00e0 8 semaines
- **Toujours avec l\u2019accord** de votre m\u00e9decin ou sage-femme

## Les bienfaits du massage postnatal

### R\u00e9cup\u00e9ration physique

Le corps a \u00e9t\u00e9 mis \u00e0 rude \u00e9preuve. Le massage aide \u00e0 :

- **R\u00e9aligner la posture** : compens\u00e9e pendant 9 mois, la colonne vert\u00e9brale a besoin de retrouver son axe
- **Soulager les tensions** : nuque, \u00e9paules et bras sont sollicit\u00e9s par l\u2019allaitement et le portage
- **Stimuler la circulation** : acc\u00e9l\u00e8re l\u2019\u00e9limination de la r\u00e9tention d\u2019eau post-grossesse
- **Tonifier les tissus** : le massage abdominal doux aide l\u2019ut\u00e9rus \u00e0 reprendre sa taille

### Bien-\u00eatre \u00e9motionnel

Le post-partum est une p\u00e9riode \u00e9motionnellement intense. Le massage :

- Favorise la production d\u2019ocytocine, l\u2019hormone de l\u2019attachement
- R\u00e9duit les sympt\u00f4mes de baby blues
- Offre un **moment pour soi**, essentiel quand tout tourne autour du b\u00e9b\u00e9
- Aide \u00e0 se r\u00e9concilier avec son nouveau corps

## Techniques sp\u00e9cifiques

### Massage du ventre

Mouvements circulaires doux dans le sens des aiguilles d\u2019une montre. Aide \u00e0 la r\u00e9traction ut\u00e9rine et au transit intestinal, souvent perturb\u00e9 apr\u00e8s l\u2019accouchement.

### Drainage des jambes

Mouvements ascendants des chevilles vers les cuisses pour relancer la circulation veineuse et r\u00e9duire la sensation de jambes lourdes.

### D\u00e9tente du haut du corps

\u00c9paules, nuque, bras : les zones les plus sollicit\u00e9es par l\u2019allaitement et le portage b\u00e9n\u00e9ficient d\u2019un travail en profondeur.

---

Chez N\u00e9alma, le massage postnatal se d\u00e9roule \u00e0 votre domicile, dans votre cocon. B\u00e9b\u00e9 peut rester pr\u00e8s de vous pendant la s\u00e9ance.`,
    status: "published",
    seo_title: "Massage postnatal : bienfaits et r\u00e9cup\u00e9ration apr\u00e8s b\u00e9b\u00e9",
    seo_description:
      "Le massage postnatal aide \u00e0 la r\u00e9cup\u00e9ration apr\u00e8s l\u2019accouchement : posture, circulation, bien-\u00eatre \u00e9motionnel. D\u00e9couvrez quand et comment en profiter.",
    published_at: new Date("2026-03-05").toISOString(),
    created_at: new Date("2026-03-05").toISOString(),
  },
  {
    title: "Pr\u00e9parer sa peau pendant la grossesse : routine naturelle",
    slug: "preparer-peau-grossesse-routine-naturelle",
    excerpt:
      "Vergetures, s\u00e9cheresse, masque de grossesse\u2026 Adoptez une routine de soins naturels pour prot\u00e9ger votre peau.",
    content: `La grossesse peut transformer la peau de mani\u00e8re spectaculaire. Entre les hormones qui s\u2019affolent et le corps qui s\u2019\u00e9tire, la peau a besoin d\u2019une attention particuli\u00e8re. Voici une routine simple et naturelle, trimestre par trimestre.

## Premier trimestre : les bases

La peau peut devenir plus sensible ou plus grasse. C\u2019est le moment d\u2019**adapter vos produits** :

- **Nettoyant doux** sans sulfates, \u00e0 base d\u2019huile de coco ou d\u2019avoine
- **Hydratant l\u00e9ger** \u00e0 l\u2019aloe vera ou au beurre de karit\u00e9
- **Protection solaire SPF 30+** tous les jours pour pr\u00e9venir le masque de grossesse

### Les ingr\u00e9dients \u00e0 \u00e9viter

- R\u00e9tino\u00ef des (vitamine A acide)
- Acide salicylique \u00e0 forte concentration
- Hydroquinone
- Huiles essentielles pures (sauf avis m\u00e9dical)

## Deuxi\u00e8me trimestre : pr\u00e9vention des vergetures

C\u2019est \u00e0 partir du 4e mois que le ventre commence \u00e0 s\u2019arrondir significativement. La pr\u00e9vention des vergetures passe par :

- **Huile d\u2019amande douce** : appliqu\u00e9e matin et soir sur le ventre, les hanches et les seins
- **Beurre de cacao** : tr\u00e8s nourrissant, id\u00e9al pour les peaux s\u00e8ches
- **Hydratation interne** : boire au moins 1,5L d\u2019eau par jour
- **Massage du ventre** : mouvements circulaires pour stimuler l\u2019\u00e9lasticit\u00e9

## Troisi\u00e8me trimestre : confort et pr\u00e9paration

La peau est au maximum de son \u00e9tirement. Les d\u00e9mangeaisons peuvent appara\u00eetre.

- **Huile de calendula** : apaisante et anti-inflammatoire
- **Lait d\u2019avoine** : en bain ou en lotion, calme les irritations
- **Massage p\u00e9rin\u00e9al** : \u00e0 partir de 34 SA, avec de l\u2019huile d\u2019amande douce

## Le masque de grossesse (m\u00e9lasma)

Ces taches brunes sur le visage touchent jusqu\u2019\u00e0 70% des femmes enceintes. Pour le pr\u00e9venir :

- **\u00c9cran solaire quotidien** (m\u00eame en hiver, m\u00eame derri\u00e8re une fen\u00eatre)
- **Chapeau \u00e0 larges bords** en ext\u00e9rieur
- **S\u00e9rum \u00e0 la vitamine C** : antioxydant naturel qui unifie le teint

## Recette maison : huile anti-vergetures

- 50 ml d\u2019huile d\u2019amande douce
- 30 ml d\u2019huile de rose musqu\u00e9e
- 20 ml d\u2019huile d\u2019argan
- 5 gouttes de vitamine E

M\u00e9langez dans un flacon en verre ambr\u00e9. Appliquez matin et soir en massant doucement.

---

Chez N\u00e9alma, nos soins du visage et du corps utilisent exclusivement des produits naturels, s\u00e9lectionn\u00e9s pour \u00eatre compatibles avec la grossesse.`,
    status: "published",
    seo_title: "Routine soin peau grossesse : guide naturel trimestre par trimestre",
    seo_description:
      "Vergetures, masque de grossesse, s\u00e9cheresse : adoptez une routine de soins naturels adapt\u00e9e \u00e0 chaque trimestre. Recettes et conseils d\u2019une praticienne.",
    published_at: new Date("2026-03-10").toISOString(),
    created_at: new Date("2026-03-10").toISOString(),
  },
  {
    title: "Le massage \u00e0 domicile : pourquoi c\u2019est la meilleure option pendant la grossesse",
    slug: "massage-domicile-meilleure-option-grossesse",
    excerpt:
      "Pas besoin de se d\u00e9placer quand on est enceinte. D\u00e9couvrez les avantages du massage \u00e0 domicile avec N\u00e9alma.",
    content: `Se d\u00e9placer quand on est enceinte de 7 ou 8 mois, trouver une place de parking, monter des escaliers avec le ventre rond\u2026 C\u2019est exactement ce que le massage \u00e0 domicile permet d\u2019\u00e9viter. Chez N\u00e9alma, nous venons \u00e0 vous, en \u00cele-de-France, avec tout le mat\u00e9riel n\u00e9cessaire.

## Les avantages du massage \u00e0 domicile

### 1. Z\u00e9ro stress de d\u00e9placement

Plus de trajet en voiture ou en transports en commun. Vous restez dans votre **bulle de confort**, l\u00e0 o\u00f9 vous vous sentez le mieux. C\u2019est particuli\u00e8rement appr\u00e9ci\u00e9 au troisi\u00e8me trimestre.

### 2. Votre environnement, votre rythme

- Votre **temp\u00e9rature** pr\u00e9f\u00e9r\u00e9e
- Votre **musique** (ou le silence)
- Vos **coussins** et votre canap\u00e9 pour l\u2019apr\u00e8s-s\u00e9ance
- Pas besoin de se rhabiller et reprendre la route

### 3. Prolonger les bienfaits

Apr\u00e8s un massage, le corps est d\u00e9tendu et l\u2019esprit apais\u00e9. \u00c0 domicile, vous pouvez **imm\u00e9diatement vous allonger**, prendre une tisane, ou m\u00eame faire une sieste. Les bienfaits durent plus longtemps.

### 4. B\u00e9b\u00e9 peut rester pr\u00e8s de vous

Pour les massages postnataux, pas besoin de trouver une solution de garde. B\u00e9b\u00e9 dort dans son couffin pendant que maman se fait chouchouter.

### 5. Intimit\u00e9 totale

Pas de salle d\u2019attente partag\u00e9e, pas de croiser d\u2019autres personnes en peignoir. C\u2019est un moment **100% priv\u00e9**.

## Comment \u00e7a se passe ?

1. **R\u00e9servation en ligne** : choisissez votre soin et votre cr\u00e9neau
2. **Confirmation** : vous recevez un email avec les d\u00e9tails
3. **Jour J** : la praticienne arrive avec sa table de massage pliante, ses huiles et son linge
4. **Installation** : 10 minutes de mise en place dans la pi\u00e8ce de votre choix
5. **S\u00e9ance** : 60 \u00e0 90 minutes de pur bien-\u00eatre
6. **Rangement** : tout est remball\u00e9, aucune trace

## Quelle pi\u00e8ce choisir ?

Id\u00e9alement, une pi\u00e8ce :
- **Calme** et \u00e0 l\u2019\u00e9cart du bruit
- Avec assez d\u2019**espace** pour la table (environ 2m x 1m)
- \u00c0 **temp\u00e9rature confortable** (22-24\u00b0C)
- Avec un acc\u00e8s facile (pas de 5e sans ascenseur !)

## Zone d\u2019intervention

N\u00e9alma intervient dans toute l\u2019**\u00cele-de-France** :
- Paris (tous arrondissements)
- Petite couronne (92, 93, 94)
- Grande couronne (91, 95, 77, 78) selon disponibilit\u00e9

---

R\u00e9servez votre massage \u00e0 domicile et d\u00e9couvrez le luxe de ne pas avoir \u00e0 bouger.`,
    status: "published",
    seo_title: "Massage \u00e0 domicile pour femmes enceintes en \u00cele-de-France",
    seo_description:
      "Massage pr\u00e9natal et postnatal \u00e0 domicile en \u00cele-de-France. Z\u00e9ro d\u00e9placement, confort total. D\u00e9couvrez pourquoi c\u2019est l\u2019option id\u00e9ale pendant la grossesse.",
    published_at: new Date("2026-03-12").toISOString(),
    created_at: new Date("2026-03-12").toISOString(),
  },
];

async function seed() {
  console.log("Insertion de %d articles de blog...", articles.length);

  for (const article of articles) {
    await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, status, seo_title, seo_description, published_at, created_at, updated_at)
      VALUES (
        ${article.title},
        ${article.slug},
        ${article.excerpt},
        ${article.content},
        ${article.status},
        ${article.seo_title},
        ${article.seo_description},
        ${article.published_at},
        ${article.created_at},
        ${now}
      )
      ON CONFLICT (slug) DO NOTHING
    `;
    console.log("  -> %s", article.title);
  }

  console.log("Seed termin\u00e9 !");
  await sql.end();
}

seed().catch((err) => {
  console.error("Erreur:", err);
  process.exit(1);
});
