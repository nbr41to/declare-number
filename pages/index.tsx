import { NextPage } from 'next';
import { Top } from 'src/components/Top';

const TopPage: NextPage = () => {
  return (
    <div>
      <h1>Declare number</h1>
      <h2>数を宣言する</h2>
      <Top />
    </div>
  );
};

export default TopPage;
