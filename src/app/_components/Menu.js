'use client'

import Link from 'next/link';

const App = () => {

    return <nav>
        <Link href='/'>Home</Link>
        <Link href='/garden'>Garden</Link>
        <Link href='/profile'>Profile</Link>
    </nav>;
};
export default App;