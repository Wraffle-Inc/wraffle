import type {ReactNode} from 'react';

type Props = {children: ReactNode};
export default function Layout({children}: Props) {
  return (
    <>
      <header className="mb-[25px] mt-[25px] h-[56px] bg-slate-700" />
      <header className="mb-[25px] h-[34px] bg-slate-700" />
      {children}
    </>
  );
}
