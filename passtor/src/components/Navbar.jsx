import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 ">
        <div className="logo font-bold text-2xl ">

          <span className='text-green-500'>&lt;</span>
          PasST
          <span className='text-green-500'>OR/&gt;</span>

        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a  className='hover:font-bold'href="/">Home</a>
                <a  className='hover:font-bold' href="">About</a>
                <a  className='hover:font-bold' href="">Contact</a>
            </li>
        </ul> */}
        <div>
          <button className='text-white my-5 rounded-md flex bg-emerald-700
                items-center justify-between px-2'>
            <img className='invert w-10 p-1' width={30} src="/images/github.png" alt="git" />
<span
  className="font-bold px-2 text-white cursor-pointer hover:text-white hover:no-underline"
  onClick={() => window.open("https://github.com/AnandBhaskarx", "_blank")}
>
  Github
</span>


          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar