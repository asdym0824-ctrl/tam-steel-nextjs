import { notFound } from 'next/navigation';
import App from '../../App';
import { servicesData } from '../../data/servicesData';
export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
 const { slug = [] } = await params;
 const page = slug[0] || 'home';
 if (slug.length > 1 || !['home','services','catalog','articles','about', ...servicesData.flatMap(s => [s.id, `service-${s.id}`])].includes(page)) notFound();
 return <App initialPage={page} />;
}
