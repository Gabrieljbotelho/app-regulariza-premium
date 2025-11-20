import dynamic from 'next/dynamic';

const OrdersScreen = dynamic(
  () => import('@/components/custom/orders-screen'),
  {
    loading: () => (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF7F]">
          Carregando...
        </div>
      </div>
    ),
  }
);

const PaymentScreen = dynamic(
  () => import('@/components/custom/payment-screen'),
  {
    loading: () => (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF7F]">
          Carregando...
        </div>
      </div>
    ),
  }
);

export default function Page() {
  return <OrdersScreen />;
}