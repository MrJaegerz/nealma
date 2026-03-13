"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function SettingsPage() {
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
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Paramètres</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="max-w-2xl space-y-8">
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
                <Button type="submit" disabled={saving || !newPassword}>
                  {saving ? "Mise à jour..." : "Changer le mot de passe"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
}
