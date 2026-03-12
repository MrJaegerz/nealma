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
        setPasswordMessage("Mot de passe mis à jour avec succès.");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch {
      setPasswordMessage("Erreur lors de la mise à jour.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-nealma-text mb-8">
        Paramètres
      </h1>

      <div className="space-y-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Profil</CardTitle>
            <CardDescription>
              Gérez vos informations de connexion
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
              <Button
                type="submit"
                disabled={saving || !newPassword}
              >
                {saving ? "Mise à jour..." : "Changer le mot de passe"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Configuration</CardTitle>
            <CardDescription>
              Les clés API et configurations externes sont gérées via les
              variables d&apos;environnement sur Vercel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Stripe :</strong> Configuré via STRIPE_SECRET_KEY
              </p>
              <p>
                <strong>Cal.com :</strong> Configuré via CAL_API_KEY
              </p>
              <p>
                <strong>IA (Claude, OpenAI, Gemini) :</strong> Configuré via les
                clés API respectives
              </p>
              <p>
                <strong>Email (Resend) :</strong> Configuré via RESEND_API_KEY
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
