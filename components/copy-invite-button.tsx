"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

export default function CopyInviteButton({ inviteUrl }: { inviteUrl: string }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy invite link:", error);
        }
    }

    return (
        <Button type="button" variant="outline" onClick={handleCopy}>
            <CopyIcon />{copied ? "Copied!" : "Copy Link"}
        </Button>
    );
}