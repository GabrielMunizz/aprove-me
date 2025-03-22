import React from 'react';
import BANKME_LOGO from '../../public/bankme_logo.png';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex justify start items-center w-full px-8">
      <Image
        src={BANKME_LOGO}
        alt="Bankme Logo"
        width={180}
        className="p-0 m-0"
      />
    </header>
  );
};

export default Header;
