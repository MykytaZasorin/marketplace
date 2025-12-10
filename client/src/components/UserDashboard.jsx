import useAuth from './useAuth';

export default function Dashboard() {
  useAuth();

  return (
    <div>
      <h1>Ласкаво просимо на захищену сторінку!</h1>
    </div>
  );
}
