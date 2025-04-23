import dynamic from 'next/dynamic';

const RaffleForm = dynamic(
  () =>
    import('@/widgets/product-list/create/ui/RaffleForm').then(
      mod => mod.RaffleForm,
    ),
  {
    ssr: false,
  },
);

export default function RaffleCreatePage() {
  return <RaffleForm />;
}
