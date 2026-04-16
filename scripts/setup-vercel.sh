#!/bin/bash
# VUMI — Vercel Project Setup Script
# Run this once to create the Vercel project and link to GitHub
# Requires: vercel CLI (npm i -g vercel) + a full-scope Vercel API token

set -e

echo "Setting up VUMI on Vercel..."

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
  npm install -g vercel
fi

# Link to Vercel (will prompt for login/token)
vercel link --yes

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "https://pytjweipmorwfdmxdcgi.supabase.co"
vercel env add NEXT_PUBLIC_SUPABASE_URL preview <<< "https://pytjweipmorwfdmxdcgi.supabase.co"
vercel env add NEXT_PUBLIC_SUPABASE_URL development <<< "https://pytjweipmorwfdmxdcgi.supabase.co"

echo "Add remaining env vars manually or via: vercel env add <KEY> <environment>"
echo ""
echo "Required vars:"
echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
echo "  AI_GATEWAY_API_KEY"
echo ""
echo "Deploy:"
echo "  vercel --prod"
