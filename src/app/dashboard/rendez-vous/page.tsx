import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  confirmed: { label: "Confirmé", variant: "default" },
  cancelled: { label: "Annulé", variant: "destructive" },
  completed: { label: "Terminé", variant: "secondary" },
};

const paymentLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  paid: { label: "Payé", variant: "default" },
  pending: { label: "En attente", variant: "outline" },
  refunded: { label: "Remboursé", variant: "secondary" },
};

export default async function RendezVousPage() {
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, services(name)")
    .order("booking_date", { ascending: false })
    .limit(50);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-nealma-text mb-8">
        Rendez-vous
      </h1>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => {
                const date = new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(booking.booking_date));
                const status = statusLabels[booking.status] || {
                  label: booking.status,
                  variant: "outline" as const,
                };
                const payment = paymentLabels[booking.payment_status] || {
                  label: booking.payment_status,
                  variant: "outline" as const,
                };

                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{date}</TableCell>
                    <TableCell>
                      <div>{booking.client_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.client_email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {(booking.services as { name: string } | null)?.name || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={payment.variant}>{payment.label}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun rendez-vous pour le moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
