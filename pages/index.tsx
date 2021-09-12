import { NextPage } from 'next';
import Link from 'next/link';

const TopPage: NextPage = () => {
  return (
    <div>
      <h1>
        Authors
        <span>Lie</span>
      </h1>
      <Link href="/entrance">
        <a>Entrance</a>
      </Link>
      <Link href="/aaaaaaaaaa">
        <a>Room</a>
      </Link>
    </div>
  );
};

export default TopPage;
