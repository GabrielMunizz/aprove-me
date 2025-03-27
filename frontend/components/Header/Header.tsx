import React from 'react';
import BANKME_LOGO from '../../public/bankme_logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <Link href="/">
      <header className="flex justify-center items-center w-full px-8 mt-8">
        <div className="w-[1280px]">
          <Image
            src={BANKME_LOGO}
            alt="Bankme Logo"
            width={180}
            className="p-0 m-0"
          />
        </div>
      </header>
    </Link>
  );
};

export default Header;
