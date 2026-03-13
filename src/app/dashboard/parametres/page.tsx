"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/dashboard/layout-components";

export default function ParametresPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setPasswordMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setPasswordMessage(error.message);
      } else {
        setPasswordMessage("Mot de passe mis \u00e0 jour avec succ\u00e8s.");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch {
      setPasswordMessage("Erreur lors de la mise \u00e0 jour.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Param&egrave;tres</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="space-y-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Profil</CardTitle>
              <CardDescription>
                G&eacute;rez vos informations de connexion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                {passwordMessage && (
                  <p className="text-sm text-muted-foreground">
                    {passwordMessage}
                  </p>
                )}
                <Button type="submit" disabled={saving || !newPassword}>
                  {saving ? "Mise \u00e0 jour..." : "Changer le mot de passe"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Configuration</CardTitle>
              <CardDescription>
                Les cl&eacute;s API et configurations externes sont g&eacute;r&eacute;es via les
                variables d&apos;environnement sur Vercel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>Stripe :</strong> Configur&eacute; via STRIPE_SECRET_KEY
                </p>
                <p>
                  <strong>Cal.com :</strong> Configur&eacute; via CAL_API_KEY
                </p>
                <p>
                  <strong>IA (Claude, OpenAI, Gemini) :</strong> Configur&eacute; via
                  les cl&eacute;s API respectives
                </p>
                <p>
                  <strong>Email (Resend) :</strong> Configur&eacute; via
                  RESEND_API_KEY
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
}
