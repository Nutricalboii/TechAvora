import { permanentRedirect } from 'next/navigation';

export default function LegacyHomeRoute() {
  permanentRedirect('/');
}
