import { NextPage } from 'next';
import { Top } from 'src/components/Top';

const TopPage: NextPage = () => {
  return (
    <div>
      <h1>
        Authors
        <span>Lie</span>
      </h1>
      <Top />
    </div>
  );
};

export default TopPage;
