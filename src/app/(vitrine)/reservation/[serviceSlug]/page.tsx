import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export default async function ServiceBookingRedirect({ params }: Props) {
  const { serviceSlug } = await params;
  redirect(`/services/${serviceSlug}`);
}
