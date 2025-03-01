import UserListSuspense from './_suspense/UserListClient';

export default function Page() {
  return (
    <div className='w-full'>
      <UserListSuspense />
    </div>
  );
}
