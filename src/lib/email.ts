import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = "Néalma <contact@nealma.fr>";

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: "contact@nealma.fr",
    subject: `Nouveau message de ${data.name}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${data.name}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : ""}
      <p><strong>Message :</strong></p>
      <p>${data.message}</p>
    `,
  });
}

export async function sendBookingConfirmation(data: {
  clientEmail: string;
  clientName: string;
  serviceName: string;
  date: string;
  price: string;
}) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: data.clientEmail,
    subject: `Confirmation de votre rendez-vous - ${data.serviceName}`,
    html: `
      <h2>Votre rendez-vous est confirmé !</h2>
      <p>Bonjour ${data.clientName},</p>
      <p>Votre rendez-vous pour <strong>${data.serviceName}</strong> est bien confirmé.</p>
      <p><strong>Date :</strong> ${data.date}</p>
      <p><strong>Montant :</strong> ${data.price}</p>
      <p>À bientôt,<br/>L'équipe Néalma</p>
    `,
  });
}
