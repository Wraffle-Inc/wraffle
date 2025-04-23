import dynamic from 'next/dynamic';

const EventForm = dynamic(
  () =>
    import('@/widgets/product-list/create/ui/EventForm').then(
      mod => mod.EventForm,
    ),
  {
    ssr: false,
  },
);

export default function EventCreatePage() {
  return <EventForm />;
}
