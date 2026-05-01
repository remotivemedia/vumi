import { redirect } from 'next/navigation'
// v1 pitch preserved at /pitch — hidden from nav, never deleted.
export default function Home() { redirect('/pitch-v2') }
